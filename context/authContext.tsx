import firebase from '../config/fire-config'
import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { User } from 'firebase/auth'


interface AuthProps {
  signed: boolean
  user: User
  signOut: () => void
}

const AuthContext = createContext({} as AuthProps)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (!user) {
      switch (router.pathname) {
        case '/dashboard':
          router.push('/')
          break
      }
    } else {
      router.push('/dashboard')
    }
  }, [router.pathname, user])

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: User) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [signOut])

  async function signOut() {
    await firebase.auth().signOut()
  }

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
