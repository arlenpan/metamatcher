import React, { useState } from 'react';
import { STORAGE__OWNED, STORAGE__IGNORED } from '../consts.js';
import modern from '../data/modern.json';
import { calcDiff } from '../scripts/deckHelper';
import { setStorageVal, getStorageVal } from '../scripts/localStorage';

const Sidebar = ({ setDecks }) => {
    const [owned, setOwned] = useState(getStorageVal(STORAGE__OWNED || ''));
    const [ignored, setIgnored] = useState(getStorageVal(STORAGE__IGNORED) || '');

    const onCalculate = () => {
        setStorageVal(STORAGE__OWNED, owned);
        setStorageVal(STORAGE__IGNORED, ignored);
        const allCards = owned + '\n' + ignored;
        const decks = calcDiff(allCards, modern);
        if (setDecks) setDecks(decks);
    }

    return (
        <div className="container-side">
            <button onClick={onCalculate}>Calculate</button>

            <h4>Your Cards</h4>
            <textarea
                placeholder="4 Lightning Bolt&#10;4 Birds of Paradise&#10;2 Snapcaster Mage" 
                value={owned}
                onChange={e => setOwned(e.target.value)}
            />

            <h4>Ignored Cards</h4>
            <span className="text-subtext">Cards here will be ignored in calculations (used when you have a budget replacement or not buying these cards)</span>
            <textarea
                className="small" 
                placeholder="4 Black Lotus&#10;2 Karakas"
                value={ignored}
                onChange={e => setIgnored(e.target.value)}
            />
        </div>
    );
}

export default Sidebar;