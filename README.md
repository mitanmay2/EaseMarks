# 🎓 Engineering College Marks Management System

A full-stack web application designed to manage student records, marks, CGPA calculation, and academic workflows with a modern UI and PHP-MySQL backend.

---
🚀 Features

* 🔐 **Authentication System**

  * Password login
  * Face Recognition login (demo-based)

* 👨‍💼 **Role-Based Access**

  * Admin
  * HOD (Head of Department)
  * Faculty / Class Coordinator

* 📊 **Dashboard**

  * Real-time statistics
  * Recent activities
  * Quick actions

* 🧑‍🎓 **Student Management**

  * Add, edit, and view students
  * Academic year filtering

* 📝 **Marks Entry System**

  * Internal, Mid-Sem, End-Sem marks
  * Automatic grade calculation
  * CGPA & SGPA calculation

* 📈 **Reports**

  * Performance reports
  * Export functionality

* 🧠 **Smart Features**

  * Face recognition (simulated)
  * CGPA caching for performance
  * Dynamic subject generation

* 🎨 **Modern UI/UX (2K26 Style)**

  * Light/Dark mode support
  * Smooth animations
  * Responsive design
  * Design tokens system

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3 (Modern Design System)
* JavaScript (Vanilla JS)

### Backend

* PHP (API-based structure)
* MySQL Database

---

## 📁 Project Structure

```
📦 project-root
 ┣ 📜 index.html        # Main UI
 ┣ 📜 style.css         # UI/UX Styling
 ┣ 📜 app.js            # Frontend Logic
 ┣ 📜 index.php         # Backend API Router
 ┣ 📜 config.php        # Database Config
 ┣ 📜 schema.sql        # Database Schema
 ┗ 📜 README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install XAMPP / Local Server

Download and install XAMPP.

### 2️⃣ Start Services

* Start **Apache**
* Start **MySQL**

### 3️⃣ Move Project

Place project folder inside:

```
htdocs/
```

### 4️⃣ Create Database

* Open phpMyAdmin
* Create database:

```
emarks_db
```

### 5️⃣ Import Schema

* Import `schema.sql`

### 6️⃣ Configure Database

Edit `config.php` if needed:

```php
DB_HOST = '127.0.0.1';
DB_NAME = 'emarks_db';
DB_USER = 'root';
DB_PASSWORD = '';
```

### 7️⃣ Run Project

Open in browser:

```
http://localhost/your-folder-name/
```

---

## 🔑 Demo Credentials

| Role              | Email                                                     | Password                                  |
| ----------------- | --------------------------------------------------------- | ----------------------------------------- |
| Class Coordinator | [ashwini.mam@lspgcoer.in](mailto:ashwini.mam@lspgcoer.in) | ashwini@mam                               |
| HOD               | [hod@lspgcoer.in](mailto:hod@lspgcoer.in)                 | [hod@lspgcoer.in](mailto:hod@lspgcoer.in) |
| Admin             | [Tanmay@lspgcoer.in](mailto:Tanmay@lspgcoer.in)           | Tanmay@56                                 |
| Admin             | [Amruta@lspgcoer.in](mailto:Amruta@lspgcoer.in)           | Amruta@16                                 |

---





---

📌 Future Enhancements

* 🔗 Real AI-based face recognition
* 📱 Mobile app version
* 📊 Advanced analytics dashboard
* 🔔 Notifications system
* 🌐 Cloud deployment

---

🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a Pull Request

---

📄 License

This project is for educational purposes.

---

👨‍💻 Author

Tanmay Chaudhary

---

⭐ If you like this project, don’t forget to star the repository!
