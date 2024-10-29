-- Users table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash_password VARCHAR(256) NOT NULL,
    phone_number VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE Categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- Products table
CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT REFERENCES Categories(id) ON DELETE SET NULL,
    stock INT NOT NULL CHECK (stock >= 0),
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart table
CREATE TABLE Cart (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    product_id INT REFERENCES Products(id) ON DELETE SET NULL,
    quantity INT NOT NULL CHECK (quantity > 0)
);

-- Orders table
CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('pending', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- OrderItems table
CREATE TABLE OrderItems (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES Orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES Products(id) ON DELETE SET NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL
);

-- Checkouts table
CREATE TABLE Checkouts (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES Orders(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    checkout_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) CHECK (status IN ('completed', 'failed', 'pending')) DEFAULT 'pending',
    method VARCHAR(50)
);
