# 📊 CRM System – Customer Relationship Management Platform

**CRM System** is a full-stack web application designed to manage customer relationships, leads, and business interactions efficiently.  
It provides a centralized platform for tracking leads, managing customers, and improving sales workflow using a modern web architecture.

---

## 🌍 Overview

This CRM system allows:

- Sales teams to **manage leads and customers**
- Track **communication history and interactions**
- Organize and update **lead status**
- Admins to manage **system data**
- Real-time data interaction between frontend and backend

---

## ⚙️ Tech Stack

| Layer          | Technology                 |
| -------------- | -------------------------- |
| Frontend       | React (Vite), Tailwind CSS |
| Backend        | Spring Boot                |
| Database       | PostgreSQL                 |
| Authentication | JWT (Spring Security)      |
| API            | RESTful Services           |

---

## 🧩 Key Features

### 👤 Lead & Customer Management

- Create, update, and delete leads
- Track lead status and progression

### 📊 Dashboard & Analytics

- Overview of total leads and conversions
- Status-based analytics

### 🔐 Authentication & Security

- JWT-based authentication

---

## 🧠 Architecture

Frontend (React + Vite)
↓ REST API
Backend (Spring Boot)
↓
Database (PostgreSQL)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or above)
- JDK 17+
- Maven
- PostgreSQL

---

## 🔧 Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
🖥️ Backend Setup (Spring Boot)
Import backend project into IDE (IntelliJ / Eclipse / VS Code)
Configure application.properties:
spring.datasource.url=jdbc:postgresql://localhost:5432/crm_db
spring.datasource.username=postgres
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update

jwt.secret=your_secret_key
Run the application:
mvn spring-boot:run

Backend runs at:

http://localhost:8080

📌 Notes
Ensure backend is running before starting frontend
Update API base URL in frontend .env file if required
Use Postman for testing backend APIs
Default ports:
Frontend: 5173
Backend: 8080
```
