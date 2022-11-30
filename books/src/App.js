import {useEffect, useContext} from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import BooksContext from './context/books';

function App() {
    const {fetchBooks} = useContext(BooksContext);

    useEffect(() => {
        fetchBooks();
    }, []);

    // DON'T DO THIS:
    // (INFINITE LOOP OF RE-RENDERING THE APP COMPONENT)
    // fetchBooks();

    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList/>
            <BookCreate/>
        </div>
    );
}

export default App;