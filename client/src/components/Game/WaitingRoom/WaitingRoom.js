import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import styles from "./waitingRoom.module.css"

function WaitingRoom({ pin, socket }) {
  const [playerList, setPlayerList] = useState([])
  const isLanguageEnglish = useSelector((state) => state.language.isEnglish)

  useEffect(() => {
    socket.on("player-added", (player) => {
      setPlayerList([...playerList, player])
    })
  }, [playerList, socket])

  return (
    <div className={styles["waiting-room"]}>
      <h1 className={styles["title"]}>
        {isLanguageEnglish ? "Waiting room" : "Poczekalnia"}
      </h1>
      <h2 className={styles["header"]}>
        {isLanguageEnglish
          ? "Show PIN to your students"
          : "Pokaż pin swoim uczniom"}
        : {pin}
      </h2>
      <div className={styles["players-list"]}>
        <div className={styles["leaderboard"]}>
          <h1 className={styles["leaderboard-title"]}>
            {isLanguageEnglish ? "Player List" : "Lista graczy"}
          </h1>
          {playerList.length > 0 ? (
            <ol>
              {playerList.map((player) => (
                <li>
                  <mark>{player.userName}</mark>
                  <small>{isLanguageEnglish ? "Student" : "Uczeń"}</small>
                </li>
              ))}
            </ol>
          ) : (
            <h1 className={styles["leaderboard-title"]}>
              {isLanguageEnglish
                ? "No players yet"
                : "Na razie nikt nie dołączył"}
            </h1>
          )}
        </div>
      </div>
    </div>
  )
}

export default WaitingRoom
