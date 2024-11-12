# [Ecommerce Application](https://ecommerce-application-jyip.onrender.com/)

A monorepo for a full-stack Ecommerce application featuring a client side built with React and a server side with Express.js. PostgreSQL is used as the database for data persistence. This repository provides the entire stack in a single architecture to streamline development and deployment processes.

## Table of Contents

- [Ecommerce Application](#ecommerce-application)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Installation](#installation)
  - [Setup and Configuration](#setup-and-configuration)
  - [Running the Application](#running-the-application)
  - [Project Structure Details](#project-structure-details)
  - [License](#license)

## Project Structure

This project follows a monorepo architecture with the following structure:

```bash
Ecommerce_application 
    ├── client 
    │ └── public
    │ └── src
    ├── server 
    │ ├── controllers 
    │ ├── models 
    │ │ └── tables.sql 
    │ └── routes
    │ └── index.js
    └── package.json
```

## Technologies Used

- **Frontend**: React (JavaScript)
- **Backend**: Express.js (Node.js)
- **Database**: PostgreSQL
- **Monorepo Architecture**: Shared repository structure for client and server code
  
## Features

- **Filter Products by Category**: Users can browse products and filter them by category for a better shopping experience.
- **User Authentication**: Includes options for user login and registration.
- **GitHub Sign-Up**: Users can sign up quickly using their GitHub account.
- **Order Placement**: Both authenticated and non-authenticated users can place orders, with additional benefits for logged-in users.
- **Cart Checkout and Payment Processing**: Integrated Stripe payment gateway allows secure checkout and payment processing.

## Installation

Follow these steps to clone the repository and install dependencies for both the client and server:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Medo-ID/Ecommerce_application.git
    cd Ecommerce_application
    ```

2. **Install Dependencies**:
   - For monorepo we use workspaces, you can run in the root directory
    ```bash
    npm install
    ```
    **This will install dependencies for all packages defined in the workspace configuration.**

   - If you want to install new scopes and private packages in Workspaces you can run:
    ```bash
    npm install @scope/package-example --workspace "name of workspace client || server"
    ```

## Setup and Configuration

1. **Database Setup**:
   - Make sure you have PostgreSQL installed.
   - Create a new PostgreSQL database for the application.
   - Run the `tables.sql` script located in `server/models` to set up the necessary tables:
    ```sql
    \i path/to/tables.sql
    ```
   - Update your database credentials and configuration in the server code as required.

2. **Environment Variables**:
   - Create a `.env` file in the `server` folder with the following variables:
    ```env
    # server port
    PORT=<this one for developement you can use 3000>

    # database
    DB_USER=<database username>
    DB_NAME=<database name>
    DB_PASSWORD=<database password>
    DB_HOST=<database host || for dev use localhost>
    DB_PORT=<database port || 5432>

    # express session
    SESSION_SECRET=<strong secret for session>

    # envirement
    DEV_URL=<url for dev backend || http://localhost:3000>
    PROD_URL=<url fot hosted backend>
    NODE_ENV=<developement>

    # github auth 2.0 api keys
    GITHUB_CLIENT=<github client>
    GITHUB_SECRET=<github secret>

    # stripe payment api keys
    STRIPE_PUBLIC=<stripe public key>
    STRIPE_SECRET=<stripe secret key>
    ```

3. **Frontend Configuration**:
   - Ensure any necessary API URLs are configured in the client side code under `client/src`.
   - Create a `.env` file in the `client` folder with the following variables 
    ```env
    PORT=3001
    REACT_APP_DEV_URL=<http://localhost:3000>
    REACT_APP_PROD_URL=<url fot hosted backend>
    REACT_APP_ENV=<development>
    ```

## Running the Application

- **Start the App**:
  * **To start both the client and server concurrently, use the following command in the root directory:**
    ```bash
    npm start
    ```
    Or
    ```bash
    npm dev
    ```
    This command will run both the client and server:
    * Server: Runs on `http://localhost:3000` (as specified in `server/.env`)
    * Client: Runs on `http://localhost:3001` (as specified in `client/.env`)

## Project Structure Details

- **client/src**: Contains all React frontend code.
- **server/controllers**: Holds controller functions that manage the application logic.
- **server/models/tables.sql**: SQL script to create necessary tables for PostgreSQL.
- **server/index.js**: Entry point for the Express.js server, setting up routes and middleware.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy coding!