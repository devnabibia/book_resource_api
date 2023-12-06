const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// In-memory data store for demonstration purposes
let books = [
  { id: 1, title: 'Book 1' },
  { id: 2, title: 'Book 2' },
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET a specific book by ID
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// POST a new book
app.post('/books', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newBook = {
    id: books.length + 1,
    title,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT (update) a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const updatedBookIndex = books.findIndex((b) => b.id === bookId);

  if (updatedBookIndex !== -1) {
    books[updatedBookIndex].title = title;
    res.json(books[updatedBookIndex]);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const initialLength = books.length;

  books = books.filter((b) => b.id !== bookId);

  if (books.length === initialLength) {
    res.status(404).json({ error: 'Book not found' });
  } else {
    res.json({ message: 'Book deleted successfully' });
  }
});

// Handle requests to the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
