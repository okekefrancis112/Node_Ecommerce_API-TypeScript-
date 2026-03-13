# Node E-Commerce API (TypeScript)

A TypeScript implementation of an e-commerce REST API built with Node.js and MongoDB, featuring product, user, and order management.

## Overview

A TypeScript-based e-commerce backend API providing user authentication, product catalog management, brands, categories, coupons, and email notifications. Compiled to JavaScript for production deployment.

## Features

- **TypeScript** — Type-safe codebase
- **User Management** — JWT authentication with refresh tokens
- **Product Catalog** — Full CRUD with categories and brands
- **Coupon System** — Discount coupon management
- **Email Notifications** — Automated email integration
- **Compiled Output** — TypeScript → JavaScript build

## Tech Stack

- **TypeScript** — Language
- **Node.js** + **Express** — Backend framework
- **MongoDB** + **Mongoose** — Database
- **JWT** — Authentication

## Getting Started

```bash
git clone https://github.com/okekefrancis112/Node_Ecommerce_API-TypeScript-.git
cd Node_Ecommerce_API-TypeScript-
npm install
npm run build
npm start
```

## Project Structure

```
├── src/                     # TypeScript source
│   ├── config/              # DB, JWT configuration
│   ├── controller/          # API controllers
│   ├── models/              # Mongoose models
│   ├── routes/              # Express routes
│   └── middlewares/         # Auth middleware
├── built/                   # Compiled JavaScript
└── tsconfig.json
```

## License

MIT
