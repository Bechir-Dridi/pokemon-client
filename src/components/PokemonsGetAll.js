import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import LoadMore from './LoadMore';


export default function PokemonsGetAll({ pokemonsData, getPokemons }) {

    // Collect data one by one through URL:
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [mappedPokemonsData, setMappedPokemonsData] = useState([])

    useEffect(() => {

        //guard clause
        if (pokemonsData.length === 0) return;

        setIsLoading(true)
        Promise.all(pokemonsData.map(pokemon => {
            return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                .then(res => res.json())
        })).then(data => {
            setMappedPokemonsData(data)
        }).catch(err => {
            setError(err.message)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [pokemonsData])


    return (
        <div className='poke-container'>
            <div className='bg-dark'>
                {error && <span className='text-light display-6'>{error}</span>}

                {isLoading && <span className='text-light display-6'>Loading...</span>}

                <LoadMore getPokemons={getPokemons} pokemonsData={pokemonsData} mappedPokemonsData={mappedPokemonsData} />
            </div>
        </div>
    )
}
