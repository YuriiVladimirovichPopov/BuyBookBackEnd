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
