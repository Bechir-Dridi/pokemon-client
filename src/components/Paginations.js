import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Pagination from 'react-bootstrap/Pagination';

import PokemonsDetails from './PokemonsGetAllDetails';


export default function Paginations({ filtered }) {
    //------------- Pagination --------------
    //the engine:
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 20
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const totalPages = Math.ceil(filtered.length / itemsPerPage)

    //display Items:
    const displayPokemons = () => {
        return filtered
            .slice(startIndex, endIndex)
            .map((pokemon) =>
            (
                <PokemonsDetails

                    key={pokemon.id}
                    name={pokemon.name}
                    pic={pokemon.sprites.other.dream_world.front_default}
                    types={pokemon.types && pokemon.types}
                    weight={pokemon.weight}
                    height={pokemon.height}
                    speed={pokemon.stats[5].base_stat}
                    hp={pokemon.stats[0].base_stat}

                    attack={pokemon.stats[1].base_stat}
                    specialAttack={pokemon.stats[3].base_stat}

                    defense={pokemon.stats[2].base_stat}
                    specialDefense={pokemon.stats[4].base_stat}

                />
            )
            )
    }

    //display links:
    const renderPaginationLinks = () => {
        let links = [];
        for (let i = 1; i <= totalPages; i++) {
            links.push(
                <Pagination.Item
                    class={i === currentPage ? 'btn btn-light btn-outline-secondary' : 'btn btn-dark btn-outline-light'}
                    key={i}
                    onClick={() => setCurrentPage(i)}>
                    {i}
                </Pagination.Item>
            );
        }
        return links;
    };

    return (
        <div>
            {/* Pagination items: */}
            <ul className='row g-5 justify-content-around align-items-center'>
                {displayPokemons()}
            </ul>

            {/* Pagination Links: */}
            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.Prev class={currentPage > 1 ? ' btn btn-light btn-outline-secondary' : 'd-none'}
                        onClick={() => setCurrentPage(currentPage - 1)} />

                    {renderPaginationLinks()}

                    <Pagination.Next class={currentPage < totalPages ? ' btn btn-light btn-outline-secondary' : 'd-none'}

                        disabled={currentPage > totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
                </Pagination>
            </div>
        </div>
    );
}

