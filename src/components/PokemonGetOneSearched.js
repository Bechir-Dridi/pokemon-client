import React, { useEffect, useState } from 'react'
import Axios from "axios"
import { Link, useParams } from 'react-router-dom';



export default function PokemonGetOneSearched() {

    const [pokemonSpecs, setPokemonSpecs] = useState({
        name: "",
        pic: "",
        types: "",
        weight: "",
        height: "",
        speed: "",
        hp: "",
        attack: "",
        specialAttack: "",
        defense: "",
        specialDefense: "",
    })

    const { pokemon } = useParams();

    const searchMyPokemon = () => {
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then((res) => {

                setPokemonSpecs({
                    name: res.data?.name,
                    pic: res.data?.sprites?.other?.dream_world?.front_default,
                    types: res.data?.types,
                    weight: res.data?.weight,
                    height: res.data?.height,
                    speed: res.data?.stats[5]?.base_stat,
                    hp: res.data?.stats[0]?.base_stat,
                    attack: res.data?.stats[1]?.base_stat,
                    specialAttack: res.data?.stats[3]?.base_stat,
                    defense: res.data?.stats[2]?.base_stat,
                    specialDefense: res.data?.stats[4]?.base_stat,
                })
            })
    }

    useEffect(() => { searchMyPokemon() }, [pokemon])



    // Define your styles in a separate object
    const styles = {
        card: {
            width: "18rem",
            backgroundColor: "#FFF"
        },
        fire: {
            backgroundColor: "#F08030"
        },
        water: {
            backgroundColor: "#6890F0"
        },
        grass: {
            backgroundColor: "#78C850"
        },
        normal: {
            backgroundColor: "#C18E48"
        },
        flying: {
            backgroundColor: "#A890F0"
        },
        bug: {
            backgroundColor: "#A8B820"
        },
        poison: {
            backgroundColor: "#A040A0"
        },
        electric: {
            backgroundColor: "#F8D030"
        },
        ground: {
            backgroundColor: "#E0C068"
        },
        fairy: {
            backgroundColor: "#EE99AC"
        },
        fighting: {
            backgroundColor: "#C03028"
        },
        psychic: {
            backgroundColor: "#F85888"
        },
        rock: {
            backgroundColor: "#B8A038"
        },
        steel: {
            backgroundColor: "#B8B8D0"
        },
        ice: {
            backgroundColor: "#98D8D8"
        },
        ghost: {
            backgroundColor: "#705898"
        },
        dragon: {
            backgroundColor: "#7038F8"
        }
    };

    // Determine which style to apply based on the Pokemon's type
    const types = pokemonSpecs.types && pokemonSpecs.types.map((type) => type.type.name);
    //case1: pokemon with 1 type:
    const typeStyle0 = styles[types[0]];
    const cardStyle0 = { ...styles.card, ...typeStyle0 };
    //case1: pokemon with 2 types:
    const typeStyle1 = types.length === 1 ? styles[types[0]] : styles[types[1]];
    const cardStyle1 = { ...styles.card, ...typeStyle1 };



    //suggestions:


    return (
        <div className='bg-dark'>
            <section className='my-2 bg-dark'>
                <div class="container-md">
                    <div className="justify-content-center d-flex">
                        <div class="text-center">
                            <div className="card" style={cardStyle1}>
                                <img style={cardStyle0} src={pokemonSpecs.pic} class="card-img-top" alt="pokemonImg" />
                                <div class="card-body">
                                    <h3 class="card-title">{pokemonSpecs.name}</h3>
                                    <div className="justify-content-center d-flex">
                                        {pokemonSpecs.types && pokemonSpecs.types.map((pokemon) =>
                                            <div className="lead text-light mx-3 p-2 rounded border" key={pokemon.type.name}> {pokemon.type.name}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row my-2 g-5 justify-content-around align-items-center">
                        <div className="row justify-content-center">
                            <div class="col-5">
                                <ul class="list-group">
                                    <li class="list-group-item"><p>weight: {pokemonSpecs.weight}</p></li>
                                    <li class="list-group-item"><p>height: {pokemonSpecs.height}</p></li>
                                    <li class="list-group-item">speed: {pokemonSpecs.speed}</li>
                                    <li class="list-group-item">hp: {pokemonSpecs.hp}</li>
                                </ul>
                            </div>
                            <div class="col-5">
                                <ul class="list-group">
                                    <li class="list-group-item"> <p>attack: {pokemonSpecs.attack}</p></li>
                                    <li class="list-group-item"><p>special attack: {pokemonSpecs.specialAttack}</p></li>
                                    <li class="list-group-item">defense: {pokemonSpecs.defense}</li>
                                    <li class="list-group-item">special defense: {pokemonSpecs.specialDefense}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center">
                <Link to='/'> <button>back to all pokemons</button> </Link>
            </div>
        </div >
    )
}
