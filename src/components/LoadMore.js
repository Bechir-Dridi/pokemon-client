import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import PokemonsFiltered from './PokemonsFiltered';



export default function LoadMore({ getPokemons, mappedPokemonsData }) {

    // ------------- Load More --------------
    const [loadedItems, setLoadedItems] = useState([])

    const loadMore = () => {
        // loadedItems.push(...mappedPokemonsData)
        setLoadedItems([...loadedItems, ...mappedPokemonsData]);
    }

    useEffect(() => {
        loadMore()
    }, [mappedPokemonsData])


    return (
        <div>
            <PokemonsFiltered loadedItems={loadedItems} />

            {
                // pokemonsData.length > loadedItems.length &&
                <div className="text-center">
                    < button type='button' className="btn btn-light fw-bold" onClick={() => getPokemons()}> More Pokemons</button>
                </div>
            }

        </div>
    );
}

