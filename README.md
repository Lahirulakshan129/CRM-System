# 📊 CRM Lead Management System

---

## 🌍 Project Overview

The CRM system is designed to help a small sales team manage and track leads throughout the sales pipeline.

It allows users to:

- Create and manage sales leads
- Track lead progress through different stages
- Add internal notes for each lead
- View analytics through a dashboard
- Filter and search leads efficiently

---

## ⚙️ Tech Stack Used

| Layer          | Technology                 |
| -------------- | -------------------------- |
| Frontend       | React (Vite), Tailwind CSS |
| Backend        | Spring Boot                |
| Database       | PostgreSQL                 |
| Authentication | JWT (Spring Security)      |
| API            | RESTful APIs               |

---

## 🧩 Features Implemented

### 🔐 Authentication

- Login system using JWT
- Protected routes
- Test user support

### 👤 Lead Management (CRUD)

- Create new leads
- View all leads
- Edit lead details
- Delete leads
- Update lead status

Each lead includes:

- Lead Name
- Company Name
- Email & Phone Number
- Lead Source
- Assigned Salesperson
- Status (New, Contacted, Qualified, Proposal Sent, Won, Lost)
- Estimated Deal Value
- Created & Updated Date

---

### 📝 Lead Notes

- Add internal notes to each lead
- Track communication history
- Store note content, author, and timestamp

---

### 📊 Dashboard

- Total Leads
- New Leads
- Qualified Leads
- Won Leads
- Lost Leads
- Total Estimated Deal Value
- Total Value of Won Deals

---

### 🔎 Search & Filtering

- Filter by:
  - Status
  - Lead Source
  - Assigned Salesperson
- Search by:
  - Lead name
  - Company name
  - Email

---

## 🚀 How to Run Locally

### 📌 Prerequisites

- Node.js (v18+)
- Java 17+
- Maven
- PostgreSQL

---

### 🔧 Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173


### 🖥️ Backend Setup (Spring Boot)

1. Import backend project into IDE (IntelliJ / Eclipse / VS Code)

2. Configure database in `application.properties`:

spring.datasource.url=jdbc:postgresql://localhost:5432/crm_db
spring.datasource.username=postgres
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update

jwt.secret=your_secret_key
jwt.expiration=86400000


3. Run backend:

mvn spring-boot:run

Backend runs at:

http://localhost:8080


## 🔐 Environment Variables

### Frontend (.env)


VITE_API_BASE_URL=http://localhost:8080/api


---

## 🔑 Test Login Credentials

Email: admin@example.com
Password: password123
---

## 🗄️ Database Setup

1. Create PostgreSQL database:
CREATE DATABASE crm_db;

2. Tables are automatically created using Hibernate.

3. Ensure PostgreSQL service is running before starting backend.

## ⚠️ Known Limitations

* No real-time notifications
* No email integration (SMTP not implemented)
* Basic UI
* No production deployment configuration
* No advanced analytics
```
