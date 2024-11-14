-- Users table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash_password BYTEA,
    salt BYTEA,
    phone_number VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Addresses table
CREATE TABLE Addresses (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(id) ON DELETE CASCADE,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Categories table
CREATE TABLE Categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- Products table with additional columns
CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image TEXT,
    category_id INT REFERENCES Categories(id) ON DELETE SET NULL,
    stock INT NOT NULL CHECK (stock >= 0),
    price NUMERIC(10, 2) NOT NULL,
    stripe_price_id VARCHAR(255) NOT NULL,
    rating FLOAT CHECK (rating >= 0 AND rating <= 5),
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


-- You can use this data for testing purposes
-- categories:
--   1 | Office    | Chairs designed for use in office environments, providing ergonomic support.
--   2 | Gaming    | Chairs designed for gamers, with enhanced support and style.
--   3 | Dining    | Comfortable chairs for dining rooms, available in various styles.
--   4 | Recliners | Chairs designed for relaxation with reclining functionality.
--   5 | Accent    | Chairs meant to add style and character to any room.
INSERT INTO categories (id, name, description)
VALUES
(1, 'Office', 'Chairs designed for use in office environments, providing ergonomic support.'),
(2, 'Gaming', 'Chairs designed for gamers, with enhanced support and style.'),
(3, 'Dining', 'Comfortable chairs for dining rooms, available in various styles.'),
(4, 'Recliners', 'Chairs designed for relaxation with reclining functionality.'),
(5, 'Accent', 'Chairs meant to add style and character to any room.');


-- products:

--  id |              name              |                                                 description                                                  |      image      | category_id | stock | price  | rating |         created_at         |         updated_at         |        stripe_price_id
-- ----+--------------------------------+--------------------------------------------------------------------------------------------------------------+-----------------+-------------+-------+--------+--------+----------------------------+----------------------------+---------------------------------------------------------------
--  14 | Electric Recliner              | An electric recliner with multiple reclining positions, USB charging port, and plush cushions.               | electric.png    |           4 |    15 | 499.99 |    4.9 | 2024-11-04 17:21:59.535612 | 2024-11-04 17:21:59.535612 | --create product from you stripe account and add price_id here 
--   8 | Classic Dining Chair           | A classic dining chair made of solid wood, with a comfortable upholstered seat.                              | classic.png     |           3 |    60 |  69.99 |    4.2 | 2024-11-04 17:21:59.535612 | 2024-11-04 17:21:59.535612 | --create product from you stripe account and add price_id here
--   5 | Velvet Accent Chair            | A velvet accent chair with a stylish design and soft upholstery, perfect for adding character to any room.   | velvet.png      |           5 |    30 | 159.99 |    4.6 | 2024-11-04 17:21:59.535612 | 2024-11-04 17:21:59.535612 | --create product from you stripe account and add price_id here
--  12 | Swivel Gaming Chair            | A swivel gaming chair with a sporty design, padded armrests, and headrest pillow for maximum comfort.        | swivel.png      |           2 |    30 | 189.99 |    4.6 | 2024-11-04 17:21:59.535612 | 2024-11-04 17:21:59.535612 | --create product from you stripe account and add price_id here
--  13 | Rustic Dining Chair            | A rustic dining chair made from reclaimed wood, featuring a natural finish for a vintage look.               | rustic.png      |           3 |    50 |  74.99 |    4.4 | 2024-11-04 17:21:59.535612 | 2024-11-04 17:21:59.535612 | --create product from you stripe account and add price_id here
--   7 | Racing Gaming Chair            | A racing-style gaming chair with extra lumbar and neck support, designed for long gaming sessions.           | racing.png      |           2 |    20 | 229.99 |    4.9 | 2024-11-04 17:21:59.535612 | 2024-11-04 17:21:59.535612 | --create product from you stripe account and add price_id here
--  10 | Patterned Accent Chair         | An accent chair with a unique patterned fabric, adding style and comfort to any room.                        | patterned.png   |           5 |    10 | 189.99 |    4.4 | 2024-11-04 17:21:59.535612 | 2024-11-04 17:21:59.535612 | --create product from you stripe account and add price_id here
--   3 | Modern Dining Chair            | A modern dining chair with a minimalist design, padded seat, and wooden legs.                                | modern.png      |           3 |   100 |  89.99 |    4.3 | 2024-11-04 17:21:59.535612 | 2024-11-04 17:21:59.535612 | --create product from you stripe account and add price_id here
--  15 | Mid-Century Accent Chair       | A mid-century accent chair with a stylish design, walnut wood legs, and upholstered seat.                    | mid-century.png |           5 |    35 | 219.99 |    4.5 | 2024-11-04 17:21:59.535612 | 2024-11-04 17:21:59.535612 | --create product from you stripe account and add price_id here
--   6 | Mesh Office Chair              | A mesh office chair with a breathable back, adjustable height, and swivel functionality.                     | mesh.png        |           1 |    75 |  99.99 |    4.4 | 2024-11-04 17:21:59.535612 | 2024-11-04 17:21:59.535612 | --create product from you stripe account and add price_id here
--   4 | Leather Recliner               | A leather recliner with plush padding, adjustable recline, and footrest.                                     | leather.png     |           4 |    25 | 299.99 |    4.7 | 2024-11-04 17:21:59.535612 | 2024-11-04 17:21:59.535612 | --create product from you stripe account and add price_id here
--   2 | High-Back Gaming Chair         | A high-back gaming chair with adjustable armrests, lumbar support, and a headrest pillow.                    | high-back.png   |           2 |    40 | 199.99 |    4.8 | 2024-11-04 17:21:59.535612 | 2024-11-04 17:21:59.535612 | --create product from you stripe account and add price_id here
--   9 | Fabric Recliner                | A fabric recliner with a smooth recline mechanism and soft cushioning for added comfort.                     | fabric.png      |           4 |    15 | 279.99 |    4.5 | 2024-11-04 17:21:59.535612 | 2024-11-04 17:21:59.535612 | --create product from you stripe account and add price_id here
--  11 | Executive Leather Office Chair | A high-end executive chair with genuine leather upholstery, ergonomic lumbar support, and adjustable height. | executive.png   |           1 |    20 | 349.99 |    4.7 | 2024-11-04 17:21:59.535612 | 2024-11-04 17:21:59.535612 | --create product from you stripe account and add price_id here
--   1 | Ergonomic Office Chair         | An ergonomic office chair with adjustable height, lumbar support, and breathable mesh back.                  | ergonomic.png   |           1 |    50 | 129.99 |    4.5 | 2024-11-04 17:21:59.535612 | 2024-11-04 17:21:59.535612 | --create product from you stripe account and add price_id here
INSERT INTO products (id, name, description, image, category_id, stock, price, rating, created_at, updated_at, stripe_price_id)
VALUES
(14, 'Electric Recliner', 'An electric recliner with multiple reclining positions, USB charging port, and plush cushions.', 'electric.png', 4, 15, 499.99, 4.9, '2024-11-04 17:21:59.535612', '2024-11-04 17:21:59.535612', 'price_1QJygHCkAk5G47klQDWny40u'),
(8, 'Classic Dining Chair', 'A classic dining chair made of solid wood, with a comfortable upholstered seat.', 'classic.png', 3, 60, 69.99, 4.2, '2024-11-04 17:21:59.535612', '2024-11-04 17:21:59.535612', 'price_1QJyfkCkAk5G47klvkvmXwIA'),
(5, 'Velvet Accent Chair', 'A velvet accent chair with a stylish design and soft upholstery, perfect for adding character to any room.', 'velvet.png', 5, 30, 159.99, 4.6, '2024-11-04 17:21:59.535612', '2024-11-04 17:21:59.535612', 'price_1QJyk8CkAk5G47klLBwy9We9'),
(12, 'Swivel Gaming Chair', 'A swivel gaming chair with a sporty design, padded armrests, and headrest pillow for maximum comfort.', 'swivel.png', 2, 30, 189.99, 4.6, '2024-11-04 17:21:59.535612', '2024-11-04 17:21:59.535612', 'price_1QJyjtCkAk5G47kl9P2BQDl0'),
(13, 'Rustic Dining Chair', 'A rustic dining chair made from reclaimed wood, featuring a natural finish for a vintage look.', 'rustic.png', 3, 50, 74.99, 4.4, '2024-11-04 17:21:59.535612', '2024-11-04 17:21:59.535612', 'price_1QJyjTCkAk5G47klhFCehupo'),
(7, 'Racing Gaming Chair', 'A racing-style gaming chair with extra lumbar and neck support, designed for long gaming sessions.', 'racing.png', 2, 20, 229.99, 4.9, '2024-11-04 17:21:59.535612', '2024-11-04 17:21:59.535612', 'price_1QJyjHCkAk5G47klZgmgkn7U'),
(10, 'Patterned Accent Chair', 'An accent chair with a unique patterned fabric, adding style and comfort to any room.', 'patterned.png', 5, 10, 189.99, 4.4, '2024-11-04 17:21:59.535612', '2024-11-04 17:21:59.535612', 'price_1QJyj3CkAk5G47klhyhUGuS8'),
(3, 'Modern Dining Chair', 'A modern dining chair with a minimalist design, padded seat, and wooden legs.', 'modern.png', 3, 100, 89.99, 4.3, '2024-11-04 17:21:59.535612', '2024-11-04 17:21:59.535612', 'price_1QJyimCkAk5G47klkD0ZqncQ'),
(15, 'Mid-Century Accent Chair', 'A mid-century accent chair with a stylish design, walnut wood legs, and upholstered seat.', 'mid-century.png', 5, 35, 219.99, 4.5, '2024-11-04 17:21:59.535612', '2024-11-04 17:21:59.535612', 'price_1QJyiZCkAk5G47klRIaqXRkq'),
(6, 'Mesh Office Chair', 'A mesh office chair with a breathable back, adjustable height, and swivel functionality.', 'mesh.png', 1, 75, 99.99, 4.4, '2024-11-04 17:21:59.535612', '2024-11-04 17:21:59.535612', 'price_1QJyiOCkAk5G47klVuqnKbrk'),
(4, 'Leather Recliner', 'A leather recliner with plush padding, adjustable recline, and footrest.', 'leather.png', 4, 25, 299.99, 4.7, '2024-11-04 17:21:59.535612', '2024-11-04 17:21:59.535612', 'price_1QJyiCCkAk5G47klIpdO841F'),
(2, 'High-Back Gaming Chair', 'A high-back gaming chair with adjustable armrests, lumbar support, and a headrest pillow.', 'high-back.png', 2, 40, 199.99, 4.8, '2024-11-04 17:21:59.535612', '2024-11-04 17:21:59.535612', 'price_1QJyhrCkAk5G47klifXmeEhU'),
(9, 'Fabric Recliner', 'A fabric recliner with a smooth recline mechanism and soft cushioning for added comfort.', 'fabric.png', 4, 15, 279.99, 4.5, '2024-11-04 17:21:59.535612', '2024-11-04 17:21:59.535612', 'price_1QJyhbCkAk5G47klEggPxVid'),
(11, 'Executive Leather Office Chair', 'A high-end executive chair with genuine leather upholstery, ergonomic lumbar support, and adjustable height.', 'executive.png', 1, 20, 349.99, 4.7, '2024-11-04 17:21:59.535612', '2024-11-04 17:21:59.535612', 'price_1QJyhKCkAk5G47kllT6mBbHX'),
(1, 'Ergonomic Office Chair', 'An ergonomic office chair with adjustable height, lumbar support, and breathable mesh back.', 'ergonomic.png', 1, 50, 129.99, 4.5, '2024-11-04 17:21:59.535612', '2024-11-04 17:21:59.535612', 'price_1QJygzCkAk5G47klny4UdAX6');