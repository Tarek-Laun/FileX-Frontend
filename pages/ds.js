import styles from '../styles/Home.module.css'
const axios = require('axios');

export default function Home() {
  return (
    <div className={styles.container}>
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
        <h2>Datenschutzt</h2>
        <h3>Daten:</h3>
        <p>Alle Daten(Files, Passwörter, etc) werden nach 5 Minuten wieder unwiderruflich gelöscht.</p>
        <h3>Cookies</h3>
        <p>Unser Service speichert keine Cookies, nur <a href='https://www.cloudflare.com'>Cloudflare</a> speichert System relevante Cookies.</p>
        <a href='/imp'> Impressum </a>
        <a href='/ds'> Datenschutzt </a>
      </div>
    </div>
  )
}