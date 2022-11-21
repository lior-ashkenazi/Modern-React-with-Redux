import './App.css';
import {useState} from 'react';
import AnimalShow from './AnimalShow';

function getRandomAnimal() {
    const animals = ['bird', 'cat', 'cow', 'dog', 'gator', 'horse'];

    return animals[Math.floor(Math.random() * animals.length)];
}

function App() {
    const [animals, setAnimals] = useState([]);

    const handleClick = () => {
        // we do not want to modify a piece of state
        // therefore we won't write animals.push(getRandomAnimal())
        setAnimals([...animals, getRandomAnimal()]);
    };

    const renderedAnimals = animals.map((animal, index) => {
        return <AnimalShow type={animal} key={index}/>;
    });

    return (
        <div className="app">
            <button onClick={handleClick}>
                Add Animal
            </button>
            <div className="animal-list">{renderedAnimals}</div>
        </div>);
}

export default App;