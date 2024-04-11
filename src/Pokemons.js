import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react"
import { getPokemonColor } from "./utils/ColorConverter.js"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Pokemons(){
    const [pokemons, setPokemons] = useState(null)
    let { pageId } = useParams()
    // const [offset, setOffset] = useState(pageId)

    useEffect(() => {
        let ignore = false

        // const urls = fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
        //                 .then(response => response.json())
        //                 .then(pokemons => pokemons.results.map(p => p.url))

        // console.log(urls)

        fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${pageId*30-30}`)
            .then(response => response.json())
            .then(pokemons => pokemons.results.map(p => p.url))
            .then(urls => {
                return Promise.all(urls.map(url => fetch(url)))
            })
            .then(r => {
                return Promise.all(r.map(response => response.json()))
            })
            .then(p => {
                if (!ignore) setPokemons(p)
            })

        return () => (ignore = true)
    }, [pageId])

    // if(pokemons) console.log(pokemons)
    // if(pokemons) console.log(pokemons.map((p, i)=> (
    //     p
    // )))

    return(
      <>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {
            pokemons && pokemons.map((p, i) => (
            <PokemonCard key={i} pokemon={p}/>
        ))}
        </div>
        {/* <PokemonCard pokemon={pokemon}/> */}
        <PageButtons pageId={parseInt(pageId)}/>
      </>  
    )
}

function PokemonCard({ pokemon }){
    const [isFullScreen, setIsFullScreen] = useState(false);

    function toggleFullScreen(){
        setIsFullScreen(!isFullScreen)
    }

    if(!pokemon){return null}
    return(
        <>
            <div className={`${isFullScreen ? 'overlay' : ''}`} onClick={isFullScreen ?  toggleFullScreen : null}></div>
            <div className={`m-3 rounded-3 my_card ${isFullScreen ? 'full-screen' : 'hover_effect'}`} style={{ backgroundColor: getPokemonColor(pokemon?.types?.[0]?.type?.name)}} onClick={isFullScreen ?  null : toggleFullScreen}>
                <div className="pokemon_name">{pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}</div>
                {isFullScreen && <AdditionalInfo pokemon={pokemon}></AdditionalInfo>}
                {isFullScreen ? <img style={{margin: '20px', maxWidth: '70px', maxHeight: '56px', objectFit: 'contain'}} src={pokemon?.sprites?.other?.showdown?.front_default} alt={"spriteGif"}/>
                : <img src={pokemon?.sprites?.front_default} alt={"sprite"}/>}
            </div>
        </>
    )
}

function AdditionalInfo({ pokemon }){
    return(
        <>
            <div className="pokemon-id">#{pokemon.id}</div>
            <div className="abilities">Abilities:
                {pokemon && pokemon.abilities.map((ability, i) => (
                    <div className="ability-item" key={i}>{ability.ability.name}</div>
                ))}
            </div>
            <div className="base-experience">Base experience: {pokemon.base_experience}</div>
        </>
    )
}

function PageButtons({pageId}){
    let navigate = useNavigate()
    
    return(
    <>
        <nav>
            {pageId > 1 && (
                <button className="chip" onClick={() => navigate(`/${pageId-1}`)}>
                    Back
                </button>
            )}
            <div className='pageId'>{ pageId }</div>
            {pageId < 10 && (
                <button className="chip" onClick={() => navigate(`/${pageId+1}`)}>
                    Forward
                </button>
            )}
        </nav>
    </>
    )
}
