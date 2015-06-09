
drop table  if exists  categories;

create table categories(
     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(50)
);

drop table  if exists  products;

create table products(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

drop table if exists sales;

create table sales(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	date DATE,
	quantity INT,
	price DECIMAL, 
    product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);  

-- ?????
drop table if exists suppliers;

create table suppliers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40),
    product_id INT NOT NULL,
    quantity INT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

drop table if exists stock_purchases;

create table stock_purchases (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    product_id INT NOT NULL,
    price DECIMAL,
    supplier_id INT NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

drop table  if exists orders_csv;

create table orders_csv(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    shop VARCHAR(20),
    date DATE,
    item_name VARCHAR(40),
    quantity INT,
    cost DECIMAL,
    total_cost DECIMAL
);

drop table  if exists purchases_csv;

create table purchases_csv(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    day VARCHAR(20),
    date DATE,
    stock_item VARCHAR(50),
    no_sold INT,
    sales_price DECIMAL
);