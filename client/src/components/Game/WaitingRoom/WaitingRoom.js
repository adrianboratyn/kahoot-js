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
      <h1>Waiting Room</h1>
      <h2>Show PIN to your students: {pin} </h2>
      <div className={styles["players-list"]}>
        <h3>Player List</h3>
        {playerList.length > 0 ? (
          playerList.map((player) => (
            <div className={styles["player"]} key={player.socketId}>
              <h4> Uczeń: {player.userName}</h4>
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
