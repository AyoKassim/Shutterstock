import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
  <form action="/api/analyze" method="post" encType="multipart/form-data">
   <input type="file" id="upload" name="image"></input>
   <input type="submit"></input>
  </form>
  )
}
