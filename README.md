
---

# 🔮 GlassBoard - Modern MERN Admin Dashboard

**GlassBoard** is a high-performance, responsive Admin Dashboard built with the **MERN Stack** (MongoDB, Express, React, Node.js). It features a distinct **Glassmorphism UI** design aesthetic, utilizing blurred backgrounds, semi-transparent cards, and smooth Framer Motion animations to provide a premium user experience.

---

## 📑 Table of Contents

* [Key Features](https://www.google.com/search?q=%23-key-features)
* [Tech Stack](https://www.google.com/search?q=%23-tech-stack)
* [Prerequisites](https://www.google.com/search?q=%23-prerequisites)
* [Environment Variables](https://www.google.com/search?q=%23-environment-variables)
* [Installation & Setup](https://www.google.com/search?q=%23-installation--setup)
* [Project Structure](https://www.google.com/search?q=%23-project-structure)
* [API Endpoints](https://www.google.com/search?q=%23-api-endpoints)
* [Screenshots](https://www.google.com/search?q=%23-screenshots)
* [Contributing](https://www.google.com/search?q=%23-contributing)
* [License](https://www.google.com/search?q=%23-license)

---

## 🚀 Key Features

### 🔐 **Authentication & Security**

* **JWT Authentication:** Secure stateless authentication using JSON Web Tokens.
* **Role-Based Access Control (RBAC):** Distinct access levels for **Admins** and **Members**.
* **Protected Routes:** Frontend route guards to prevent unauthorized access.
* **Secure Password Hashing:** Utilizes `bcryptjs` for encryption.

### 📊 **Interactive Dashboard**

* **Visual Metrics:** Real-time statistics displayed on glass cards.
* **Data Visualization:** Interactive charts showing user growth and platform activity.
* **Responsive Sidebar:** Collapsible navigation with active state highlighting.

### 👥 **User Management**

* **CRUD Operations:** Full capability to Create, Read, Update, and Delete users.
* **Advanced Filtering:** Filter users by Role (Admin/Member) or Status (Active/Banned).
* **Live Search:** Instant search functionality to find users by name or email.
* **Status Management:** One-click actions to ban or activate user accounts.

### 🔔 **Notification System**

* **Broadcast Center:** Admins can send global alerts (Info, Success, Warning, Critical).
* **Real-time UI:** Navbar bell icon with a live unread counter.
* **Notification Management:** Interface to view sent history, schedule alerts, or save drafts.

### 📜 **Activity Logging**

* **Audit Trail:** Comprehensive logs of all critical system actions (Logins, Updates, Deletions).
* **Visual Status:** Color-coded logs indicating success, warnings, or errors.
* **Metadata:**  timestamps, and actor details.

---

## 🛠 Tech Stack

### **Frontend**

* **React.js (Vite):** Blazing fast frontend build tool.
* **Redux Toolkit:** Centralized state management for Auth, Users, and Notifications.
* **Tailwind CSS:** Utility-first CSS framework for styling.
* **Framer Motion:** Production-ready animation library for React.
* **Lucide React:** Beautiful, consistent icon set.
* **Axios:** Promise-based HTTP client.

### **Backend**

* **Node.js:** JavaScript runtime environment.
* **Express.js:** Fast, unopinionated web framework for Node.js.
* **MongoDB & Mongoose:** NoSQL database and object modeling.
* **JsonWebToken (JWT):** Secure transmission of information.
* **Dotenv:** Environment variable management.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

* [Node.js](https://nodejs.org/) (v14 or higher)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [MongoDB](https://www.mongodb.com/) (Local or Atlas Cloud)

---

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the **backend** folder.

Create a file named `.env` in `glassboard/backend/`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/glassboard
JWT_SECRET=your_super_secret_random_string_here

```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/glassboard.git
cd glassboard

```

### 2. Backend Setup

Navigate to the backend directory, install dependencies, and start the server.

```bash
cd server
npm install

# Run in development mode (with Nodemon)
npm run dev

```

*Server should be running on `http://localhost:5000*`

### 3. Frontend Setup

Open a **new terminal** window, navigate to the frontend directory, and start the client.

```bash
cd client
npm install

# Run the Vite development server
npm run dev

```

*Client should be running on `http://localhost:5173*`

---

## 📂 Project Structure

```text
glassboard/
├── backend/
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic (Auth, Users, Notifications)
│   ├── middleware/         # Auth protection, Error handling
│   ├── models/             # Mongoose Schemas (User, Notification, Log)
│   ├── routes/             # API Routes definitions
│   └── server.js           # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/     
│   │   │   ├── common/     # Reusable UI (GlassCard, Modal, Loader)
│   │   │   ├── Dashboard/  # Dashboard specific widgets
│   │   │   └── Navbar.jsx  # Navigation bar
│   │   ├── pages/          
│   │   │   ├── auth/       # Login & Register pages
│   │   │   ├── dashboard/  # Main dashboard views
│   │   │   └── Home.jsx    # Landing page
│   │   ├── redux/          # Redux Slices (authSlice, userSlice, etc.)
│   │   └── utils/          # Helpers (axios config, notify toast)
│   └── App.jsx             # Main App Component & Routing
└── README.md

```

---

## 📡 API Endpoints

### **Authentication**

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Authenticate user & get token | Public |
| `GET` | `/api/auth/me` | Get current user profile | Private |

### **User Management**

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `GET` | `/api/users` | Get all users | Admin |
| `PUT` | `/api/users/:id` | Update user details | Admin |
| `DELETE` | `/api/users/:id` | Delete a user | Admin |

### **Notifications**

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `POST` | `/api/notification` | Send broadcast notification | Admin |
| `GET` | `/api/notification` | Get user notifications | Private |

---



---

<div align="center">
<strong>Built with 💙 by Man Patel</strong>
</div>
