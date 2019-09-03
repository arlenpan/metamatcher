import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currDeck: null
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currDeck !== null && this.state.currDeck === prevState.currDeck) {
            this.setState({ currDeck: null });
        }
    }

    showDeck = deck => {
        this.setState({ currDeck: deck });
        console.log(deck);
    }

    columns = () => [
        {
            Header: 'Deck',
            columns: [{
                Header: 'Name',
                accessor: 'deck.name',
                Cell: row => <span onClick={() => this.showDeck(row.original)}>{row.value}</span>
            }]
        }, {
            Header: 'Costs',
            columns: [
                {
                    Header: 'To Build',
                    accessor: 'priceDiff',
                    Cell: row => <span>${row.value.toFixed(2)}</span>
                },
                {
                    Header: 'Total',
                    accessor: 'deck.price',
                    Cell: row => <span>${row.value.toFixed(2)}</span>
                },
                {
                    Header: 'You Saved',
                    accessor: 'saved',
                    Cell: row => <span>${row.value.toFixed(2)}</span>
                }
            ]
        }, {
            Header: 'Stats',
            columns: [
                {
                    Header: 'Cards Missing',
                    accessor: 'totalMissing'
                }
            ]
        }
    ];

    render() {
        const { currDeck } = this.state;
        const { decks } = this.props;
        return (
            <div className="container-center">
                {currDeck && <div className="container-header">
                    <h4>{currDeck.deck.name}</h4>
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
                </div>}
                {decks && <ReactTable 
                    data={decks} 
                    columns={this.columns()}
                    // showPagination={false}
                    defaultPageSize={50}
                    minRows={50}
                    style={{
                        height: '80vh'
                    }}
                />}
            </div>
        );
    }
}