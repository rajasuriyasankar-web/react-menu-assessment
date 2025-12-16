
It is a food menu application built using React, Vite, and Redux Toolkit.

## Live Demo
https://react-menu-assessment.vercel.app

## GitHub Repository
https://github.com/rajasuriyasankar-web/react-menu-assessment

---

## Features

1. Dynamic Menu
   - Category
   - Subcategory
   - Items
   - All data loaded from a JSON file.

2. Add to Cart
   - Add items to the cart
   - Increase or decrease quantity
   - Cart updates automatically based on user actions

3. Pizza BOGO Offer (Buy One Get One Free)
   - Offer applies only to the Pizza category
   - When two pizzas are added:
     - The higher-priced pizza is charged
     - The lower-priced pizza becomes free
   - This logic is implemented inside Redux (cartSlice.js)

4. State Management
   - Implemented using Redux Toolkit
   - Handles cart operations, pricing, and offer logic

5. Responsive Design
   - Layout adjusts properly on mobile and desktop

---

## Folder Structure
src/
  components/
  data/
  store/
  App.jsx
  main.jsx

---

## How to Run the Project

### Install dependencies
npm install

### Start development server
npm run dev

### Build for production
npm run build

---

## Technologies Used
- React.js  
- Vite  
- Redux Toolkit  
- JSON  
- CSS


