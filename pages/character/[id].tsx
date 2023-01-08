import axios from "axios";
import Image from "next/image";
import ImageLoader from "../../imageLoader";
import { Character, GetCharacterResults } from "../../types";

function CharacterPage({ character }: { character: Character }) {
    return (
        <div>
            <h1>{character.name}</h1>
            <Image
                src={character.image}
                alt={character.name}
                width="200"
                height="100"
                loader={ImageLoader}
                unoptimized
            />
        </div>
    );
}

export async function getStaticPaths() {
    const res = await axios.get("http://rickandmortyapi.com/api/character");
    const { results }: GetCharacterResults = await res.data;

    return {
        paths: results.map((character) => {
            return { params: { id: String(character.id) } };
        }),
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const res = await axios.get(`http://rickandmortyapi.com/api/character/${params.id}`);
    const character = await res.data;

    return {
        props: { character },
    };
}
export default CharacterPage;
