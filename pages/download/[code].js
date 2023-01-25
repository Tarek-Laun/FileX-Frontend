import { useState, useEffect  } from "react";
import styles from '../../styles/Home.module.css'
const axios = require('axios');
import { useRouter } from 'next/router'
const api = require('../../lib/api');

export default function Download() {
  const router = useRouter()
  const { code } = router.query
  const [error, setError] = useState('');
  const [filename, setFileName] = useState('');
  const [hasPwd, setHasPwd] = useState(false);

  var download = async (e) => {
      e.preventDefault();
      const body = new FormData();
      body.append("Code", code);
      body.append("Password", password);
      fetch(api.APIURL + "/download", {body: body, method: "post"})
      .then((res) => { return res.blob(); })
      .then((data) => {
      var a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      console.log(data);
      a.download = filename;
      a.click();
      });
  }
  
  var getFile = async () => {
      if (code == null) {
          return;
      }
      try {
          const firstData = {
            ApiKey: api.APIKEY,
            Code: code
          }
          const res = await axios.post(api.APIURL + "/getName", firstData);
          console.log(`Status: ${res.status}`);
          console.log('Body: ', res.data);
          setFileName(res.data["Name"]);
          setHasPwd(res.data["Password"]);
      }catch {
          setError("File not Found.");
      }
  }
  
  useEffect(() => {
    getFile();
  })

  return (
    <div className={styles.container}>
      <head>
        <meta name="description" content={`Filename: ${filename}`} />
      </head>
      <img src='logo-no-background.svg' className={styles.lkiLogo}></img>
      <svg viewBox="0 0 100 100" width="100%" height="100%" style={{height: 100 + "%", position: "absolute"}} preserveAspectRatio="xMaxYMin meet">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="75%" x2="100%" y2="0%">
            <stop offset="20%" stopColor="#04bfad" stopOpacity="1" />
            <stop offset="100%" stopColor="#007166" stopOpacity="1"/>
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
        <a href='/'><h1 className={styles.h1}>File <span style={{color:"#04bfad"}}>X</span></h1></a>
        <h2 className={styles.h2}>Download: {code}</h2>
        <form method='post' action="https://filex.lkind.net:8443/download">
          {error
          ?<p style={{color: "#e35959", margin: 0}}>Error: {error}</p>
          :<p></p>
          }
          <h3>File Name: {filename}</h3>
          <input type="hidden" value={code} name="Code"></input>
          {hasPwd
          ?<input className={styles.input} type="password" placeholder="Password..." name="Password"/>
          :<input className={styles.input} type="password" placeholder="Password..." name="Password" disabled/>
          }
          <input className={styles.input} type="submit" value="Download"/>
        </form>
      </div>
    </div>
  )
}
