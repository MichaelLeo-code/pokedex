import { useParams } from 'react-router-dom';
import { Link, redirect } from 'react-router-dom';
import React, { useState, useEffect } from "react"
import { getPokemonColor } from "./utils/ColorConverter.js"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Pokemons(){
    const [pokemons, setPokemons] = useState(null)
    let { pageId } = useParams() 

    useEffect(() => {
        let ignore = false

        // const urls = fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
        //                 .then(response => response.json())
        //                 .then(pokemons => pokemons.results.map(p => p.url))

        // console.log(urls)

        fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
            .then(response => response.json())
            .then(pokemons => pokemons.results.map(p => p.url))
            .then(urls => {
                return Promise.all(urls.map(url => fetch(url).then(r => r.json())))
            })
            .then(p => {
                if (!ignore) setPokemons(p)
            })

        return () => (ignore = true)
    }, [])

    if(pokemons) console.log(pokemons)
    // if(pokemons) console.log(pokemons.map((p, i)=> (
    //     p
    // )))

    return(
      <>
        {
            pokemons && pokemons.map((p, i) => (
            <PokemonCard key={i} pokemon={p}/>
        ))}
        {/* <PokemonCard pokemon={pokemon}/> */}
        <PageButtons pageId={parseInt(pageId)}/>
      </>  
    )
}

function PokemonCard({ pokemon }){
    if(!pokemon){return null}
    return(
        <>
            <div className="shadow-sm m-3 rounded" style={{ backgroundColor: getPokemonColor(pokemon?.types?.[0]?.type?.name)}}>
                <img src={pokemon?.sprites?.front_default} />
            </div>
        </>
    )
}

function PageButtons({pageId}){
    return(
    <>
        <h1>{ pageId }</h1>
        <nav>
            {pageId > 1 && (
                <Link to={`../${pageId-1}`}>&lt;</Link>
            )}
            {pageId < 10 && (
                <Link to={`../${pageId+1}`}>&gt;</Link>
            )}
        </nav>
    </>
    )
}