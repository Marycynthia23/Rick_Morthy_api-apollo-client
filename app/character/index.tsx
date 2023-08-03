import { useQuery, gql } from '@apollo/client';
import { useState } from "react";
// import  { RandomCharacter } from './randomcharacters';

type CharacterProp = {
  id: number;
  name: string;
  species: string;
  status: string;
  type: string;
        gender: string;
        origin:{
          name: string;
          url: string;
        }
        location:{
          name: string;
          url: string;
        }
        image: string
}

export const GET_CHARACTERS = gql`
query Characters{
    characters{
      results {
        name
        species
        status
        type
        gender
        origin{name}
        location {name}
        image
      },
    },
  }
`;

export function CharacterList() {
  const [searchTerm, setSearchTerm] = useState("");
  const {loading, error, data }   = useQuery(GET_CHARACTERS, {variables: {name: searchTerm}});
  const handleChange = (event:any) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div>
      <input type="text" name="search" placeholder="search for Rick and Morty characters..." value={searchTerm} onChange={handleChange} className="search-input"  /> 
      {loading && (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
       )}
      {error && <p> error </p> }
      {/* {data?.characters.results.length === 0 && (<>   <RandomCharacter/> </>)} */}
      <div style={{display:"flex",flexWrap: "wrap"}}>
      {data && data.characters.results.map((character:CharacterProp) => (
        <div className="card" key={character.name} style={{ backgroundImage: `url(${character.image})`,backgroundRepeat: 'no-repeat'}}> 
          <div className="info"> 
          <h2 className="h3"> {character.name}</h2>
          <p> Status: {character.status}</p>
          <p> Species: {character.species} </p>
          <p> Type: {character.type}</p>
          <p> Gender: {character.gender}</p>
          <p> Origin: {character.origin.name}</p>
          <p> Location: {character.location.name}</p>
        </div>
        </div> 
      ))}
      </div>
    </div> 
  );
}