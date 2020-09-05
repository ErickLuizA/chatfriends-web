import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'

import firebase from '../config/fire-config'

import styles from './Form.module.css'

interface FormProps {
  type: string
}

const Form: React.FC<FormProps> = ({ type }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (type === 'SignUp') {
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)

        await user.user.updateProfile({
          displayName: name
        })

        router.push('/dashboard')
      } catch (error) {
        setError(error.message)
      }
    } else {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        router.push('/dashboard')
      } catch (error) {
        setError(error.message)
      }
    }
  }

  const handleGoogleAuth = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase.auth().signInWithPopup(provider)
      router.push('/dashboard')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section className={styles.container}>
      <h1>
        Chat<span className={styles.orange}>Friends</span>
      </h1>
      <button onClick={handleGoogleAuth} className={styles.googleButton}>
        <FcGoogle size={50} className={styles.icon} />
        SignIn with Google
      </button>
      <form onSubmit={handleSubmit} className={styles.form}>
        {type === 'SignUp' && (
          <>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className={styles.input}
            />
          </>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        {error && <p className={styles.error}> {error} </p>}
        <button type="submit" className={styles.button}>
          {type}
        </button>
      </form>
      {type === 'SignUp' ? (
        <p>
          Already have a account?
          <Link href="signin">
            <a className={styles.orange}>SignIn</a>
          </Link>
        </p>
      ) : (
        <p>
          Are you new here?
          <Link href="signup">
            <a className={styles.orange}>SignUp</a>
          </Link>
        </p>
      )}
    </section>
  )
}

export default Form
