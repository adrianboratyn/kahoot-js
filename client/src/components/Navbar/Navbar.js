import React, { useState, useEffect } from "react"
import styles from "./navbar.module.css"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import decode from "jwt-decode"
import * as actionType from "../../constants/actionTypes"
import globe from "../../assets/globe.svg"

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const [isLanguageEnglish, setIsLanguageEnglish] = useState(false)

  const logout = () => {
    dispatch({ type: actionType.LOGOUT })
    history.push("/auth")
    setUser(null)
  }

  useEffect(() => {
    const token = user?.accessToken
    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
    setUser(JSON.parse(localStorage.getItem("profile")))
  }, [location])

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles["menu-right"]}>
          <ul className={styles.nav__list}>
            <li className={styles["nav__list-logo"]}>
              <Link to="/" className={styles["logo-link"]}>
                <img src="" alt="logo" className={styles["logo-img"]} />
              </Link>
            </li>
            <li className={styles["nav__list-item"]}>
              {isLanguageEnglish ? "About" : "O nas"}
              <ul className={styles["nav__list-item-drop"]}>
                <li>{isLanguageEnglish ? "How it works" : "Jak to działa"} </li>
                <li>{isLanguageEnglish ? "Ways to play" : "Sposoby na grę"}</li>
              </ul>
            </li>
            <li className={styles["nav__list-item"]}>
              {isLanguageEnglish ? "Study" : "Ucz się"}
              <ul className={styles["nav__list-item-drop"]}>
                <li>
                  <Link to="/quizes">
                    {isLanguageEnglish ? "Public quizes" : "Publiczne quizy"}
                  </Link>
                </li>
                <li>{isLanguageEnglish ? "Test game" : "Przetestuj grę"}</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={styles["menu-left"]}>
          <ul className={styles.nav__list}>
            <li className={styles["nav__list-item"]}>
              {isLanguageEnglish ? "Contact" : "Kontakt"}
            </li>
            <li className={styles["nav__list-item"]}>
              {isLanguageEnglish ? "Play" : "Graj"}
            </li>
            {user ? (
              <>
                <li className={styles["nav__list-item"]}>
                  <Link>{isLanguageEnglish ? "My Quizes" : "Moje Quizy"}</Link>
                </li>
                <li className={styles["nav__list-item"]}>
                  {user.result.firstName}
                </li>
                <li onClick={logout} className={styles["nav__list-item"]}>
                  {isLanguageEnglish ? "Log out" : "Wyloguj"}
                </li>
              </>
            ) : (
              <Link to="/auth" className={styles["nav__list-item"]}>
                {isLanguageEnglish ? "Log in" : "Zaloguj"}
              </Link>
            )}
            <li className={styles["nav__list-item"]}>
              <img src={globe} alt="" />
              {isLanguageEnglish ? "EN" : "PL"}
              <ul className={styles["nav__list-item-drop"]}>
                <li
                  onClick={() =>
                    setIsLanguageEnglish((prevState) => !prevState)
                  }
                >
                  {isLanguageEnglish ? "Polski" : "English"}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
