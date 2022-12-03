import Head from 'next/head'
import { useState, useEffect  } from "react";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
const axios = require('axios');
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [error, setError] = useState('');
  const [password, setPassword] = useState("");
  const [File, setFile] = useState(null);

  const apiURL = "http://api.filex.lkind.net:5001";

  const uploadFileToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];

      setFile(i);
    }
  };

  const upload = async (e) => {
    e.preventDefault();
    try {
      // Create File

      const firstData = {
        Creator: 0,
        ApiKey: "e0488f14-218e-418d-8fe8-1b7e45ac44ca",
        Password: password
      }

      const res = await axios.post(apiURL + "/upload", firstData);
      console.log(`Status: ${res.status}`)
      console.log('Body: ', res.data["Code"])

      // Upload File

      const body = new FormData();
      body.append("ApiKey", "e0488f14-218e-418d-8fe8-1b7e45ac44ca");
      body.append("file", File);
      try {
        const res2 = await axios.post(apiURL + "/file?c=" + res.data["Code"], body);
        console.log(`Status: ${res2.status}`)
        console.log('Data: ', res2.data)
  
        if (res2.data["Error"] != null) {
          console.log(res2.data["Error"]);
          setError(res2.data["Error"]);
        }else {
          router.push("/download/" + res2.data["Code"])
        }
      }catch {
        setError("Currently out of Service.");
      }
    }catch{
      setError("Currently out of Service.");
    }
  }


  return (
    <div className={styles.container}>
      <img src='logo-no-background.svg' className={styles.lkiLogo}></img>
      <svg viewBox="0 0 100 100" width="100%" height="100%" style={{height: 100 + "%", position: "absolute"}} preserveAspectRatio="xMaxYMin meet">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="75%" x2="100%" y2="0%">
            <stop offset="20%" stopColor="#54c5ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#1650ff" stopOpacity="1"/>
          </linearGradient>
        </defs>
        <mask id="fade" opacity="1.0">
          <circle cx="105" cy="-5" r="90" fill="white"/>
          <circle cx="100" cy="73" r="25" fill="white"/>
          <circle cx="35" cy="-5" r="35" fill="white"/>
        </mask>
        <rect x="0" y="0" width="100" height="100" fill="url(#grad1)" mask="url(#fade)"/>
      </svg>
      <div className={styles.Login}>
        <a href='/'><h1 className={styles.h1}>File <span style={{color:"#00c3ff"}}>X</span></h1></a>
        <h2 className={styles.h2}>Upload:</h2>
        <p>Files are deleted after 5 minutes.</p>
        <form onSubmit={upload}>
          {error
          ?<p style={{color: "#e35959", margin: 0}}>Error: {error}</p>
          :<p></p>
          }
          <input className={styles.input} onChange={uploadFileToClient} type="file"/>
          <input className={styles.input} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"/>
          <input className={styles.input} type="submit" value="Upload"/>
        </form>
        <a href='/imp'> Impressum </a>
        <a href='/ds'> Datenschutzt </a>
      </div>
    </div>
  )
}
