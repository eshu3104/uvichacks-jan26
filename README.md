# FoodBridge

**Connecting Surplus to Those in Need**

A web platform that connects food donors (restaurants, grocery stores, individuals) with shelters and food banks. Built for UVICHacks 2026.

---

## The Problem

- 46.5% of food produced in Canada is wasted annually
- 10 million Canadians face food insecurity
- No efficient connection exists between surplus food and those who need it

## Our Solution

FoodBridge provides a platform where:

1. **Donors** list surplus food with photos and pickup details
2. **Smart Matching** connects donations with nearby shelters
3. **Shelters** manage inventory, plan routes, and get recipe suggestions

---

## Features

**For Donors**
- Easy food listing with photo uploads
- Track donation impact and history
- Tax deduction documentation

**For Shelters**
- Real-time inventory management
- Optimized pickup route planning
- Recipe suggestions based on available ingredients
- Clearance deals from local stores

---

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide React icons

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   ├── donation-form-steps/   # Multi-step donation form
│   │   ├── shelter-dashboard.tsx  # Shelter main dashboard
│   │   ├── donor-dashboard.tsx    # Donor main dashboard
│   │   ├── inventory-page.tsx     # Inventory management
│   │   ├── recipe-page.tsx        # Recipe suggestions
│   │   └── pickup-route-planner.tsx
│   └── App.tsx                    # Main app with routing
├── styles/
│   ├── theme.css                  # Design tokens
│   └── index.css                  # Global styles
└── main.tsx                       # Entry point
```

---

## Team

- [Eshupriye Belgotra](https://www.linkedin.com/in/eshu-belgotra/)
- [Anshit Kuda](https://www.linkedin.com/in/anshit-kuda-580624214/)
- [Chirag Sood](https://www.linkedin.com/in/chiragsd13/)

---

Made with ♥ at UVICHacks 2026
