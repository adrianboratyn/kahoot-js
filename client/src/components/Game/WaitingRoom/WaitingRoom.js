import React, { useState, useEffect } from "react"
import styles from "./waitingRoom.module.css"

function WaitingRoom({pin, socket}) {
  const [playerList, setPlayerList] = useState([])

  useEffect(() => {
    socket.on("player-added", (player) => {
      setPlayerList([ ...playerList, player ])
    })
  }, [playerList, socket])

  return (
    <div className={styles["waiting-room"]}>
      <h1 className={styles["title"]}>Waiting Room</h1>
      <h2 className={styles["header"]}>Show PIN to your students: {pin} </h2>
      <div className={styles["players-list"]}>
        <h3 className={styles["players-list-title"]}>Player List</h3>
        {playerList.length > 0 ? (
          playerList.map((player) => (
            <div className={styles["player"]} key={player.socketId}>
              <h4 className={styles["players-list-student"]}>
                {" "}
                Uczeń: {player.userName}
              </h4>
            </div>
          ))
        ) : (
          <h4>No players yet</h4>
        )}
      </div>
    </div>
  )
}

export default WaitingRoom
