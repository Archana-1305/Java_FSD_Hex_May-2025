create database library;
use library;

create table book(
id int primary key auto_increment,
title varchar(255),
price double,
author varchar(255),
publication_house varchar(255),
category enum("Fiction","War","Comedy","Sports"),
book_count int,
status enum("In_stock","Out_of_stock")
);

Insert into book(id, title, price, author, publication_house, category, book_count, status)
values(1,'The War Inside', 299.50, 'John Smith', 'Mcgraw Hill', 'War', 10, 'In_stock'),
(2,'Comedy Nights', 150.00, 'Jane Doe', 'DreamFolks', 'Comedy', 5, 'In_stock'),
(3,'Fiction Realm', 500.00, 'Alex Roy', 'Warner Bros', 'Fiction', 20, 'Out_of_stock'),
(4,'Sports Mania', 175.75, 'Clark Kent', 'Mcgraw Hill', 'Sports', 7, 'In_stock'),
(5,'History of War', 320.00, 'Bruce Wayne', 'DreamFolks', 'War', 3, 'Out_of_stock'),
(6,'Fiction Land', 275.00, 'Diana Prince', 'Warner Bros', 'Fiction', 15, 'In_stock');

-- Fetch all books that are 'In_stock' and price is less than given value

delimiter $$
create procedure fetch_books(In eprice double)
begin
select * from book where status='In_stock' and price <= eprice;
end;

drop procedure fetch_books;
call fetch_books(200.00);

-- Delete books that are from the given publication_house.

delimiter $$
create procedure delete_books(In epublication_house varchar(255))
begin
  declare num_rows int default 0;
  declare i int default 0;
  declare p_id int default 0;
  
  Select count(id) into num_rows from book
  where publication_house = epublication_house;
  
  while i < num_rows do
    Select id into p_id
    from Book
    where publication_house = epublication_house
    limit i,1;

    Delete from book
    where id = p_id;

    set i = i + 1;
  end while;
end;

drop procedure delete_books;
Call delete_books("DreamFolks");

Select * from book;

--  Update the price of the books by given percent based on given category

delimiter $$
create procedure update_price_of_books(In percent int, In ecategory enum("Fiction","War","Comedy","Sports"))
begin

declare num_rows int default 0;
declare i int default 0;
declare p_id int;

select count(id) into num_rows from Book
where category = ecategory;

while i < num_rows do
        select id into p_id from Book
        where category = ecategory
        limit i, 1;

        update book
        set price = price + (price * (percent / 100))
        where id = p_id;

        set i = i + 1;
    end while;

end;

call update_price_of_books(5, "Fiction")
Select * from book;


