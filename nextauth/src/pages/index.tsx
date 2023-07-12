import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { withSSRGuest } from '@/utils/withSSRGuest'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    
    const data = {
      email, 
      password
    }
    await signIn(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      <button type='submit'>Entrar</button>
    </form>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {
      user: []
    }
  }
})