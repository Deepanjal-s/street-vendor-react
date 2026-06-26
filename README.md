# 🍔 HyperLocal Food Delivery Platform

A full-stack MERN application that connects customers with local street food vendors and delivery partners. The platform allows customers to browse vendors, place orders, while vendors can manage their menus and delivery partners can handle deliveries.

## Live Demo

🔗 **Live Application:** https://street-vendor-react-ctae.vercel.app/

## Features

### Customer

* User registration and login
* Browse vendors and menus
* Add items to cart
* Place orders
* View order history

### Vendor

* Vendor registration and login
* Manage menu items (Add, Update, Delete)
* View and manage incoming orders
* Vendor dashboard

### Delivery Partner

* Delivery partner registration and login
* View assigned orders
* Update order status
* Delivery dashboard

### Authentication & Security

* JWT-based authentication
* Role-based access control
* Protected routes

## Tech Stack

**Frontend**

* React.js
* Vite
* React Router DOM
* CSS

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose

**Authentication**

* JSON Web Token (JWT)

**Deployment**

* Frontend: Vercel
* Backend: Render

## Project Structure

```text
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/

frontend/
├── src/
│   ├── assets/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
```

## Local Setup

### Clone the repository

```bash
git clone https://github.com/Deepanjal-s/street-vendor-react.git
cd street-vendor-react
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

## Future Improvements

* Payment gateway integration
* Reviews and ratings
* Search and filtering
* Image upload support
* Real-time order tracking
* Location-based vendor discovery

## Author

**Deepanjal Shukla**

* GitHub: https://github.com/Deepanjal-s
* LinkedIn: https://github.com/deepanjal-shukla
