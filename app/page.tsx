"use client"
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Image from 'next/image'
import styles from './page.module.css'
import { CharacterList } from './character';


export default function Home() {

  return (
    <ApolloProvider client={client}>
    <div className={styles.container}>
    <h1 style={{ textAlign: 'center' }} >Rick and Morty Characters</h1>
    <CharacterList />
    </div>
    </ApolloProvider>
  )
}
