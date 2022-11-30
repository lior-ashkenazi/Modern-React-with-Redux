import {useState, useEffect} from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');

        setBooks(response.data);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    // DON'T DO THIS:
    // (INFINITE LOOP OF RE-RENDERING THE APP COMPONENT)
    // fetchBooks();

    const editBookById = async (id, newTitle) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle
        });

        const updatedBooks = books.map((book) => {
            return book.id === id ? {...book, ...response.data} : book;
        });

        setBooks(updatedBooks);
    };

    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`);
        
        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });

        setBooks(updatedBooks);
    };

    const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books',
                                          {title});

        console.log(response);

        // BAD CODE!
        /* books.push({id:123, title:title})
          setBooks(books) */

        const updatedBooks = [
            ...books,
            response.data
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