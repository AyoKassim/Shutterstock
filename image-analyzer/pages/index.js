import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (

<div>
  <nav class="navbar navbar-light border-bottom">
    <div  className = {styles.logo}> 
      <a class="navbar-brand" href="#">
        <img src="/logo.png" width = "200px" />
      </a>
    </div>
  </nav>
  <h1 className={styles.title}>Image Rating System</h1>
  <div class="container">
  <div class="row">
    <div class="col">

    </div>
    <div class="col">
    
  <form action="/api/analyze" method="post" className ={styles.uploadForm} encType="multipart/form-data" >
    <input type="file" id="upload" name="image" ></input>
    <input type="submit" className = {styles.submit}></input>
  </form>
  
  
    </div>
    <div class="col">
     
    </div>
  </div>
  <h3 className={styles.subText}>Select and image to rate and click submit!</h3>
  <p className={styles.subP}>Once the image has been uploaded and processed you will be taken to a results screen. There you will be presented with all the metrics that were ran on the image. As well as explanations of
    each metric and how they effect the saleability of the image.
  </p>


</div>
  
</div>
  )
}
