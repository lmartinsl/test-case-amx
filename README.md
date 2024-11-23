# Angular Project - Test for AMX (Front-End Angular Senior)

This repository contains an Angular 16 project developed as part of a technical test for a Front-End Angular Senior position at AMX. The project implements a **CRUD for products** and includes a **login screen with profile validation**.

## Features and Technologies

- **Angular 16**
- **PrimeNG**
- **FontAwesome**
- **JSON Server** for mock RESTful APIs
- **RESTful API Integration**
- **Lazy Loading** for modular architecture

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later)
- **Angular CLI** (v16 or later)
- **Git** (optional for cloning the repository)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/angular-test-project.git
   cd angular-test-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the JSON Server:**
   ```bash
   npm run json-server
   ```
   This will launch a mock RESTful API to handle CRUD operations for products.

4. **Run the Angular application:**
   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

---

## Project Structure

```plaintext
src/
├── app/
│   ├── core/            # Shared services and models
│   ├── features/        # Feature modules (login, product CRUD)
│   ├── app-routing.module.ts # Lazy loading routes
│   └── app.module.ts    # Main module
├── assets/
│   ├── styles/          # Global SCSS styles
│   └── mock-data/       # JSON Server mock data
├── environments/        # Environment configurations
└── styles.scss          # Global styles entry point
```

---

## Usage Instructions

1. **Login Screen:**
   - Enter credentials to access the system. Profile validation is implemented to ensure role-based access.

2. **Product CRUD:**
   - Create, Read, Update, and Delete products via a user-friendly interface.
   - Data is persisted using JSON Server.

---

## Custom Scripts

- **Run JSON Server:**
  ```bash
  npm run json-server
  ```
  Mock API available at `http://localhost:3000`.

- **Start Angular Application:**
  ```bash
  npm start
  ```

---

## Notes

This project was created for evaluation purposes and serves as a demonstration of skills with Angular and related technologies. If you have any questions, feel free to contact me.

**Lucas Martins Lima**  
*Front-End Angular Senior Developer*