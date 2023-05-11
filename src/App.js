import React, { useState, useEffect } from 'react';
import { HashRouter as Brouter, Routes, Route } from "react-router-dom";
import './index.css';
//import components:
import PokemonsGetAll from './components/PokemonsGetAll';
import Header from './components/Header';
import PokemonGetOneSearched from './components/PokemonGetOneSearched';
import Wallpapers from './components/Wallpapers';



function App() {
  const [pokemonNames, setMyPokemonNames] = useState([])
  //const [pokemonNames, setSuggestionsList] = useState([]);
  //------------------ Pokemons ------------------
  // 1. Get all data:
  const [pokemonsData, setPokemonsData] = useState([])
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  //const url = "https://pokeapi.co/api/v2/pokemon"

  const getPokemons = () => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("data:", data)
        setPokemonsData(data.results)

        setUrl(data.next)

        const poke = data.results.map(pokemon => pokemon.name);
        //pokemonNames.push(...poke)
        setMyPokemonNames(prevPokemonNames => [...prevPokemonNames, ...poke]);
      })
  }
  useEffect(() => {
    getPokemons()
  }, [])

  // const poke = pokemonsData.map(pokemon => pokemon.name);
  // pokemonNames.push(...poke)
  console.log("pokemonNames:", pokemonNames)
  //------------------ Pokemon ------------------


  return (
    <div className="app-container bg-dark text-light">
      <Brouter>
        <Header pokemonNames={pokemonNames} />
        <Routes>
          <Route path='/' exact element={<PokemonsGetAll pokemonsData={pokemonsData} getPokemons={getPokemons} />} />
          <Route path='/:pokemon' element={<PokemonGetOneSearched />} />
          <Route path='/wallpapers' element={<Wallpapers />} />

        </Routes>
      </Brouter>
    </div >
  );
}

export default App;
