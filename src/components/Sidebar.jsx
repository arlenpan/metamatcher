import React from 'react';

export default class Sidebar extends React.Component {
    render() {
        const { ownedCards, ignoredCards, onOwnedChange, onIgnoredChange, calculateDecks } = this.props;

        return (
            <div className="container-side">
                <button onClick={calculateDecks}>Calculate</button>
                <h4>Your Cards</h4>
                <textarea 
                    placeholder="4 Lightning Bolt&#10;4 Birds of Paradise&#10;2 Snapcaster Mage" 
                    value={ownedCards}
                    onChange={onOwnedChange}
                />

                <h4>Ignored Cards</h4>
                <span className="text-subtext">Cards here will be ignored in calculations (used when you have a budget replacement or not buying these cards)</span>
                <textarea 
                    className="small" 
                    placeholder="4 Black Lotus&#10;2 Karakas"
                    value={ignoredCards}
                    onChange={onIgnoredChange}
                />
            </div>
        );
    }
}