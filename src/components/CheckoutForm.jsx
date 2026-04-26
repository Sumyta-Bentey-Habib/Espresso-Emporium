import React, { useState, useEffect } from "react";
import { 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement, 
  useStripe, 
  useElements 
} from "@stripe/react-stripe-js";
import { API_URL } from "../utils/utils";
import { useAuth } from "../context/AuthProvider";
import Button from "./ui/Button";
import { CreditCard, ShieldCheck, AlertCircle, Calendar, Lock } from "lucide-react";
import Swal from "sweetalert2";

const CheckoutForm = ({ price, cartItems }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    if (price > 0) {
      fetch(`${API_URL}/payment/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to initialize payment. Check server logs.");
          return res.json();
        })
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            throw new Error("No client secret received from server.");
          }
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
        });
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardNumber = elements.getElement(CardNumberElement);

    if (cardNumber == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumber,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    } else {
      setError(null);
    }

    // Confirm Payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardNumber,
          billing_details: {
            name: user?.name || "Dummy Buyer",
            email: user?.email || "dummy@example.com",
          },
        },
      }
    );

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        // Save Order to DB
        const orderData = {
          buyerId: user._id,
          buyerName: user.name,
          buyerEmail: user.email,
          items: cartItems,
          totalPrice: price,
          paymentIntentId: paymentIntent.id,
          status: "Paid",
        };

        try {
          await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
          });
          
          setSucceeded(true);
          setProcessing(false);
          Swal.fire({
            icon: "success",
            title: "Payment Succeeded",
            text: "Your artisan blends are being prepared for delivery!",
            confirmButtonColor: "#451a03",
            customClass: { popup: "rounded-[2.5rem]" },
          });
        } catch (saveError) {
          console.error("Failed to save order:", saveError);
          setSucceeded(true);
          setProcessing(false);
        }
      }
    }
  };

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#451a03",
        fontFamily: "Georama, sans-serif",
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#ef4444",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {/* Card Number */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/40 ml-1">
            <CreditCard size={12} />
            Card Number
          </label>
          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-900/10 shadow-inner">
            <CardNumberElement options={elementOptions} className="p-1" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Expiry Date */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/40 ml-1">
              <Calendar size={12} />
              Expiry Date
            </label>
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-900/10 shadow-inner">
              <CardExpiryElement options={elementOptions} className="p-1" />
            </div>
          </div>

          {/* CVC */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-900/40 ml-1">
              <Lock size={12} />
              CVC Code
            </label>
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-900/10 shadow-inner">
              <CardCvcElement options={elementOptions} className="p-1" />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 text-sm font-bold animate-in fade-in zoom-in-95 duration-300">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={!stripe || processing || succeeded || !clientSecret}
          className="w-full py-6 text-lg shadow-2xl shadow-amber-950/20"
        >
          {processing ? (
            <span className="flex items-center gap-3">
              <span className="loading loading-spinner loading-sm"></span>
              Authenticating...
            </span>
          ) : succeeded ? (
            "Payment Completed"
          ) : !clientSecret ? (
            <span className="flex items-center gap-3">
              <span className="loading loading-spinner loading-sm"></span>
              Initializing Secure Link...
            </span>
          ) : (
            `Pay $${price}`
          )}
        </Button>
        
        <div className="flex items-center justify-center gap-2 text-amber-900/30 text-[10px] font-black uppercase tracking-[0.1em]">
          <ShieldCheck size={14} />
          PCI-DSS Compliant Infrastructure
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
