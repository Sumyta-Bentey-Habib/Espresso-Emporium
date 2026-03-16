<div align="center">

  # ☕ Espresso-Emporium

  [![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC.svg)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-LTS-339933.svg)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg)](https://www.mongodb.com/)
  [![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-010101.svg)](https://socket.io/)

  **A Premium, Real-time Marketplace for Coffee Enthusiasts**
</div>

---

## 🌟 Project Vision
**Espresso-Emporium** is designed to bridge the gap between boutique roasters and coffee lovers. By leveraging modern real-time technologies, we provide a seamless, interactive platform where quality meets community.

---

## 🚀 Key Features

### 🛒 Marketplace & Community
- **✨ Curated Selection:** Discover premium coffee blends, beans, and equipment across four distinct categories.
- **💬 Real-time Chat:** Direct, instant messaging between buyers and sellers for a personalized experience.
- **⭐ Interactive Reviews:** Dynamic rating and feedback system to build community trust.
- **🖤 User Wishlist:** Save your favorite products to your personal collection with a single click.
- **🔍 Smart Search:** Lightning-fast filtering by category and keyword to find your perfect brew.

### 🔐 Professional User Dashboards
- **👤 Buyer Portal:** Manage your wishlist, track reviews, and engage in community discussions.
- **🤝 Seller suite:** Full lifecycle management of products with real-time performance tracking.
- **🛡️ Admin HQ:** Centralized control for user management and content moderation.

---

## 📁 Project Structure

```bash
Espresso-Emporium/
├── 📁 public/            # Static assets and documentation images
├── 📁 src/
│   ├── 📁 assets/        # Global styles and media files
│   ├── 📁 components/    # Reusable UI components
│   │   ├── 📁 chat/      # Real-time messaging components
│   │   └── 📁 dashboard/ # Role-specific dashboard widgets
│   ├── 📁 context/       # Auth and Socket.io state management
│   ├── 📁 firebase/      # Authentication configuration
│   ├── 📁 hooks/         # Custom React hooks (useChat, usePresence)
│   ├── 📁 layouts/       # Page layout templates (Home, Dashboard)
│   ├── 📁 pages/         # High-level page components
│   │   ├── 📁 admin/     # Admin-only management pages
│   │   ├── 📁 buyer/     # Buyer-specific features
│   │   └── 📁 seller/    # Seller product and dashboard pages
│   ├── 📁 router/        # Application routing logic
│   ├── 📁 shared/        # Common components like NavBars and Footers
│   └── 📁 utils/         # Helper functions and API configuration
├── 📄 package.json       # Project dependencies and scripts
└── 📄 README.md          # Project documentation
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS 4, Lucide-React |
| **Backend** | Node.js, Express, Socket.io |
| **Database** | MongoDB |
| **Auth** | Firebase Authentication |
| **Visuals** | Recharts, SweetAlert2, Lottie |

---

## 🎯 Quick Start

### Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `espresso@admin.com` | `12345678#$%ADiMn` |
| **The Daily Grind** | `thedailygrind@gmail.com` | `TDG!2025#Coffee` |
| **Brew Theory** | `brewtheory@gmail.com` | `BrewTh3ory@21` |
| **Velvet Bean** | `velvetbean@gmail.com` | `V3lv3tB3an$` |
| **Morning Dew Café** | `morningdew.cafe@gmail.com` | `MDew@2025!` |

### Installation
1. **Clone & Enter**:
   ```bash
   git clone https://github.com/Sumyta-Bentey-Habib/Espresso-Emporium.git
   cd Espresso-Emporium
   ```
2. **Setup Dependencies**:
   ```bash
   npm install
   ```
3. **Environment**:
   Configure `.env.local` with your API and Firebase credentials.
4. **Launch**:
   ```bash
   npm run dev
   ```

---

<div align="center">
  Made with ☕ and passion by <a href="https://github.com/Sumyta-Bentey-Habib">Sumyta-Bentey-Habib</a>
</div>
