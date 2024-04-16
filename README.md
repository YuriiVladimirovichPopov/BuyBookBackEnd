# BuyBookBackEnd
RestAPI buy book project backEnd for UES
- Созданы 5 сущностей:
- авторы
- книги
- заказы
- пользователи
- адрес пользователя
В каждой сущности есть:
- модель
- ДТО
- модуль
- контроллер
- сервис
- Организована валидация, фильтрация ошибок(в каком виде они появляются), настроен валидационный пайп, добавлена пагинация(постраничный вывод).

- Методы сущности АВТОР: создание, получение всех авторов(постраничный вывод), получение автора по Id, удаление по Id.
- Методы сущности КНИГА: создание, получение всех книг(постраничный вывод), получение книги по Id, поиск по названию, цене, автору, заказу, обновление информации(цена), удаление по Id.
- Методы сущности ЗАКАЗ: создание, получение всех заказов(постраничный вывод), получение заказа по Id, обновление заказа, поиск в заказе книги по названию, поиск заказа по пользователю, удаление по Id.
- Методы сущности ПОЛЬЗОВАТЕЛЬ: создание, получение всех пользователей(постраничный вывод), получение пользователя по Id, блокировка пользователя, удаление по Id.
- Методы сущности АДРЕС ПОЛЬЗОВАТЕЛЯ: создание, получение адреса по Id, обновление адреса.

- Проект разработан с использованием фреймворка Nest.js, 
- В качестве базы данных используется PostgreSQL, 
- Для взаимодействия с базой данных применяется ORM-библиотека Sequelize,
- Проект задокументирован с помощью инструмента Swagger


- Five entities have been created:

- Authors
- Books
- Orders
- Users
- User Addresses

- Each entity includes:
- Model
- DTO
- Module
- Controller
- Service

- Validation has been organized, error filtering (in what form they appear) has been configured, a validation pipe has been set up, and pagination (page-by-page output) has been added.

- Methods for the AUTHOR entity: creation, retrieval of all authors (page-by-page output), retrieval of an author by Id, deletion by Id.
- Methods for the BOOK entity: creation, retrieval of all books (page-by-page output), retrieval of a book by Id, search by title, price, author, order, information update (price), deletion by Id.
- Methods for the ORDER entity: creation, retrieval of all orders (page-by-page output), retrieval of an order by Id, order update, searching for a book in the order by title, searching for an order by user, deletion by Id.
- Methods for the USER entity: creation, retrieval of all users (page-by-page output), retrieval of a user by Id, user blocking, deletion by Id.
- Methods for the USER ADDRESS entity: creation, retrieval of an address by Id, address update.

- The project is developed using the Nest.js framework,
- PostgreSQL is used as the database,
- The Sequelize ORM library is applied for interacting with the database,
- The project is documented using the Swagger tool.
