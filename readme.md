# E-commerce Website User Stories

## Project Overview
This document outlines user stories for an e-commerce website designed for a small business. The platform will allow customers to browse products, add them to a cart, place orders, and manage their accounts. Admins will manage products and view orders. The focus is on learning Angular (frontend), Node.js with Express (backend), Sequelize (ORM), and MySQL (database).

---

## User Stories

### 1. User Registration
**As a** new customer,  
**I want to** create an account,  
**so that** I can log in and make purchases.

**Acceptance Criteria:**
- The registration form includes fields for name, email, password, and confirm password.
- Email must be unique in the system.
- Passwords are hashed before storage.
- Users receive a success message upon registration.
- If registration fails (e.g., duplicate email), an error message is displayed.
- The frontend uses Angular reactive forms for validation.
- The backend uses Sequelize to store user data in MySQL.
- The API endpoint is `/api/users/register` (POST).

**Tasks:**
- Create an Angular component for the registration form.
- Implement form validation (e.g., required fields, email format, password match).
- Set up a Node.js/Express route to handle registration.
- Use Sequelize to define a User model and store data in MySQL.
- Implement password hashing with bcrypt.

---

### 2. User Login
**As a** registered customer,  
**I want to** log in to my account,  
**so that** I can access my profile and make purchases.

**Acceptance Criteria:**
- The login form includes fields for email and password.
- Successful login returns a JWT token stored in the browser (e.g., localStorage).
- Invalid credentials display an error message.
- The frontend uses Angular to handle form submission and API calls.
- The backend verifies credentials using Sequelize and MySQL.
- The API endpoint is `/api/users/login` (POST).

**Tasks:**
- Create an Angular component for the login form.
- Implement form validation in Angular.
- Set up a Node.js/Express route to authenticate users.
- Use Sequelize to query the User model.
- Implement JWT generation with jsonwebtoken.

---

### 3. Browse Products
**As a** customer,  
**I want to** view a list of available products,  
**so that** I can decide what to purchase.

**Acceptance Criteria:**
- The product list displays product name, description, price, and image.
- Products are fetched from the backend via an API.
- The frontend uses Angular to display products in a grid or list format.
- The backend uses Sequelize to retrieve products from MySQL.
- The API endpoint is `/api/products` (GET).

**Tasks:**
- Create an Angular component for the product list.
- Use Angular’s HttpClient to fetch products from the API.
- Set up a Node.js/Express route to return all products.
- Define a Product model with Sequelize (fields: id, name, description, price, imageUrl).
- Store sample product data in MySQL.

---

### 4. View Product Details
**As a** customer,  
**I want to** view detailed information about a product,  
**so that** I can make an informed purchase decision.

**Acceptance Criteria:**
- Clicking a product navigates to a product details page.
- The details page shows product name, description, price, image, and an “Add to Cart” button.
- The frontend uses Angular routing to navigate to the details page.
- The backend provides a product by ID via an API.
- The API endpoint is `/api/products/:id` (GET).

**Tasks:**
- Create an Angular component for product details.
- Configure Angular routing to handle `/products/:id`.
- Use HttpClient to fetch product details from the API.
- Set up a Node.js/Express route to return a single product using Sequelize.

---

### 5. Add Product to Cart
**As a** logged-in customer,  
**I want to** add products to my shopping cart,  
**so that** I can purchase multiple items at once.

**Acceptance Criteria:**
- The “Add to Cart” button is visible only to logged-in users.
- Adding a product updates the cart in the frontend and backend.
- The cart stores product ID, quantity, and user ID.
- The frontend uses Angular to manage cart state (e.g., via a service).
- The backend uses Sequelize to store cart items in MySQL.
- The API endpoint is `/api/cart` (POST).

**Tasks:**
- Create an Angular service to manage cart state.
- Update the product details component to include an “Add to Cart” button.
- Set up a Node.js/Express route to add items to the cart.
- Define a Cart model with Sequelize (fields: userId, productId, quantity).

---

### 6. View Shopping Cart
**As a** logged-in customer,  
**I want to** view my shopping cart,  
**so that** I can review items before checkout.

**Acceptance Criteria:**
- The cart page displays a list of products with name, price, quantity, and total price.
- Users can update quantities or remove items.
- The frontend uses Angular to fetch and display cart items.
- The backend retrieves cart items for the logged-in user.
- The API endpoint is `/api/cart` (GET).

**Tasks:**
- Create an Angular component for the cart page.
- Use Angular’s HttpClient to fetch cart items.
- Set up a Node.js/Express route to return cart items using Sequelize.
- Implement quantity update and item removal functionality.

---

### 7. Checkout and Place Order
**As a** logged-in customer,  
**I want to** place an order from my cart,  
**so that** I can purchase the items.

**Acceptance Criteria:**
- The checkout page displays cart items and a total price.
- Users confirm the order, which clears the cart and creates an order record.
- The frontend uses Angular to handle the checkout process.
- The backend uses Sequelize to store orders and order items in MySQL.
- The API endpoint is `/api/orders` (POST).

**Tasks:**
- Create an Angular component for the checkout page.
- Use HttpClient to send the order to the backend.
- Set up a Node.js/Express route to create an order.
- Define Order and OrderItem models with Sequelize (Order: userId, total; OrderItem: orderId, productId, quantity, price).

---

### 8. View Order History
**As a** logged-in customer,  
**I want to** view my past orders,  
**so that** I can track my purchases.

**Acceptance Criteria:**
- The order history page lists past orders with order ID, date, total, and status.
- Clicking an order shows its items (product name, quantity, price).
- The frontend uses Angular to display orders.
- The backend retrieves orders for the logged-in user.
- The API endpoint is `/api/orders` (GET).

**Tasks:**
- Create an Angular component for order history.
- Use HttpClient to fetch orders from the API.
- Set up a Node.js/Express route to return user orders using Sequelize.

---

### 9. Admin: Manage Products
**As an** admin,  
**I want to** add, edit, and delete products,  
**so that** I can keep the product catalog up to date.

**Acceptance Criteria:**
- Admins can access a product management page (protected by authentication).
- The page allows adding a new product (name, description, price, imageUrl).
- Admins can edit or delete existing products.
- The frontend uses Angular forms for product management.
- The backend uses Sequelize to perform CRUD operations on products.
- API endpoints: `/api/products` (POST, PUT, DELETE).

**Tasks:**
- Create an Angular component for product management.
- Implement Angular forms for adding/editing products.
- Set up Node.js/Express routes for CRUD opérations on products.
- Secure routes with admin-only JWT authentication.

---

### 10. Admin: View Orders
**As an** admin,  
**I want to** view all customer orders,  
**so that** I can manage order fulfillment.

**Acceptance Criteria:**
- The admin order page lists all orders with customer name, order ID, date, total, and status.
- Clicking an order shows its items.
- The frontend uses Angular to display orders.
- The backend retrieves all orders using Sequelize.
- The API endpoint is `/api/admin/orders` (GET).

**Tasks:**
- Create an Angular component for admin order management.
- Use HttpClient to fetch all orders.
- Set up a Node.js/Express route to return all orders (admin-only).
- Secure the route with admin-only JWT authentication.

---

## Technical Notes
- **Frontend (Angular):** Use Angular 17+ for components, services, and routing. Implement reactive forms for user input and HttpClient for API communication. Use Angular Material or Bootstrap for UI styling.
- **Backend (Node.js/Express):** Create a RESTful API with Express. Use middleware for authentication (JWT) and error handling. Structure the project with controllers, services, and routes.
- **Database (Sequelize/MySQL):** Define models for User, Product, Cart, Order, and OrderItem. Use Sequelize associations (e.g., User hasMany Orders, Order hasMany OrderItems).
- **Authentication:** Implement JWT-based authentication for user and admin routes.
- **Learning Focus:** Each user story provides opportunities to practice Angular (UI, routing, services), Node.js/Express (API development), Sequelize (ORM queries, associations), and MySQL (database management).


Address: To store user shipping and billing addresses.
Payment: To track payment details and statuses.
Category: To organize products into categories.
Review/Ratings: For product reviews and ratings by users.
Inventory/Stock: To manage product stock levels.
Wishlist: For users to save products for later.
Coupon/Discount: To manage promotional codes and discounts.
Shipment/Delivery: To track shipping and delivery status.

future scope