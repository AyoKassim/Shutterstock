import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <div id="submission">
        <nav class="navbar navbar-light border-bottom">
          <div className={styles.logo}>
            <a class="navbar-brand" href="#">
              <img src="/logo.png" width="200px" />
            </a>
          </div>
        </nav>
        <h1 className={styles.title}>Image Rating System</h1>
        <div class="container">
          <div class="row">
            <div class="col"></div>
            <div class="col">
              <form
                action="/api/analyze"
                method="post"
                className={styles.uploadForm}
                encType="multipart/form-data"
              >
                <input type="file" id="upload" name="image"></input>
                <input
                  type="submit"
                  className={styles.submit}
                  onClick={async () => {
                    document.getElementById("submission").style.display =
                      "none";
                    document.getElementById("loading").style.display = "block";
                    let i=0; const status=['','.','..','...'];
                    const sleep = (milliseconds) => {
                      return new Promise(resolve => setTimeout(resolve, milliseconds))
                    }
                    while(true)
                    {
                      await sleep(500);
                      document.getElementById('status').innerHTML = `Loading${status[i++%status.length]}`
                    }
                  }}
                ></input>
              </form>
            </div>
            <div class="col"></div>
          </div>
          <h3 className={styles.subText}>
            Select and image to rate and click submit!
          </h3>
          <p className={styles.subP}>
            Once the image has been uploaded and processed you will be taken to
            a results screen. There you will be presented with all the metrics
            that were ran on the image. As well as explanations of each metric
            and how they effect the saleability of the image.
          </p>
        </div>
      </div>

      <div id="loading" className={styles.loading}>
        <p id="status">Loading</p>
        <p6>This may take a while!</p6>
      </div>
    </div>
  );
}
