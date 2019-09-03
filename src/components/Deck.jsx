import React from 'react';

const Deck = ({ currDeck }) => {
    return (
        <div className="container-header">
            <h4>{currDeck.deck.name} <a href={currDeck.deck.url} target="_blank" rel="noopener noreferrer">(MTGGoldfish)</a></h4>
            <ul>
                {Object.keys(currDeck.deck.list).map(card => {
                    const missingCount = currDeck.missingCards[card] || 0;
                    const qty = currDeck.deck.list[card].qty;
                    const allMissing = missingCount === qty;
                    const someMissing = missingCount && missingCount < qty;
                    return (
                        <li 
                            className={allMissing ? 'text-allMissing' : (someMissing ? 'text-someMissing' : '')}
                            key={card}
                        >
                            {qty - missingCount}/{qty} {card}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Deck;