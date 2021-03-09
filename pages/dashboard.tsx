import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Firebase from '../config/fire-config'
import Card from '../components/Card'

import styles from '../styles/Dashboard.module.css'
import CardRoom from '../components/CardRoom'

interface IMessages {
  user: string
  message: string
  timestamp: number
}

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext)

  const [messages, setMessages] = useState<IMessages[]>([])
  const [rooms, setRooms] = useState([])

  const [room, setRoom] = useState('global')
  const [message, setMessage] = useState('')
  const [roomName, setRoomName] = useState('')

  const messagesRef = Firebase.database().ref('chatrooms')

  useEffect(() => {
    ;(async () => {
      messagesRef.on('value', snapshot => {
        let array = []
        for (let key in snapshot.val()) {
          array.push(key)
        }
        setRooms(array)
      })

      messagesRef.child(room).on('value', snapshot => {
        let data = snapshot.val()

        let msgs = []
        for (let key in data) {
          msgs.push(data[key])
        }

        if (msgs.length > 0) {
          setMessages(msgs)
        } else {
          setMessages([])
        }
      })
    })()
  }, [room])

  const handleChangeRoom = (newRoom: string) => {
    setRoom(newRoom)
  }

  const handleCreateRoom = (e: FormEvent) => {
    e.preventDefault()
    messagesRef.child(roomName).set('')
    setRoomName('')
  }

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault()
    messagesRef.child(room).push({
      message,
      user: user.displayName,
      timestamp: new Date().getTime()
    })
    setMessage('')

    const chat = document.querySelector('#chatContainer')
    chat.scrollTop = chat.scrollHeight
    // chat.scrollTo(0, chat.scrollHeight)
  }

  return (
    <Layout>
      <Header title="ChatFriends - Dashboard" />
      <main className={styles.container}>
        <section className={styles.sidebarContainer}>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
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
