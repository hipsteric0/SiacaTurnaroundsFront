import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import handler from './api/api-endpoints'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

const [state,setState]= useState();

const address = fetch("http://127.0.0.1:8000/api/maquinaria")
  .then((response) => response.json())
  .then((user) => {
    return user.address;
  });

const printAddress = async () => {
  const a = await address;
  console.log(a);
};


printAddress();
  return (
    <>

      <main>
        pantalla de login
        <button >
          llamada API
        </button>
      </main>
    </>
  )
}
