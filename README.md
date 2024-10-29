# Ecommerce REST API

A boilerplate for building an ecommerce REST API with features for user authentication, managing a cart, placing orders, and handling products. This project provides a foundational structure with a few essential features, leaving room for further customization and expansion.

---

## Features

- **User Authentication:** Register, login, and logout functionality
- **Cart Management:** Add, retrieve, and delete items from the cart
- **Order Placement:** Checkout, create orders, and view order details
- **Product Management:** Retrieve all products, search by category, and view individual product details
- **User Management:** Retrieve user profiles, update user information

## Future Improvements

This project is intended as a boilerplate, and additional features can be added, including:
- **Admin APIs:** Add functionalities for admin users, such as adding or removing products, managing users, etc.
- **Frontend Client:** Develop a client interface (e.g., in React, Vue) to interact with the API.
- **Additional Payment Integrations:** Connect to third-party payment gateways for a complete checkout experience.
- **Order Status Tracking:** Implement notifications and tracking for order status updates.
- **Enhanced Security and Optimization:** Add security layers and caching mechanisms.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **PostgreSQL** (v12 or higher)

### Installation

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/Medo-ID/Ecommerce_REST_API.git
    cd Ecommerce_REST_API

2. **Install Dependencies:**
    ```bash
    npm install

3. **Create Environment Variables:**
    In the root directory, create a `.env` file and add the following environment variables:
    ```bash
    PORT=port
    DB_USER=db_username
    DB_NAME=db_name
    DB_PASSWORD=db_password
    DB_HOST=localhost
    SESSION_SECRET=your_session_secret

4. **Database Setup:**
   **Make sure PostgreSQL is installed and running on your system.**
   - Start PostgreSQL and create the database:
        ```bash
        psql -U your_username -c "CREATE DATABASE ecommerce_db;"
   
   - Execute the SQL file to create the necessary tables:
        ```bash
        psql -d ecommerce_db -f ./src/db/create-tables.sql
   
   - Start PostgreSQL and create the database:
        ```bash
        psql -U your_username -c "CREATE DATABASE ecommerce_db;"


5. **Start the Server:**
    ```bash
    npm start

The API should now be running at http://localhost:3000.

## API Documentation

- For detailed API documentation, access the Swagger UI at http://localhost:3000/api-docs.

## Usage

Here are some example routes:

- Register User: POST /register
- Login User: POST /login
- View Cart: GET /cart
- Add Item to Cart: POST /cart/:product_id
- Delete Item from Cart: DELETE /cart/:product_id
- Checkout: POST /order
- View Products: GET /products
- View Product by Category: GET /products/category

## Contributing

Feel free to fork this project and submit pull requests for additional features or improvements.

## License

This project is open-source and available under the MIT License.