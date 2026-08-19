<div align="center">

# 🌿 Evergreen Nursery

**A full-stack, enterprise-grade botanical e-commerce and gardening management platform.**  
*Empowering plant lovers to discover organic houseplants, precision tools, botanical care knowledge, and artisanal planters with seamless shopping, role-based dashboards, and interactive community boards.*

[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.2-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.9-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[🌐 Live Client](https://evergreen-nursery-client.vercel.app/) • [🚀 Live API Server](https://evergreen-nursery-server.vercel.app/)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Live Demo & Screenshots](#-live-demo--screenshots)
- [Prerequisites](#-prerequisites)
- [Installation & Local Setup](#-installation--local-setup)
- [Environment Variables](#-environment-variables)
- [Running Locally](#-running-locally)
- [Folder Structure](#-folder-structure)
- [API Documentation](#-api-documentation)
- [Available Scripts](#-available-scripts)
- [Contributing Guidelines](#-contributing-guidelines)
- [License](#-license)
- [Author & Contact](#-author--contact)

---

## 🌿 Overview

**Evergreen Nursery** is a modern, responsive full-stack web application designed for botanical enthusiasts, urban gardeners, and commercial nurseries. It features a curated botanical storefront, dynamic multi-attribute product filtering, interactive Pinterest-style inspiration boards, rich Markdown blog publishing, and secure Stripe payments.

The project is structured into two decoupled repositories:
1. **Client (`evergreen-nursery-client`)**: React 18 SPA powered by Vite, TypeScript, Tailwind CSS, shadcn/ui, Redux Toolkit Query, Lenis smooth scrolling, and Framer Motion animations.
2. **Server (`evergreen-nursery-server`)**: Modular Express.js REST API with TypeScript, MongoDB (Mongoose), JWT authentication, Zod validation, and Cloudinary media uploads.

---

## ✨ Key Features

### 🛍️ Client & Customer Experience
- **🎨 Interactive Botanical UI & Dark/Light Mode**: Polished aesthetic with Tailwind CSS, custom Outfit & Plus Jakarta Sans typography, and instant theme switching.
- **🏎️ Lenis Momentum Smooth Scrolling**: 60fps inertia gliding scroll experience paired with Framer Motion viewport reveal animations.
- **📌 Pinterest-Style Inspiration Board**: Staggered masonry grid featuring bookmarkable plant pins, like counters, share links, and an interactive 2-column Lightbox drawer.
- **🔍 Advanced Plant Filtering & Search**: Instant multi-criteria filtering by category, price range, ratings, and live search debounce.
- **🛒 Persistent Shopping Cart & Stripe Checkout**: Client-side cart persistence via Redux Persist with integrated Stripe secure payment gateways.
- **📖 Botanical Care Blogs & Community Publishing**: Read and author plant care guides with rich Markdown rendering.

### 🛡️ Admin & Store Management
- **📊 Real-time Analytics & Transaction Logs**: Dedicated admin dashboard for sales, revenue, and order status tracking.
- **📦 Full Plant & Inventory CRUD**: Add, update, view, and delete botanical products with Cloudinary multi-image uploads.
- **📂 Category Taxonomy Management**: Create and manage botanical categories with real-time storefront synchronization.
- **👥 User & Role Access Control**: Protected routes ensuring role-based authorization for `ADMIN` and `CUSTOMER` users.

---

## 🛠 Tech Stack

### Frontend (Client)
| Technology | Description |
| :--- | :--- |
| **React 18** | Declarative component-driven user interface |
| **TypeScript** | Strict static type-safety across components and state |
| **Vite** | Blazing-fast frontend build tooling and HMR |
| **Redux Toolkit & RTK Query** | Centralized global state management and cached API queries |
| **Tailwind CSS & shadcn/ui** | Modern utility-first styling with accessible UI primitives |
| **Framer Motion & AOS** | High-performance GPU viewport animations |
| **Lenis** | Smooth momentum scrolling engine |
| **Swiper.js** | Touch-friendly hero and department sliders |
| **Lucide React** | Consistent, modern botanical vector iconography |

### Backend (Server)
| Technology | Description |
| :--- | :--- |
| **Node.js & Express.js** | Scalable asynchronous REST API runtime and framework |
| **TypeScript** | Typed controllers, services, and route definitions |
| **MongoDB & Mongoose** | Document-oriented database for catalog and user records |
| **JWT & Bcrypt** | Secure token-based authentication and password hashing |
| **Zod** | Runtime request body schema validation |
| **Stripe SDK** | Secure online payment processing |
| **Cloudinary & Multer** | Cloud-based media storage and image transformations |

---

## 📸 Live Demo & Screenshots

- **Live Production URL**: [https://evergreen-nursery-client.vercel.app](https://evergreen-nursery-client.vercel.app)
- **Backend API Base**: [https://evergreen-nursery-server.vercel.app/api/v1](https://evergreen-nursery-server.vercel.app/api/v1)

```
[ Hero Slider ] ───> [ Curated Departments ] ───> [ Plant Catalog ] ───> [ Pinterest Inspiration ]
```

---

## ⚙️ Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js**: `v18.x` or `v20.x+`
- **npm**: `v9.x+` (or `yarn` / `pnpm`)
- **MongoDB**: Local MongoDB instance or free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- **Git**

---

## 🚀 Installation & Local Setup

### 1. Clone the Repositories

```bash
# Clone the client repository
git clone https://github.com/Utsho11/evergreen-nursery-client.git

# Clone the server repository
git clone https://github.com/Utsho11/evergreen-nursery-server.git
```

### 2. Setup the Client

```bash
cd evergreen-nursery-client
npm install
```

### 3. Setup the Server

```bash
cd ../evergreen-nursery-server
npm install
```

---

## 🔐 Environment Variables

### Client (`evergreen-nursery-client/.env`)
Create a `.env` file in the root of the client folder:

```env
VITE_API_BASE_URL=https://evergreen-nursery-server.vercel.app/api/v1
# Or for local development:
# VITE_API_BASE_URL=http://localhost:5000/api/v1

VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
VITE_IMAGE_UPLOAD_TOKEN=your_imgbb_or_cloudinary_key
```

### Server (`evergreen-nursery-server/.env`)
Create a `.env` file in the root of the server folder:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/evergreen_nursery?retryWrites=true&w=majority

BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_super_secret_refresh_key
JWT_REFRESH_EXPIRES_IN=30d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

---

## 💻 Running Locally

### Start the Backend Server
```bash
cd evergreen-nursery-server
npm run dev
# Server will start on http://localhost:5000
```

### Start the Frontend Client
```bash
cd evergreen-nursery-client
npm run dev
# Vite dev server will start on http://localhost:5173
```

---

## 📁 Folder Structure

### Client Overview
```text
evergreen-nursery-client/
├── public/                # Static assets & favicon.svg
├── src/
│   ├── assets/            # Botanical imagery, plants, local data
│   ├── components/
│   │   ├── form/          # Reusable dark-mode compatible form inputs
│   │   ├── homeBody/      # Hero, Services, Gallery, Discounts
│   │   ├── layouts/       # MainLayout & Dashboard layouts
│   │   ├── shared/        # Logo, Navbar, Footer, ScrollToTop, AnimatedSection
│   │   └── ui/            # Radix & shadcn/ui components
│   ├── context/           # ThemeContext (Dark/Light mode)
│   ├── pages/             # Route pages (Homepage, Shop, Cart, Blog, Auth)
│   ├── redux/             # RTK store, slices, and API endpoints
│   ├── routes/            # React Router definitions & Role ProtectedRoute
│   ├── App.tsx            # Main root wrapper
│   ├── main.tsx           # Application entry point
│   └── index.css          # Tailwind base, typography & Lenis directives
├── package.json
└── vite.config.ts
```

### Server Overview
```text
evergreen-nursery-server/
├── src/
│   ├── app/
│   │   ├── config/        # Environment configurations
│   │   ├── errors/        # Global error handlers (AppError, ZodError)
│   │   ├── middlewares/   # Auth verification & Multer upload
│   │   ├── modules/       # Feature modules (Auth, Plant, Category, Order, Blog)
│   │   │   ├── [feature].controller.ts
│   │   │   ├── [feature].model.ts
│   │   │   ├── [feature].route.ts
│   │   │   ├── [feature].service.ts
│   │   │   └── [feature].validation.ts
│   │   └── routes/        # Main application router
│   ├── server.ts          # Server initialization & DB connection
│   └── app.ts             # Express app setup with CORS & cookies
├── package.json
└── tsconfig.json
```

---

## 📡 API Documentation

Base URL: `/api/v1`

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new customer | Public |
| `POST` | `/auth/login` | Authenticate user & issue JWT | Public |
| `GET` | `/plants` | Fetch all plants with search & pagination | Public |
| `GET` | `/plants/:id` | Fetch single plant details | Public |
| `POST` | `/plants` | Create a new plant item | Admin |
| `PATCH` | `/plants/:id` | Update plant specifications | Admin |
| `DELETE` | `/plants/:id` | Remove a plant from catalog | Admin |
| `GET` | `/categories` | Retrieve all botanical categories | Public |
| `POST` | `/categories` | Create a new category | Admin |
| `POST` | `/orders/create-payment-intent`| Initialize Stripe checkout session | Authenticated |
| `GET` | `/orders/my-orders` | Fetch customer purchase history | Customer |
| `GET` | `/orders` | View all store transactions | Admin |
| `GET` | `/blogs` | Retrieve published plant care articles | Public |
| `POST` | `/blogs` | Publish a botanical story | Authenticated |

---

## 📜 Available Scripts

### Client
- `npm run dev` — Launches Vite development server with Hot Module Replacement.
- `npm run build` — Type-checks and compiles production bundle to `/dist`.
- `npm run preview` — Locally previews the compiled production build.
- `npm run lint` — Runs ESLint code quality checks.

### Server
- `npm run dev` — Runs development server with `ts-node-dev` automatic restarts.
- `npm run build` — Compiles TypeScript into JavaScript in `/dist`.
- `npm run start` — Starts production server using compiled JS.
- `npm run lint:fix` — Automatically resolves fixable ESLint errors.

---

## 🤝 Contributing Guidelines

Contributions are welcome! Follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/amazing-botanical-feature
   ```
3. **Commit Your Changes**:
   ```bash
   git commit -m "feat: add amazing botanical feature"
   ```
4. **Push to the Branch**:
   ```bash
   git push origin feature/amazing-botanical-feature
   ```
5. **Open a Pull Request** with a detailed summary of modifications.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👤 Author & Contact

**Utsho**  
- **GitHub**: [@Utsho11](https://github.com/Utsho11)
- **Project Link**: [https://github.com/Utsho11/evergreen-nursery-client](https://github.com/Utsho11/evergreen-nursery-client)
- **Live Demo**: [https://evergreen-nursery-client.vercel.app](https://evergreen-nursery-client.vercel.app)

<div align="center">
  <sub>Built with 💚 for the botanical & web development community.</sub>
</div>
