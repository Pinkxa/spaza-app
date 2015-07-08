#SALES TABLE
#inserting without converting price and date to decimal and date format
insert into sales (product_id,date,price,quantity)
select products.id as theID,
       sales_csv.date as theDate,
       sales_csv.price as thePrice,
       sales_csv.quantity as theQuantity 
from sales_csv,products 
where products.name=sales_csv.stock_item




#inserting with converted price from string to decimal
insert into sales (product_id,date,price,quantity)
SELECT products.id AS theID,
	   sales_csv.date AS theDate, 
	   CAST( REPLACE( SUBSTRING( sales_csv.sales_price, 2 ) ,  ',',  '.' ) AS DECIMAL( 10, 2 ) ) AS thePrice,
	   sales_csv.no_sold AS theQuantity
FROM sales_csv, products
WHERE products.name = sales_csv.stock_item




 
#inserting with converted price and date from string to date format
insert into sales (product_id,date,price,quantity)
SELECT products.id AS theID,
       STR_TO_DATE(CONCAT(sales_csv.date,'-2015'),'%e-%b-%Y') AS theDate, 
       CAST( REPLACE( SUBSTRING( sales_csv.sales_price, 2 ) ,  ',',  '.' ) AS DECIMAL( 10, 2 ) ) AS thePrice, 
       sales_csv.no_sold AS theQuantity
FROM sales_csv, products
WHERE products.name = sales_csv.stock_item

#SUPPLIERS TABLE
insert into suppliers (name)
select distinct purchases_csv.shop from purchases_csv 


#PURCHASESTABLE
/*insert into purchases (product_id,date,price)
SELECT products.id AS theID,
       STR_TO_DATE(CONCAT(purchases_csv.date,'-2015'),'%e-%b-%Y') AS theDate, 
       CAST( REPLACE( SUBSTRING( purchases_csv.cost, 2 ) ,  ',',  '.' ) AS DECIMAL( 12, 2 ) ) AS thePrice 
FROM purchases_csv, products
WHERE products.name = purchases_csv.item*/

insert into purchases (date,price,supplier_id,product_id)
select stock.date,stock.price,stock.supplier_id,products.id as Product_id from 
(
    SELECT STR_TO_DATE(CONCAT(purchases_csv.date,'-2015'),'%e-%b-%Y') AS DATE,
    	   CAST( REPLACE( SUBSTRING( purchases_csv.cost, 2 ) ,  ',',  '.' ) AS DECIMAL( 10, 2 ) ) AS Price,
           suppliers.id AS Supplier_id,
           purchases_csv.item AS Product
    FROM purchases_csv, suppliers 
WHERE purchases_csv.shop = suppliers.name
) 
stock,products
where stock.product = products.name
