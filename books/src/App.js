import {useState} from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
    const [books, setBooks] = useState([]);

    const editBookById = (id, title) => {
        const updatedBooks = books.map((book) => {
            return book.id === id ? {...book, title} : book;
        });

        setBooks(updatedBooks);
    };

    const deleteBookById = (id) => {
        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });

        setBooks(updatedBooks);
    };

    const createBook = (title) => {
        // BAD CODE!
        /* books.push({id:123, title:title})
          setBooks(books) */
        const updatedBooks = [
            ...books,
            {id: Math.round(Math.random() * 999999), title}
        ];

        setBooks(updatedBooks);
    };

    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList onEdit={editBookById}
                      books={books}
                      onDelete={deleteBookById}/>
            <BookCreate onCreate={createBook}/>
        </div>
    );
}

export default App;