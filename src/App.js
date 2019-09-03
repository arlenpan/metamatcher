import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

const App = () => {
    const [decks, setDecks] = useState(null);
    return (
        <div className="App">
            <div className="container-main">
                <Sidebar setDecks={d => setDecks(d)} />
                <Main decks={decks} />
            </div>
        </div>
    );
}

export default App;
