import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function PokemonsDetails(props) {
    //the props: { name, pic, types, weight, height, hp, speed, attack, specialAttack, defense, specialDefense }

    //1.set the ID for fetch Use:
    const [name, setName] = useState("");
    const handleClick = (name) => {
        setName(name)
        console.log("name:", name)
    };

    //2.fetch the data based on the ID:
    const [modalData, setModalData] = useState({});
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(res => res.json())
            .then(pokemon => {
                setModalData({
                    name: pokemon?.name,
                    pic: pokemon?.sprites?.other?.dream_world?.front_default,
                    types: pokemon?.types,
                    weight: pokemon?.weight,
                    height: pokemon?.height,
                    speed: pokemon?.stats[5]?.base_stat,
                    hp: pokemon?.stats[0]?.base_stat,
                    attack: pokemon?.stats[1]?.base_stat,
                    specialAttack: pokemon?.stats[3]?.base_stat,
                    defense: pokemon?.stats[2]?.base_stat,
                    specialDefense: pokemon?.stats[4]?.base_stat,
                });
            })
        // .catch(err => {
        //     setError(err.message)
        // });
    }, [name])


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
    const types = props.types.map((type) => type.type.name);
    //case1: pokemon with 1 type:
    const typeStyle0 = styles[types[0]];
    const cardStyle0 = { ...styles.card, ...typeStyle0 };
    //case1: pokemon with 2 types:
    const typeStyle1 = types.length === 1 ? styles[types[0]] : styles[types[1]];
    const cardStyle1 = { ...styles.card, ...typeStyle1 };

    return (
        <div class="col-6 col-lg-4">
            <section id="topics">
                <div className="container-md">
                    <div className="text-center">

                        <div className="card" style={cardStyle1}>
                            <img style={{ ...cardStyle0, height: "250px", width: "100%" }} src={props.pic} class="card-img-top" alt="pokemonImg" />
                            <div class="card-body">
                                <h2>{props.name}</h2>
                                <div className="justify-content-center d-flex">
                                    {props.types.map((pokemon) =>
                                        <div className="lead text-light mx-3 p-2 rounded border" key={pokemon.type.name}> {pokemon.type.name}</div>
                                    )}
                                </div>

                                {/* PokemonGetOneFromAll */}
                                {/* <!-- Button trigger modal --> */}
                                <button type="button"
                                    className="my-2 btn btn-dark"
                                    data-bs-toggle="modal"

                                    // 1.set the "data-bs-target" and the onClick to get the ID.
                                    // the data-bs-target should be well setted to change the data of the modal everytime you click.
                                    data-bs-target={`#staticBackdrop-${props.name}`}
                                    onClick={() => handleClick(props.name)}
                                >
                                    show more...
                                </button>

                            </div>
                        </div>

                    </div>

                    <div className="row mb-5 g-5 justify-content-around align-items-center">
                        {/* <!-- Modal --> */}
                        {/* 2.the id should be setted corresponding the "data-bs-target" of the trigger button,
                         otherwise the data stays static.  */}
                        <div className="modal fade" id={`staticBackdrop-${props.name}`} aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="bg-dark modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                            <div className="text-center row">
                                                <h1 className='col-6 text-light'>{modalData.name}</h1>
                                                <div className="col-6 d-flex justify-content-end">
                                                    {modalData.types && modalData.types.map((pokemon) =>
                                                        <div className="lead text-light mx-3 p-2 rounded border" key={pokemon.type.name}> {pokemon.type.name}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </h1>
                                        <button type="button" className="btn-close btn-outline-light" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="text-center">
                                            <img src={modalData.pic} alt="pokemonImg" />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div class="col-5">
                                            <ul class="list-group">
                                                <li class="list-group-item"><p>weight: {modalData.weight}</p></li>
                                                <li class="list-group-item"><p>height: {modalData.height}</p></li>
                                                <li class="list-group-item">speed: {modalData.speed}</li>
                                                <li class="list-group-item">hp: {modalData.hp}</li>
                                            </ul>
                                        </div>
                                        <div class="col-5">
                                            <ul class="list-group">
                                                <li class="list-group-item"> <p>attack: {modalData.attack}</p></li>
                                                <li class="list-group-item"><p>special attack: {modalData.specialAttack}</p></li>
                                                <li class="list-group-item">defense: {modalData.defense}</li>
                                                <li class="list-group-item">special defense: {modalData.specialDefense}</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary btn-outline-light" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div >
            </section >
        </div >
    )
}
