# Amrat Kalash E-Commerce Platform - Complete Workflow Guide

## Platform Overview

Amrat Kalash is a comprehensive e-commerce platform for selling premium oils (Soybean, Groundnut, Mustard) with multiple packaging variants. The platform has two user roles: **Customers** and **Admins**, each with distinct functionalities.

---

## CUSTOMER WORKFLOW

### 1. Home Page & Browsing
- User lands on the home page with brand information and features
- Navigation header shows "Login" button if not authenticated
- User can explore products by clicking "Explore Products"

### 2. Products Page
- Displays all 3 oil types: Soybean, Groundnut, Mustard
- Each oil shows available variants: 250ml, 1L, 2L, 5L, 10L
- Shows price range and stock status
- Customer can click "View Details" to see full product information

### 3. Product Details Page
- Full product information including:
  - Ingredients list
  - Health benefits
  - Usage instructions
  - Variant selection (size, price, stock)
  - Quantity selector
- **ADD TO CART Button**: Requires authentication
  - If customer is NOT logged in: Redirected to login page with message "Please login as a customer to add items to cart"
  - If logged in: Item is added to cart successfully

### 4. Login/Registration
- Two login types available:
  - **Customer Login**: For shopping
  - **Admin Login**: For inventory management
- Registration allows creation of new customer account
- Demo Credentials:
  - Customer: `customer@example.com` / `customer123`
  - Admin: `admin@amratkalash.com` / `admin123`

### 5. Shopping Cart
- Shows all added items with:
  - Product name & variant size
  - Unit price
  - Quantity (can be updated)
  - Subtotal
- Shows total cart value
- Options to remove items or proceed to checkout

### 6. Checkout Process
- Customer enters complete address:
  - Street Address
  - City
  - State
  - Pincode
  - Phone Number
- Payment method: **Cash on Delivery (COD) Only**
- Order summary review before final submission
- Click "Place Order" to complete purchase

### 7. Order Confirmation
- Order confirmation page displays:
  - Order ID (unique identifier)
  - Order date & time
  - Items ordered with quantities
  - Total amount
  - Delivery address
  - Order status: "Pending"
- **Two emails are sent automatically:**
  - **Customer Email**: Order confirmation with order details
  - **Admin Email**: New order notification with customer address and items

### 8. My Orders Section
- Customer can view all their orders
- Each order shows:
  - Order ID
  - Order date
  - Items ordered
  - Total amount
  - **Current Status**: Pending → Confirmed → Delivered
  - Delivery address
- Status updates in real-time when admin updates the order status

---

## ADMIN WORKFLOW

### 1. Admin Login
- Admin logs in with credentials: `admin@amratkalash.com` / `admin123`
- Redirected to Admin Dashboard

### 2. Admin Dashboard - Overview Tab
- Quick statistics:
  - Total products (3)
  - Total variants (15 across all products)
  - Total stock units available
  - Total orders received
  - Revenue statistics
- Low stock alerts (items with < 10 units remaining)
- Recent orders overview

### 3. Products Management - Products Tab
- View all 3 oil types
- For each product, can:
  - Edit product details (ingredients, benefits, usage)
  - Delete product (if needed)
  - Update individual variants

### 4. Inventory Management - Inventory Tab
- **Core Admin Feature**: Manage stock and prices for each variant
- For each oil type, displays all variants with:
  - Size (250ml, 1L, 2L, 5L, 10L)
  - Current Price (₹)
  - Current Stock (units)
  - **Units Sold** (lifetime sales tracker)
  - "Update Stock/Price" button

### 5. Update Stock & Prices
- Admin can independently:
  - **Update Stock**: Adjust quantity available for each variant
  - **Update Price**: Change selling price for each variant
- Stock automatically reduces when customers purchase:
  - Example: If customer buys Groundnut Oil 1L variant (qty 2), the stock for that variant decreases by 2
- Stock never goes negative (validation prevents over-selling)

### 6. Orders Management - Orders Tab
- View all customer orders with status
- For each order shows:
  - Order ID
  - Customer name & email
  - Order date
  - Items ordered (with quantities)
  - Total amount
  - **Current Status**: Pending, Confirmed, Delivered, Cancelled
  - Delivery address
- Can click on order to manage it

### 7. Order Status Management
- Admin can update order status progression:
  - **Pending** → Confirm order (status changes to "Confirmed")
  - **Confirmed** → Mark as delivered (status changes to "Delivered")
  - Can also cancel orders if needed
- **Important**: When admin updates status, customer sees the change immediately in their "My Orders" section
- Admin can send status update emails to customer

### 8. Email Notifications
- Admin has access to "Email Log" showing:
  - All order confirmation emails sent to customers
  - All order notification emails sent to admin
  - Full email content and timestamp
- Helps track communication history

---

## KEY FEATURES & WORKFLOWS

### Stock Management System
- Each oil variant has independent stock tracking
- When customer purchases: Stock automatically reduces
- Admin sees "Units Sold" metric for each variant
- Prevents overselling with validation

### Email Notification System
- **Customer Receives**:
  - Order confirmation with order ID, items, total, address
  - Status update notifications (when admin updates)
- **Admin Receives**:
  - New order alert with customer details, items, and delivery address
  - Real-time notification for each new order

### Order Status Synchronization
- Orders have single source of truth in admin system
- Customer sees real-time status updates
- No need for customer to refresh; updates are immediate
- Status flow: Pending → Confirmed → Delivered (or Cancelled)

### Authentication & Security
- Separate login for customers and admins
- Session persisted using browser storage
- Users remain logged in until they manually logout
- Each user role has access only to relevant features

---

## DATABASE STRUCTURE

### Products Database
```
Oil Type (3 total)
  ├─ Soybean Oil
  ├─ Groundnut Oil
  └─ Mustard Oil
       ├─ 250ml variant (price, stock)
       ├─ 1L variant (price, stock)
       ├─ 2L variant (price, stock)
       ├─ 5L variant (price, stock)
       └─ 10L variant (price, stock)
```

### Orders Database
```
Order (unique ID)
  ├─ Customer ID & Email
  ├─ Items (product, variant, quantity, price)
  ├─ Total Amount
  ├─ Delivery Address
  ├─ Status (pending/confirmed/delivered/cancelled)
  ├─ Payment Method (COD)
  └─ Timestamps (created, delivered)
```

---

## TESTING THE APPLICATION

### Customer Journey (Test Flow):
1. Go to home page (no login required)
2. Click "Explore Products"
3. Browse products and variants
4. Click "View Details" on any product
5. Try to "Add to Cart" → You'll be asked to login
6. Go to login page and enter: `customer@example.com` / `customer123`
7. Add items to cart
8. Proceed to checkout
9. Enter address details
10. Place order (COD payment)
11. See confirmation page and check email log
12. Go to "My Orders" to track order status

### Admin Journey (Test Flow):
1. Go to login page
2. Select Admin login
3. Enter: `admin@amratkalash.com` / `admin123`
4. View dashboard overview
5. Go to "Inventory Management"
6. Click "Update Stock/Price" for any variant
7. Update price or stock quantity
8. Go to "Orders" tab
9. Click on pending order
10. Update order status to "Confirmed"
11. Check email log to see notifications
12. Go back to "Products" page (as customer) and verify stock changed

---

## SUMMARY

The Amrat Kalash platform provides a complete e-commerce solution with:
- ✅ Customer shopping with authentication
- ✅ Cart management and checkout
- ✅ Real-time stock management
- ✅ Order tracking and status updates
- ✅ Email notifications for customers and admins
- ✅ Admin inventory management
- ✅ Order management with status tracking
- ✅ Complete order synchronization between customers and admins
