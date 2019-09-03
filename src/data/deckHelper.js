const CARD_LAND_BASIC = ['Mountain', 'Forest', 'Swamp', 'Island', 'Plains'];

/* ========================================================================== */

const parseList = data => {
    const ownedCards = {};
    data.split('\n')
    .filter(Boolean)
    .map(l => {
        const name = l.substr(l.indexOf(' ')+1).trim();
        const count = parseInt(l.substr(0, l.indexOf(' ')));
        if (ownedCards[name]) {
            ownedCards[name] += count;
        } else {
            ownedCards[name] = count;
        }
    });
    return ownedCards;
}

const diffPrice = (ownedCards, deck) => {
    let diff = deck.price;
    Object.keys(deck.list).map(name => {
        if (ownedCards[name]) {
            const qtyOwned = Math.min(deck.list[name].qty, ownedCards[name]);
            diff -= qtyOwned * deck.list[name].pricePer;
        }
    });
    return diff;
};

const diffCards = (ownedCards, deck) => {
    let missingCards = {};
    Object.keys(deck.list).map(name => {
        // ignore basics
        if (CARD_LAND_BASIC.includes(name)) return;
        if (ownedCards[name]) {
            if (ownedCards[name] < deck.list[name].qty) {
                missingCards[name] = deck.list[name].qty - ownedCards[name];
            }
        } else {
            missingCards[name] = deck.list[name].qty;
        }
    });
    return missingCards;
};

/* ========================================================================== */
// MAIN

export const calcDiff = (textList, metaDecks) => {
    const ownedCards = parseList(textList);
    return metaDecks.map(deck => {
        const priceDiff = diffPrice(ownedCards, deck);
        const missingCards = diffCards(ownedCards, deck);
        return {
            deck,
            priceDiff,
            saved: deck.price - priceDiff,
            missingCards,
            totalMissing: Object.values(missingCards).reduce((a,b) => a + b, 0)
        };
    });
}