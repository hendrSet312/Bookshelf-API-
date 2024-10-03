const {nanoid} = require('nanoid');
const {books} = require('./books');

const addBook = (request, h) => {

    const {
        name, year, author, summary, publisher,
        pageCount, readPage, reading
    } = request.payload;

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    let response = undefined;

    if (readPage > pageCount){
        response = h.response({
            status : 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        
        response.code(400);
    } else if (name === undefined){
        response = h.response({
            status : 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        
        response.code(400);
    }else{

        const newBook = {
            id,name, year, author, summary, publisher,
            pageCount, readPage, finished, reading, insertedAt, updatedAt
        };
    
        books.push(newBook);
        
        response = h.response({
            status : 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                'bookId':id
            }
        });

        response.code(201);
    }

    return response;

};

const getAllBooks = (request, h) => {

    let {name, reading, finished} = request.query;
    let book_arr = books;

    if(name !== undefined){
        book_arr = book_arr.filter((book) => book.name.toLowerCase().includes( name.toLowerCase()));
    }

    if(reading !== undefined){
        book_arr = book_arr.filter((book) => book.reading == reading);
    }

    if(finished !== undefined){
        book_arr = book_arr.filter((book) => book.finished == finished);
    }

    book_arr = book_arr.map(book => ({
        'id': book.id,
        'name': book.name,
        'publisher': book.publisher
    }));

    const response = h.response({
        status: 'success',
        data: {
            'books': book_arr
        }
    });

    response.code(200);

    return response;
};

const getBooksById = (request, h) => {
    const {bookId} = request.params;
    const foundBook = books.filter((book) => book.id == bookId )[0];
    let response = undefined;

    if(foundBook === undefined){
        response = h.response({
            status:'fail',
            message:'Buku tidak ditemukan' 
        });

        response.code(404);
        return response;
    }else{
        response = h.response({
            status:'success',
            data:{
                'book':foundBook,
            }
        });

        response.code(200);
        return response;
    }
}

const UpdateBookById = (request, h) => {
    const {
        name, year, author, summary, publisher,
        pageCount,  readPage, reading
    } = request.payload;

    const {bookId} = request.params;
    const index_book = books.findIndex((book) => book.id === bookId);
    const updatedAt = new Date().toISOString();
    let response = undefined;

    if(name === undefined){
        response = h.response({
            status:'fail',
            message:'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }else if(pageCount < readPage){
        response = h.response({
            status:'fail',
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }else if(index_book === -1){
        response = h.response({
            status:'fail',
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        });
        response.code(404);
        return response;
    }else{
        books[index_book] = {
            ...books[index_book],
            name, year, author, summary, publisher,
            pageCount,  readPage, reading,updatedAt
        }

        response = h.response({
            status : 'success',
            message:'Buku berhasil diperbarui'
        });
        response.code(200);
        return response;
    }
}

const deleteBookById = (request, h) => {
    const {bookId} = request.params;
    const index_book =  books.findIndex((book) => book.id === bookId);
    let response = undefined;

    if(index_book === -1){
        response = h.response({
            status:'fail',
            message: "Buku gagal dihapus. Id tidak ditemukan"
        });
        response.code(404);
        return response;
    }

    books.splice(index_book,1);
    response = h.response({
        status:'success',
        message:'Buku berhasil dihapus',
        data: {
            'bookId': bookId
        }
    });
    response.code(200);
    return response;

}

module.exports = {addBook, getAllBooks, getBooksById, UpdateBookById,deleteBookById};