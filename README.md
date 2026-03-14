
Live Link : https://the-spicy-biryani.vercel.app

Demo Admin_Email=tafia@gmail.com
Demo Admin_password=Tafia26@#

# 🍛 TheSpicyBiryani

**TheSpicyBiryani** is a modern restaurant web application built with **Next.js**.
It allows users to explore delicious biryani dishes, view detailed food items, and manage products through an admin-friendly dashboard. The platform provides a smooth and responsive user experience with authentication and dynamic data from MongoDB.

---

## 🚀 Project Description

TheSpicyBiryani is a full-stack restaurant website designed to showcase different food items such as biryani, drinks, and special offers.

Users can:

* Browse menu items
* View detailed food information
* Register and log in using Google authentication
* See customer reviews
* Explore special offers

Admins can:

* Add new food items
* Manage existing products
* Update or delete items

The website is fully responsive and optimized for both desktop and mobile devices.

---

## ⚙️ Setup & Installation

Follow these steps to run the project locally.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Fahmida0010/TheSpicyBiryani-.git
```

### 2️⃣ Go to the project folder

```bash
cd TheSpicyBiryani
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Create environment variables

Create a `.env.local` file in the root directory and add:

```
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 5️⃣ Run the development server

```bash
npm run dev
```

Now open:

```
http://localhost:3000
```

---

## 🗂 Route Summary

| Route              | Description                                         |
| ------------------ | --------------------------------------------------- |
| `/`                | Home page with banner, offers, and featured food    |
| `/items`           | Shows all food items                                |
| `/items/[id]`      | Displays detailed information about a selected item |
| `/login`           | User login page                                     |
| `/register`        | User registration page                              |
| `/add-items`     |here  new food items   can be added                     |
| `/manage-items` | here items can  be managed, updated, or deleted        |
| `/contact`     | here  contact info can be found                     |
| `/about` | here you will see details info about the restaurant       |
---

## 🛠 Technologies Used

* **Next.js**
* **Tailwind CSS**
* **MongoDB**
* **NextAuth.js**
* **JavaScript**

---

## ✨ Features

* Responsive restaurant UI
* Google authentication
* Dynamic food menu
* Customer review section
* product management
* MongoDB database integration

---

## 📌 Future Improvements

* Online food ordering system
* Payment gateway integration
* User order history
* Admin analytics dashboard

---

⭐ If you like this project, feel free to give it a star on GitHub!
