# Amrat Kalash - Oil Store Platform

## Complete Application Flow Guide

### **Customer Journey**

#### 1. **Home Page → Browse Products**
- User lands on home page and clicks "Explore Products"
- Sees all oil products with their available variants and price ranges
- Clicks "View Details" on any product

#### 2. **Product Detail Page → Add to Cart**
- Customer selects desired variant (250ml, 1L, 5L, 10L)
- Chooses quantity
- **Clicks "Add to Cart"**
- **If NOT logged in**: 
  - Toast message: "Please login as a customer to add items to cart"
  - Redirected to `/auth` login page
- **If logged in as customer**: Item added to cart successfully

#### 3. **Login Page (if not authenticated)**
- Customer can:
  - **Sign In** with existing credentials (demo: customer@example.com / customer123)
  - **Sign Up** as a new customer with email, password, and name
- After successful login, automatically returns to continue shopping

#### 4. **Shopping Cart**
- View all added items
- Update quantities
- Remove items
- See order summary with subtotal and taxes
- Click "Proceed to Checkout"

#### 5. **Checkout Page**
- **Fill delivery address:**
  - Street Address
  - City
  - State
  - Pincode (6-digit validation)
  - Phone Number (10-digit validation)
- **Payment Method**: COD Only (Cash on Delivery)
- Click "Place Order"

#### 6. **Order Confirmation**
- Order successfully placed
- Confirmation page with order details
- **Actions triggered:**
  - ✅ Stock automatically reduced for purchased items
  - ✅ Confirmation email sent to customer with order details
  - ✅ Admin notification email sent with customer details & address
  - Cart cleared

#### 7. **Order Tracking**
- Customer can view order history (page structure ready for enhancement)

---

### **Admin Dashboard**

#### 1. **Login**
- Admin logs in with credentials (demo: admin@amratkalash.com / admin123)
- Redirected to admin dashboard at `/admin/dashboard`

#### 2. **Dashboard Overview**
Displays:
- Total Products count
- Total Product Variants count
- Total Stock Units
- Total Revenue (from all orders)
- Low Stock Alerts (items with < 10 units)
- Recent orders summary

#### 3. **Products Tab**
- View all products with variants
- **Edit**: Modify product details, ingredients, benefits, usage instructions
- **Delete**: Remove products from catalog

#### 4. **Inventory Tab** (Main feature)
Each product shows all variants with:
- **Variant Size** (250ml, 1L, 5L, 10L)
- **Price**: Current price (can be updated)
- **Stock**: Current stock quantity (can be updated)
- **Units Sold**: Number of units sold for this variant
- **Action Button**: "Update Stock/Price" to modify both

#### 5. **Update Stock/Price Page**
Admin can modify each variant independently:
- Update price
- Update stock quantity
- Changes reflected immediately across the platform

#### 6. **Orders Tab**
View all customer orders with:
- Order ID
- Customer name and email
- Order items (product, variant, quantity, price)
- Delivery address details
- Order status: Pending, Confirmed, Delivered, Cancelled
- **Manage Order**: Update order status

#### 7. **Email Log**
- View all emails sent in the system
- See customer confirmation emails
- See admin notification emails
- Full email content with customer details

---

### **Email System**

#### Customer Receives:
- **Order Confirmation Email**
  - Contains: Order ID, Items list, Total amount, Delivery address
  - Sent automatically upon order placement

#### Admin Receives:
- **New Order Notification Email**
  - Contains: Customer name, email, phone
  - Full order details (items, prices, quantities)
  - Complete delivery address
  - Used to process and dispatch orders

---

### **Stock Management Flow**

1. **Initial Stock**: Set during product creation
2. **On Purchase**: Stock automatically decreases by quantity purchased
3. **Admin Update**: Admin can manually adjust stock in Inventory Tab
4. **Low Stock Alert**: Dashboard alerts admin when any variant falls below 10 units

Example:
```
Mustard Oil 1L:
- Initial Stock: 100 units
- Customer buys 5 units → Stock becomes 95
- Admin can update to any value (e.g., add 50 more → 145)
- Units Sold shows: 5 (tracks lifetime sales)
```

---

### **Test Credentials**

**Customer Account:**
- Email: customer@example.com
- Password: customer123

**Admin Account:**
- Email: admin@amratkalash.com
- Password: admin123

---

### **Key Features Implemented**

✅ Dual authentication (Customer & Admin)  
✅ Product catalog with multiple variants and sizes  
✅ Shopping cart with quantity management  
✅ Full checkout flow with address collection  
✅ COD payment method  
✅ Automatic stock deduction on purchase  
✅ Units sold tracking per variant  
✅ Email notifications (customer & admin)  
✅ Admin inventory management dashboard  
✅ Price and stock updates  
✅ Order status management  
✅ Email log viewer  
✅ Modern, responsive UI  
✅ Data persistence with localStorage  

---

### **Navigation Map**

```
Home (/)
├── Products (/products)
│   └── Product Detail (/products/[id])
│       └── Requires Login to Add to Cart → /auth
│           └── Customer Cart (/customer/cart)
│               └── Checkout (/customer/checkout)
│                   └── Order Confirmation (/customer/orders/[id])
└── Auth (/auth)
    ├── Login
    └── Register

Admin Routes:
/admin/dashboard
├── /admin/products/[id]/edit (Edit product details, ingredients, benefits)
├── /admin/inventory (View all stock & units sold)
├── /admin/orders/[id] (Manage specific order status)
└── /admin/emails (View all email notifications)
```

---

### **For Developers**

The application uses:
- **Frontend**: Next.js 16 with React, TypeScript
- **Styling**: Tailwind CSS with custom amber color scheme
- **Storage**: localStorage (mock database)
- **Authentication**: Context API with localStorage persistence
- **Email System**: Mock email storage (ready for Resend integration)
- **UI Components**: shadcn/ui with custom modifications

All data is managed in-memory with localStorage backup for demo purposes.
