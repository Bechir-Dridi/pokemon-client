import React, { useState, useEffect } from 'react';
//import components:
import Paginations from './Paginations';


export default function PokemonsFiltered({ loadedItems }) {

    //------------- Filter --------------
    //Dropdown menu & Filter_State
    const [type, goType] = useState("all");
    const goTypeFct = (e) => {
        goType(e.target.value);
    }

    const [filtered, goFilter] = useState([]);
    //goFilterFct
    const goFilterFct = () => {
        switch (type) {
            case "fire": goFilter(loadedItems.filter((element) => (element.types[0].type.name || element.types[1].type.name) === "fire")); break;
            case "water": goFilter(loadedItems.filter((element) => (element.types[0].type.name || element.types[1].type.name) === "water")); break;
            case "grass": goFilter(loadedItems.filter((element) => (element.types[0].type.name || element.types[1].type.name) === "grass")); break;
            case "normal": goFilter(loadedItems.filter((element) => (element.types[0].type.name || element.types[1].type.name) === "normal")); break;
            case "flying": goFilter(loadedItems.filter((element) => (element.types[0].type.name || element.types[1].type.name) === "flying")); break;
            case "bug": goFilter(loadedItems.filter((element) => (element.types[0].type.name || element.types[1].type.name) === "bug")); break;
            case "poison": goFilter(loadedItems.filter((element) => (element.types[0].type.name || element.types[1].type.name) === "poison")); break;
            case "electric": goFilter(loadedItems.filter((element) => (element.types[0].type.name || element.types[1].type.name) === "electric")); break;
            case "ground": goFilter(loadedItems.filter((element) => (element.types[0].type.name || element.types[1].type.name) === "ground")); break;
            case "fighting": goFilter(loadedItems.filter((element) => (element.types[0].type.name || element.types[1].type.name) === "fighting")); break;
            case "rock": goFilter(loadedItems.filter((element) => (element.types[0].type.name || element.types[1].type.name) === "rock")); break;
            case "steel": goFilter(loadedItems.filter((element) => (element.types[0].type.name || element.types[1].type.name) === "steel")); break;
            case "ice": goFilter(loadedItems.filter((element) => (element.types[0].type.name || element.types[1].type.name) === "ice")); break;
            case "ghost": goFilter(loadedItems.filter((element) => (element.types[0].type.name || element.types[1].type.name) === "ghost")); break;
            case "dragon": goFilter(loadedItems.filter((element) => (element.types[0].type.name || element.types[1].type.name) === "dragon")); break;
            default: goFilter(loadedItems); break;
        }
    }
    //useEffect for Filter
    useEffect(() => { goFilterFct(); }, [loadedItems, type]);
    //goFilterFct(), everytime loadedItems or type updates.





    return (
        <div>
            <section id="topics">
                <div class="row my-1 g-5 justify-content-around align-items-center">
                    <div class="col-6 col-lg-4">
                        <div class="text-center">
                            <select class="form-select form-select-lg" onChange={goTypeFct} aria-label=".form-select-lg example">
                                <option value="all">all</option>
                                <option value="fire">fire</option>
                                <option value="water">water</option>
                                <option value="normal">normal</option>
                                <option value="flying">flying</option>
                                <option value="bug">bug</option>
                                <option value="poison">poison</option>
                                <option value="electric">electric</option>
                                <option value="ground">ground</option>
                                <option value="fighting">fighting</option>
                                <option value="rock">rock</option>
                                <option value="steel">steel</option>
                                <option value="ice">ice</option>
                                <option value="ghost">ghost</option>
                                <option value="dragon">dragon</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>


            <Paginations filtered={filtered} />
        </div>

    );
}

