import Head from 'next/head'
import Link from 'next/link'
import { useContext } from 'react'

import { AuthContext } from '../context/authContext'

import styles from './Header.module.css'

interface HeaderProps {
  title: string
  landing?: boolean
}

const Header: React.FC<HeaderProps> = ({ title, landing }) => {
  const { signOut } = useContext(AuthContext)

  return (
    <>
      <Head>
        <title> {title} </title>
      </Head>
      <header className={styles.displayFlex}>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              Chat<span className={styles.orange}>Friends</span>
            </a>
          </Link>
        </div>
        <ul className={styles.displayFlex}>
          {landing ? (
            <>
              <li className={styles.push}>
                <Link href="/signin">
                  <a className={styles.link}>SignIn</a>
                </Link>
              </li>
              <li className={styles.push}>
                <Link href="/signup">
                  <a className={styles.link}>SignUp</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={styles.push} onClick={signOut}>
                <span className={styles.link}>SignOut</span>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  )
}

export default Header
