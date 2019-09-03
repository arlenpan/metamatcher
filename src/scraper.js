const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
const consts = require('./consts.js');

const fetchDeck = url => {
    console.log('fetching', url);
    return rp(url)
        .then(html => {
            const name = $('h2.deck-view-title', html)
                .contents()
                .filter(function() { return this.nodeType === 3; })
                .text()
                .trim();

            const price = parseFloat($('div.paper > div.price-box-price', html).text().replace(/,/g, ''));
            console.log(name, price);

            const deckListSelector = '#tab-paper';
            const deckListFunc = selector => {
                let items = [];
                $(selector, html).map((i, d) => items.push(d.children[0].data));
                return items;
            };
            const deckListQtys = deckListFunc(`${deckListSelector} td.deck-col-qty`);
            const deckListNames = deckListFunc(`${deckListSelector} td.deck-col-card > a`);
            const deckListPrices = deckListFunc(`${deckListSelector} td.deck-col-price`);
            
            const list = {};
            if (deckListQtys.length === deckListNames.length && deckListNames.length === deckListPrices.length) {
                deckListNames.map((name, i) => {
                    const qty = parseInt(deckListQtys[i].trim());
                    const price = parseFloat(deckListPrices[i].trim().replace(/,/g, ''));
                    const pricePer = price/qty;
                    list[name] = { qty, price, pricePer };
                });
            } else {
                console.log(`Deck list mismatch on ${url}`);
            }

            return {
                name,
                price,
                list,
                url
            };
        })
        .catch(err => {
            console.log(`Fetch error on ${url}`, err);
            return err;
        });
};

const fetchDecksToFile = (inputURL, outputFile) => {;
    console.log(`Fetching decks from ${inputURL}`);
    rp(inputURL)
        .then(html => {
            console.log('Fetch success!');
    
            const linkSelector = 'span.deck-price-paper > a';
            const links = $(linkSelector, html);
    
            // list all urls of decks
            const urls = [];
            Object.keys(links).forEach(key => {
                if (links[key].attribs && links[key].attribs.href)
                    urls.push(links[key].attribs.href);
            });
            console.log(`${urls.length} decks found!`);
    
            // // map of promises with all data
            const urlsPromises = urls.map(u => fetchDeck(consts.URL_BASE + u));
            Promise.all(urlsPromises).then(res => {
                // all decks in res
                console.log('All decks fetched, writing to file...');
                fs.writeFile(outputFile, JSON.stringify(res), err => console.log(err));
            });
        })
        .catch(err => {
            console.log('Fetch error', err);
        });
};

fetchDecksToFile(consts.URL_MODERN, './src/data/modern.json');