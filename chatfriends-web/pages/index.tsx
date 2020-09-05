import Link from 'next/link'
import Header from '../components/Header'
import Layout from '../components/Layout'

import styles from '../styles/Home.module.css'

const Home: React.FC = () => {
  return (
    <Layout>
      <Header title="ChatFriends" landing />
      <main className={styles.container}>
        <h1 className={styles.align}>
          Welcome to Chat<span className={styles.orange}>Friends</span>
        </h1>
        <p>The best place to talk with your friends</p>
        <div className={styles.buttonContainer}>
          <Link href="/signin">
            <a className={styles.buttonLogin}>SignIn</a>
          </Link>
          <Link href="/signup">
            <a className={styles.buttonRegister}>SignUp</a>
          </Link>
        </div>
      </main>
    </Layout>
  )
}

export default Home
