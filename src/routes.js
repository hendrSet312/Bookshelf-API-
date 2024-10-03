const hapi = require('@hapi/hapi');
const {addBook, getAllBooks, getBooksById, UpdateBookById, deleteBookById} = require('./handler.js');

const routes = [{
    method : 'POST',
    path : '/books',
    handler : addBook
},
{
    method : 'GET',
    path : '/books',
    handler : getAllBooks
},
{
    method : 'GET',
    path : '/books/{bookId}',
    handler : getBooksById
},
{
    method : 'PUT',
    path : '/books/{bookId}',
    handler : UpdateBookById
},
{
    method : 'DELETE',
    path : '/books/{bookId}',
    handler : deleteBookById
}
];

module.exports = routes;

