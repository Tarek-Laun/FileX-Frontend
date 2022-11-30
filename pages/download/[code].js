import Head from 'next/head'
import { useState, useEffect  } from "react";
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
const axios = require('axios');
import { useRouter } from 'next/router'

export default function Download() {
    const router = useRouter()
    const { code } = router.query
    const [filename, setFileName] = useState('');
    const [password, setPassword] = useState("");
    var functioncalled = false;
  
    const apiURL = "http://local.tarek-laun.de:5001";
  
    var download = async (e) => {
        e.preventDefault();
        const body = new FormData();
        body.append("Code", code);
        body.append("Password", password);

        fetch(apiURL + "/download", {body: body, method: "post"})
        .then((res) => { return res.blob(); })
        .then((data) => {
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        a.download = filename;
        a.click();
        });
    }

    var getFile = async function() {
        console.log("Call This Function");
        if (code == null) {
            return;
        }
        try {
            const firstData = {
              ApiKey: "e0488f14-218e-418d-8fe8-1b7e45ac44ca",
              Code: code
            }

            const res = await axios.post(apiURL + "/getName", firstData);
            console.log(`Status: ${res.status}`);
            console.log('Body: ', res.data);

            setFileName(res.data["Name"]);
        }catch {
            setFileName("File not Found");
        }
    }

    if (!functioncalled) {
        functioncalled = true;
        getFile();
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
          <h2 className={styles.h2}>Download: {code}</h2>
          <form method='post' action="http://localhost:5001/download">
            <h3>File Name: {filename}</h3>
            <input type="hidden" value={code} name="Code"></input>
            <input className={styles.input} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password..." name="Password"/>
            <input className={styles.input} type="submit" value="Download"/>
          </form>
        </div>
      </div>
      
    )
  }
  