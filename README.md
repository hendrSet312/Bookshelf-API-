
# Bookshelf API

This project is developed as part of the Dicoding Backend Developer course. The API is built using the **Hapi** framework and **Node.js**, and is written in JavaScript. The main focus of the API is to perform essential CRUD operations on a collection of books, with full validation to ensure proper request formats and to handle errors gracefully.

## Features

The Bookshelf API includes the following key features:

### 1. **Create a Book**
Allows users to add a new book to the bookshelf. The request body should contain book details such as:
- `name`: The title of the book.
- `year`: The year the book was published.
- `author`: The name of the book’s author.
- `publisher`: The name of the publisher.
- `summary`: A brief summary of the book.

Upon successful creation, the API will:
- Automatically generate a unique `id` for the book.
- Record the `insertedAt` and `updatedAt` timestamps.

**Endpoint:**  
`POST /books`

### 2. **Retrieve Books**
Users can retrieve information about all books or a specific book using a unique `id`. Additional filter options can be used to refine the results by:
- `name`: Filter books based on partial or full title match.
- `reading`: Filter based on reading progress.
- `finished`: Filter based on finished progress.

The API supports the following retrieval methods:
- **Retrieve all books**: Lists all available books.
- **Retrieve by book ID**: Retrieves detailed information for a specific book.

**Endpoints:**  
- `GET /books`  
- `GET /books/{id}`

### 3. **Update a Book**
Allows users to update the details of a specific book using its unique `id`. The handler performs validation to ensure the requested book exists. If the `id` is valid, the update is performed and a success response is returned. If the `id` is invalid, an error message is provided.

**Endpoint:**  
`PUT /books/{id}`

### 4. **Delete a Book**
Users can delete a book by providing its unique `id`. If the book exists, it is removed from the collection, and a success message is returned. If the `id` is invalid, the handler will return an error message.

**Endpoint:**  
`DELETE /books/{id}`

## Request Validation
Each request to the API undergoes validation to ensure:
- The required fields are present and in the correct format.
- Error handling is performed for invalid or incomplete requests.
- Responses are structured to provide clear success or failure messages.
