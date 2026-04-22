# 🛒 AllMart — E-commerce Frontend Application

A modern, responsive e-commerce storefront built with React, showcasing real-world frontend architecture with global state management using Redux Toolkit, dynamic filtering, and an interactive shopping cart experience.

---

## 🧠 Key Highlights

* Real API integration using DummyJSON
* Scalable React architecture with Redux Toolkit
* Global cart state with real-time updates
* Dynamic search, filtering, and sorting
* Interactive product modal (instead of separate product page)
* Persistent cart using localStorage
* Fully responsive UI built with Tailwind CSS

---

## 🧱 Tech Stack

* React (Vite)
* Redux Toolkit
* React Router (v6)
* Tailwind CSS
* DummyJSON API

---

## ✨ Core Features

### 🛍 Product Management

* Fetch products from API
* Display products in responsive grid
* Product modal with detailed information
* Search products by title
* Filter products by category
* Sort products by:

  * Name
  * Price
  * Rating

---

### 🛒 Cart System

* Add and remove products
* Increase and decrease quantity
* Real-time total price calculation
* Animated dropdown cart (Amazon-style)
* Cart badge in the header
* Persistent cart using localStorage

---

### 🪟 Product Modal

* Opens on product click
* Displays:

  * Images gallery
  * Description
  * Price
  * Rating
  * Reviews
* Add to cart directly from modal
* Closes on overlay click

---

### 📱 UI / UX

* Fully responsive (mobile-first)
* Clean and modern design
* Interactive hover effects
* Sticky header with navigation
* Dropdown cart with animations
* Empty states for products and cart

---

## 🔀 Routing

Client-side routing with React Router:

* `/` → Home
* `/products` → Product listing
* `*` → NotFound page

---

## 🧩 Project Structure

```bash
src/
├── components/
│   ├── ProductCard.jsx
│   ├── ProductModal.jsx
│   ├── FiltersBar.jsx
│   ├── Header.jsx
│   └── Cart.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── ProductsPage.jsx
│   └── NotFoundPage.jsx
│
├── features/
│   ├── products/
│   │   └── productsSlice.js
│   └── cart/
│       └── cartSlice.js
│
├── app/
│   └── store.js
│
└── main.jsx
```

---

## 🔄 Data Flow

```text
API (DummyJSON)
   ↓
Redux Toolkit (productsSlice)
   ↓
Pages (Home / Products)
   ↓
Components (ProductCard / Modal)

Cart State:
Redux → Global Store → UI Updates
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/HofmannS/AllMart.git
cd AllMart
npm install
npm run dev
```

---

## 🌐 API

This project uses the DummyJSON Products API:

https://dummyjson.com/products

---

## 📈 Future Improvements

* Pagination or infinite scroll
* Wishlist feature ❤️
* Authentication system
* Checkout flow
* Animations with Framer Motion
* Dark mode 🌙

---

## 👨‍💻 Author

Sergej Hofmann
Frontend Developer
