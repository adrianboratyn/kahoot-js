import React from "react";
import styles from "./home.module.css";
import img1 from '../../assets/img1.jpeg'
import img2 from '../../assets/img2.jpeg'
import img3 from '../../assets/img3.svg'
import img4 from '../../assets/img4.svg'
import img5 from '../../assets/img5.svg'

function Home() {
  return (
    <main className={styles.page}>
      <section className={styles["page-section"]}>
        <section className={styles["first-section"]}>
          <div className={styles.banner}>
            <div className={styles["banner-body"]}>
              <h2 className={styles["banner-title"]}>Make learning awesome</h2>
              <p className={styles["banner-description"]}>
                Quizzly delivers engaging learning to billions
              </p>
              <button className={styles["banner-button"]}>
                <a href="/">Sign up for free</a>
              </button>
            </div>
            <img src={img1} alt="" className={styles["banner-image"]} />
          </div>
          <div className={styles.banner}>
            <div className={styles["banner-body"]}>
              <h2 className={styles["banner-title"]}>Explore content</h2>
              <p className={styles["banner-description"]}>
                Explore content and join one of the world’s largest educator
                communities.
              </p>
              <button className={styles["banner-button"]}>
                <a href="/">Check public quizes</a>
              </button>
            </div>
            <img src={img2} alt="" className={styles["banner-image"]} />
          </div>
        </section>
        <section className={styles["second-section"]}>
          <div className={styles["section-background"]}></div>
          <div className={styles.info}>
            <div className={styles["info-body"]}>
              <h2 className={styles["info-title"]}>Quizzly at school</h2>
              <p className={styles["info-description"]}>
                Engaging group and distance learning for teachers and students.
              </p>
              <a href="/" className={styles["info-link"]}>
                Learn more &gt;
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles["info-body"]}>
              <h2 className={styles["info-title"]}>Quizzly at work</h2>
              <p className={styles["info-description"]}>
                Deliver training, presentations, meetings and events in-person
                or on any video conferencing platform.
              </p>
              <a href="/" className={styles["info-link"]}>
                Learn more &gt;
              </a>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles["info-body"]}>
              <h2 className={styles["info-title"]}>Quizzly at home</h2>
              <p className={styles["info-description"]}>
                Learning Apps and games for family fun or home study.
              </p>
              <a href="/" className={styles["info-link"]}>
                Learn more &gt;
              </a>
            </div>
          </div>
        </section>
        <section className={styles["third-section"]}>
          <h1>How does Quizzly work?</h1>
          <div className={styles["card-container"]}>
            <div className={styles.card}>
              <img src={img3} alt="" />
              <div className={styles["card-body"]}>
                <h1>Create</h1>
                <p>
                  It only takes minutes to create a learning game or trivia quiz
                  on any topic, in any language.
                </p>
              </div>
            </div>
            <div className={styles.card}>
              <img src={img4} alt="" />
              <div className={styles["card-body"]}>
                <h1>Host or share</h1>
                <p>
                  Host a live game with questions on a big screen or share a
                  game with remote players.
                </p>
              </div>
            </div>
            <div className={styles.card}>
              <img src={img5} alt="" />
              <div className={styles["card-body"]}>
                <h1>Play</h1>
                <p>
                  Game on! Join a kahoot with a PIN provided by the host and
                  answer questions on your device.
                </p>
              </div>
            </div>
          </div>
          <div className={styles["card-button"]}>
            Play Quizzly to see how it works.
            <a href="/">Explore our public quizes</a>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Home;
