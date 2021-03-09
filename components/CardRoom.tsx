import styles from './CardRoom.module.css'

interface ICardRoom {
  onClick(): void
  name: string
}

const CardRoom: React.FC<ICardRoom> = ({ name, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {name}
    </div>
  )
}

export default CardRoom
