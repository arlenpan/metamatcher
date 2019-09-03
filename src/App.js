import React from 'react';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

import { STORAGE__OWNED, STORAGE__IGNORED } from './consts.js';
import { calcDiff } from './data/deckHelper.js';
import modern from './data/modern.json';

class App extends React.Component {
    constructor(props) {
        super(props);

        // check for existing values in local storage
        this.state = {
            ownedCards: this.getStorageVal(STORAGE__OWNED) || '',
            ignoredCards: this.getStorageVal(STORAGE__IGNORED) || '',
            decks: null
        }
    }

    calculateDecks = e => {
        const { ownedCards, ignoredCards } = this.state;
        e.preventDefault();
        this.setStorageVal(STORAGE__OWNED, ownedCards);
        this.setStorageVal(STORAGE__IGNORED, ignoredCards);
        const allCards = ownedCards + '\n' + ignoredCards;
        const decks = calcDiff(allCards, modern);
        console.error(decks);
        this.setState({ decks });
    }
    
    setStorageVal = (key, value) => {
        if (typeof(Storage) !== 'undefined') {
            localStorage.setItem(key, value);
        } else {
            console.error('No Web Storage support!');
        }
    }

    getStorageVal = key => {
        if (typeof(Storage) !== 'undefined') {
            return localStorage.getItem(key);
        } else {
            console.error('No Web Storage support!');
        }
    }

    render() {
        return (
            <div className="App">
                <div className="container-main">
                    <Sidebar 
                        ownedCards={this.state.ownedCards}
                        ignoredCards={this.state.ignoredCards}
                        getStorageVal={this.getStorageVal}
                        onOwnedChange={e => this.setState({ ownedCards: e.target.value })}
                        onIgnoredChange={e => this.setState({ ignoredCards: e.target.value })}
                        calculateDecks={e => this.calculateDecks(e)}
                    />
                    <Main
                        decks={this.state.decks}
                    />
                </div>
            </div>
        );
    }
}

export default App;
