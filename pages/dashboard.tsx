import { FormEvent, useContext, useEffect, useRef, useState } from 'react'

import { AuthContext } from '../context/authContext'

import Firebase from '../config/fire-config'

import styles from '../styles/Dashboard.module.css'

import CardRoom from '../components/CardRoom'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Card from '../components/Card'

interface IMessage {
  user: string
  message: string
  timestamp: number
}

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext)

  const [rooms, setRooms] = useState([])
  const [currentRoom, setCurrentRoom] = useState('')

  const [messages, setMessages] = useState<IMessage[]>([])

  const [message, setMessage] = useState('')

  const [newRoomName, setNewRoomName] = useState('')

  const messagesEndRef = useRef(null)

  const roomsCollection = Firebase.firestore().collection('rooms')

  const handleCreateRoom = async (e: FormEvent) => {
    e.preventDefault()

    roomsCollection.doc(newRoomName).set({})

    handleChangeRoom(newRoomName)

    setNewRoomName('')
  }

  useEffect(() => {
    (async () => {
      const result = await roomsCollection.get()

      let array = []

      result.docs.forEach(doc => {
        array.push(doc.id)
      })

      setRooms(array)
    })()
  }, [handleCreateRoom])

  const handleChangeRoom = (newRoom: string) => {
    setCurrentRoom(newRoom)
    setMessages([])

    roomsCollection.doc(newRoom).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
      let array: IMessage[] = []

      snapshot.docs.forEach(doc => {
        const data = doc.data() as IMessage

        array.push(data)
      })

      setMessages(array)

      messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
    })
  }

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault()

    roomsCollection.doc(currentRoom).collection('messages').add({
      message,
      user: user.displayName,
      timestamp: new Date().getTime()
    })

    setMessage('')
  }

  return (
    <Layout>
      <Header title="ChatFriends - Dashboard" />
      <main className={styles.container}>
        <section className={styles.sidebarContainer}>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              value={newRoomName}
              onChange={e => setNewRoomName(e.target.value)}
              placeholder="Create a new room"
              className={styles.newRoomInput}
            />
          </form>
          <div>
            {rooms &&
              rooms.map(r => (
                <CardRoom
                  key={r}
                  onClick={() => handleChangeRoom(r)}
                  name={r}
                />
              ))}
          </div>
        </section>
        <section id="chatContainer" className={styles.chatContainer}>
          {messages &&
            messages.map(msg => {
              const msgDate = new Date(msg.timestamp)
              const formatedHour = `${msgDate.getHours()}:${msgDate.getMinutes()}`
              return (
                <Card
                  key={msg.timestamp}
                  msgUser={msg.user}
                  message={msg.message}
                  time={formatedHour}
                />
              )
            })}
            <div ref={messagesEndRef} />
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className={styles.input}
            />
          </form>
        </section>
      </main>
    </Layout>
  )
}

export default Dashboard
