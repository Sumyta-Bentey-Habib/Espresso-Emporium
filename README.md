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
**Espresso-Emporium** is designed to bridge the gap between boutique roasters and coffee lovers. Following a massive architectural refactor, the platform now boasts a state-of-the-art **Atomic Design System** and a clean, **Hook-first** logic architecture, providing a seamless and premium interactive experience.

---

## 🚀 Key Features

### 🛒 Marketplace & Community
- **✨ Curated Selection:** Discover premium coffee blends, beans, and equipment across four distinct categories.
- **💬 Real-time Chat:** Direct, instant messaging between buyers and sellers for a personalized experience.
- **⭐ Community Resonance:** Dynamic rating and feedback system with a glassmorphic modal design.
- **🖤 Artisan Wishlist:** Save your favorite products to your personal collection with a single click.
- **🔍 Smart Filtering:** Lightning-fast search architecture powered by custom data-fetching hooks.

### 👤 Identity Management
- **👤 Profile Management:** Full control over your artisan identity, including real-time profile updates.

### 🔐 Professional User Dashboards
- **📈 Global Analytics:** Interactive dashboards featuring Recharts visualization for orders, sales, and activity tracking.
- **👤 Buyer Portal:** Manage your wishlist, track reviews, and engage in community discussions.
- **🤝 Merchant Suite:** Sophisticated lifecycle management of products with real-time performance tracking.
- **🛡️ Administrative HQ:** Centralized command center for user management and content moderation.

---

## 🏗️ Architectural Excellence

The project follows a modular, scalable architecture developed during a comprehensive codebase overhaul:

- **Atomic UI library**: Located in `src/components/ui/`, providing standardized `Button`, `Card`, and `Input` components.
- **Logic Separation**: 10+ custom hooks (e.g., `useProducts`, `useDashboard`, `useSidebar`) encapsulate all side effects and state management.
- **Design Tokens**: A centralized token system in `src/styles/tokens.css` manages the brand's amber-themed color palette and typography.
- **Real-time Engine**: Powered by Socket.io for instant messaging and presence tracking.

---

## 📁 Project Structure

```bash
Espresso-Emporium/
├── 📁 public/            # Static assets and documentation images
├── 📁 src/
│   ├── 📁 components/    # Reusable UI components
│   │   ├── 📁 ui/        # Atomic UI library (Button, Card, Input)
│   │   ├── 📁 chat/      # Real-time messaging components
│   │   └── 📁 dashboard/ # Role-specific dashboard widgets
│   ├── 📁 context/       # Auth and Socket.io state management
│   ├── 📁 hooks/         # Custom React hooks (useDashboard, useProducts, etc.)
│   ├── 📁 pages/         # Page components (Admin, Seller, Buyer portals)
│   ├── 📁 styles/        # Global tokens and tailwind configuration
│   ├── 📁 utils/         # Helper functions and API configuration
│   └── 📄 main.jsx       # Application entry point
├── 📄 package.json       # Dependencies and scripts
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
| **Visuals** | Recharts, SweetAlert2, Framer-Motion style animations |

---

## 🎯 Quick Start

### Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `espresso@admin.com` | `12345678#$%ADiMn` |
| **The Daily Grind** | `thedailygrind@gmail.com` | `TDG!2025#Coffee` |
| **Brew Theory** | `brewtheory@gmail.com` | `BrewTh3ory@21` |
| **Merchant Suite** | `morningdew.cafe@gmail.com` | `MDew@2025!` |

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
