# AllMart — E-commerce Frontend Application

A modern, responsive e-commerce storefront built with React, Redux Toolkit, and Tailwind CSS. Integrates with the DummyJSON API for products and authentication, featuring a complete shopping flow from browse to checkout.

**Live Demo:** Deploy to [Vercel](https://vercel.com) and add your URL here.

[![CI](https://github.com/HofmannS/AllMart/actions/workflows/ci.yml/badge.svg)](https://github.com/HofmannS/AllMart/actions/workflows/ci.yml)

---

## Features

- **Product catalog** — paginated listing with server-side search and category filtering across the full DummyJSON catalog (194 products)
- **Product detail pages** — shareable URLs at `/products/:id` with reviews, stock, discounts, and brand info
- **Shopping cart** — add/remove items, quantity controls, persistent via localStorage
- **Checkout flow** — shipping form with validation, order confirmation, and order history
- **Authentication** — real login via DummyJSON API with protected profile page
- **Responsive UI** — mobile navigation, skeleton loaders, error states, toast notifications
- **Design system** — Inter font, Lucide icons, reusable Button/Badge/Input components

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| State | Redux Toolkit |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| API | DummyJSON |
| Testing | Vitest + Testing Library |
| Deployment | Vercel |

---

## Demo Credentials

Login uses the DummyJSON auth API:

| Field | Value |
|-------|-------|
| Username | `emilys` |
| Password | `emilyspass` |

---

## Routes

| Path | Description |
|------|-------------|
| `/` | Home with hero, categories, featured products |
| `/products` | Product listing with search, filter, sort, pagination |
| `/products/:id` | Product detail page |
| `/checkout` | Shipping form and order summary |
| `/order-confirmation` | Order success page |
| `/orders` | Order history (localStorage) |
| `/login` | Sign in |
| `/register` | Create account |
| `/profile` | User profile (protected) |

---

## Architecture

```text
DummyJSON API
     ↓
Redux Toolkit (products, cart, auth, checkout, orders)
     ↓
Pages → Components → UI Primitives
     ↓
localStorage (cart, auth token, orders)
```

### Project Structure

```bash
src/
├── app/store.js
├── components/
│   ├── ui/              # Button, Badge, Input, Skeleton, etc.
│   ├── layout/          # Layout, Footer
│   ├── Header.jsx
│   ├── Cart.jsx
│   └── ProductCard.jsx
├── features/
│   ├── auth/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   └── products/
├── pages/
├── hooks/
└── utils/
```

---

## API

- Products: [https://dummyjson.com/products](https://dummyjson.com/products)
- Auth: [https://dummyjson.com/docs/auth](https://dummyjson.com/docs/auth)

---

## Author

**Sergej Hofmann** — Frontend Developer
