📦 **Inventory Management System**

A full-stack inventory and order management web application built with React, Express, TypeScript, and PostgreSQL. The system provides real-time inventory tracking, stock monitoring, order processing, and demand forecasting — all within a modern dashboard interface.
<img width="1900" height="813" alt="inventory management project " src="https://github.com/user-attachments/assets/28a84a72-6b68-428e-89c5-d00f390e2f94" />
<img width="1894" height="772" alt="Screenshot (24)" src="https://github.com/user-attachments/assets/4edb31be-9a68-4743-801f-693a2f4477d2" />


🚀 **Features**

📊 ****Dashboard** – Real-time metrics: total products, revenue tracking, pending orders, and low-stock alerts

📦 **Inventory Management** – Product CRUD, supplier tracking, stock level monitoring

🛒 **Order Processing** – Order lifecycle management with fulfillment tracking

🔔 **Stock Monitoring** – Automated low stock & out-of-stock alerts with configurable thresholds

📈 **Analytics** – Demand forecasting, stock movement analysis, and interactive charts

📑 **Replenishment** – Smart recommendations based on historical sales & stock trends

🔐 **Authentication Ready** – Session handling in place, extendable for user login & roles

🏗 **System Architecture**
Frontend

⚛️ React (TypeScript) with Vite for fast builds

🎨 Tailwind CSS + Shadcn/UI (Radix UI primitives) for modern UI

🔄 React Query (TanStack) for server state management

📝 React Hook Form + Zod for form validation

🌐 Wouter for lightweight routing

**Backend**

🚀 Express.js with TypeScript (ESM)

🛠 RESTful API with centralized routing

🗄 Drizzle ORM for type-safe DB queries

✅ Zod schemas for request & response validation

🔥 Hot reloading with Vite middleware integration

**Database**

🐘 PostgreSQL (Neon serverless)

🔑 Auto-generated UUIDs for primary keys

🏗 Managed with Drizzle migrations

📊 **Models**: Products, Orders, StockMovements, Alerts, ReplenishmentRecommendations

🛠 Tech Stack

Frontend
React · TypeScript · TailwindCSS · Shadcn/UI · React Query · Wouter · React Hook Form

Backend
Node.js · Express · TypeScript · Drizzle ORM · Zod

Database
PostgreSQL (Neon) · Drizzle Kit · connect-pg-simple

Build Tools
Vite · ESBuild · TSX

⚙️ Getting Started
1️⃣ Clone the Repository
git clone https://github.com/Rachit-sahu/Inventory-management-system/tree/main
cd inventory-management

2️⃣ Install Dependencies
# Install both frontend & backend dependencies
npm install

3️⃣ Configure Environment

Create a .env file in the backend directory with your PostgreSQL credentials:

DATABASE_URL=your_neon_postgres_url
SESSION_SECRET=your_secret_key

4️⃣ Run Development Server
# Start backend
cd backend
npm run dev

# Start frontend
cd frontend
npm run dev


📌 Roadmap

 Role-based authentication (Admin, Staff, Supplier)

 PDF/CSV export for reports

 Email/SMS alerts for stock notifications

 Advanced AI-based demand forecasting

🤝 **Contributing**

Pull requests are welcome! Please open an issue first to discuss what you’d like to change.

📜 **License**

This project is licensed under the MIT License.
