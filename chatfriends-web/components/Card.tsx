import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import styles from './Card.module.css'

interface ICard {
  msgUser
  message
  time
}

const Card: React.FC<ICard> = ({ msgUser, message, time }) => {
  const { user } = useContext(AuthContext)

  return (
    <div
      className={
        user?.displayName === msgUser ? styles.userContainer : styles.container
      }
    >
      <div className={styles.wrapper}>
        <small className={styles.userName}> ~{msgUser} </small>
        <p className={styles.message}> {message} </p>
        <small className={styles.time}> {time} </small>
      </div>
    </div>
  )
}

export default Card
