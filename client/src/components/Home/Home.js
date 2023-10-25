import React from "react"
import styles from "./home.module.css"
import img1 from "../../assets/img1.jpeg"
import img2 from "../../assets/img2.jpeg"
import img3 from "../../assets/img3.svg"
import img4 from "../../assets/img4.svg"
import img5 from "../../assets/img5.svg"
import { useSelector } from "react-redux"

function Home() {
  const isLanguageEnglish = useSelector((state) => state.language.isEnglish)

  return (
    <main className={styles.page}>
      <section className={styles["page-section"]}>
        <section className={styles["first-section"]}>
          <div className={styles.banner}>
            <div className={styles["banner-body"]}>
              <h2 className={styles["banner-title"]}>
                {isLanguageEnglish
                  ? "Make learning awesome"
                  : "讓學習變得精彩"}
              </h2>
              <p className={styles["banner-description"]}>
                {isLanguageEnglish
                  ? "Quizzly delivers engaging learning to billions"
                  : "Quizly 為數十億人提供引人入勝的學習"}
              </p>
              <button className={styles["banner-button"]}>
                <a href="/">
                  {isLanguageEnglish
                    ? "Sign up for free"
                    : "免費註冊"}
                </a>
              </button>
            </div>
            <img src={img1} alt="" className={styles["banner-image"]} />
          </div>
          <div className={styles.banner}>
            <div className={styles["banner-body"]}>
              <h2 className={styles["banner-title"]}>
                {isLanguageEnglish ? "Explore content" : "Przeglądaj treść"}
              </h2>
              <p className={styles["banner-description"]}>
                {isLanguageEnglish
                  ? "Explore content and join one of the world’s largest educator communities."
                  : "探索內容並加入世界上最大的教育者社群之一。"}
              </p>
              <button className={styles["banner-button"]}>
                <a href="/">
                  {isLanguageEnglish
                    ? "Check public quizes"
                    : "瀏覽公開測驗"}
                </a>
              </button>
            </div>
            <img src={img2} alt="" className={styles["banner-image"]} />
          </div>
        </section>
        <section className={styles["second-section"]}>
          <div className={styles["section-background"]}></div>
          <div className={styles.info}>
            <div className={styles["info-body"]}>
              <h2 className={styles["info-title"]}>
                {isLanguageEnglish ? "Quizzly at school" : "Quizzly 在學校"}
              </h2>
              <p className={styles["info-description"]}>
                {isLanguageEnglish
                  ? "Engaging group and distance learning for teachers and students."
                  : "為教師和學生提供小組和遠距學習。"}
              </p>
              <a href="/" className={styles["info-link"]}>
                {isLanguageEnglish ? "Learn more" : "查詢更多"} &gt;
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles["info-body"]}>
              <h2 className={styles["info-title"]}>
                {isLanguageEnglish ? "Quizzly at work" : "Quizzly 在工作場合"}
              </h2>
              <p className={styles["info-description"]}>
                {isLanguageEnglish
                  ? "Deliver training, presentations, meetings and events in-person or on any video conferencing platform."
                  : "親自或在任何視訊會議平台上提供培訓、演示、會議和活動。"}
              </p>
              <a href="/" className={styles["info-link"]}>
                {isLanguageEnglish ? "Learn more" : "查詢更多"} &gt;
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles["info-body"]}>
              <h2 className={styles["info-title"]}>
                {isLanguageEnglish ? "Quizzly at home" : "Quizzly 居家"}
              </h2>
              <p className={styles["info-description"]}>
                {isLanguageEnglish
                  ? "Learning Apps and games for family fun or home study."
                  : "適合家庭娛樂或家庭學習的學習應用程式和遊戲。"}
              </p>
              <a href="/" className={styles["info-link"]}>
                {isLanguageEnglish ? "Learn more" : "查詢更多"} &gt;
              </a>
            </div>
          </div>
        </section>
        <section className={styles["third-section"]}>
          <h1>
            {isLanguageEnglish
              ? "How does Quizzly work?"
              : "Quizzly 如何運作？"}
          </h1>
          <div className={styles["card-container"]}>
            <div className={styles.card}>
              <img src={img3} alt="" />
              <div className={styles["card-body"]}>
                <h1>{isLanguageEnglish ? "Create" : "建立"}</h1>
                <p>
                  {isLanguageEnglish
                    ? "It only takes minutes to create a learning game or trivia quiz on any topic, in any language."
                    : "只需幾分鐘即可以任何語言創建任何主題的學習遊戲或問答題。"}
                </p>
              </div>
            </div>
            <div className={styles.card}>
              <img src={img4} alt="" />
              <div className={styles["card-body"]}>
                <h1>
                  {isLanguageEnglish
                    ? "Host or share"
                    : "當房主或分享"}
                </h1>
                <p>
                  {isLanguageEnglish
                    ? "Host a live game with questions on a big screen or share a game with remote players."
                    : "在大螢幕上主持帶有問題的現場遊戲或與遠端玩家分享遊戲。"}
                </p>
              </div>
            </div>
            <div className={styles.card}>
              <img src={img5} alt="" />
              <div className={styles["card-body"]}>
                <h1>{isLanguageEnglish ? "Play" : "遊戲大廳"}</h1>
                <p>
                  {isLanguageEnglish
                    ? "Game on! Join a kahoot with a PIN provided by the host and answer questions on your device."
                    : "遊戲開始！ 使用主持人提供的 PIN 碼加入 kahoot，並在您的裝置上回答問題。"}
                </p>
              </div>
            </div>
          </div>
          <div className={styles["card-button"]}>
            {isLanguageEnglish
              ? "Play Quizzly to see how it works."
              : "玩 Quizly 看看它是如何運作的。"}{" "}
            &nbsp;
            <a href="/">
              {isLanguageEnglish
                ? "Explore our public quizes"
                : "探索我們的公開測驗"}
            </a>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Home
