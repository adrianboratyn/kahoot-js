import React from "react";
import styles from "./footer.module.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { useSelector } from "react-redux"

function Footer() {
  const isLanguageEnglish = useSelector((state) => state.language.isEnglish)
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-container"]}>
        <div className={styles["footer-row"]}>
          <div className={styles["footer-column"]}>
            <h4>{isLanguageEnglish ? "About" : "關於我們"}</h4>
            <ul>
              <li>
                <a href="/">{isLanguageEnglish ? "Company" : "卡虎有限公司"}</a>
              </li>
              <li>
                <a href="/">{isLanguageEnglish ? "Service" : "服務"}</a>
              </li>
              <li>
                <a href="/">Blog</a>
              </li>
              <li>
                <a href="/">{isLanguageEnglish ? "Contact" : "聯繫"}</a>
              </li>
            </ul>
          </div>
          <div className={styles["footer-column"]}>
            <h4>{isLanguageEnglish ? "Application" : "應用"}</h4>
            <ul>
              <li>
                <a href="/">{isLanguageEnglish ? "At home" : "家"}</a>
              </li>
              <li>
                <a href="/">{isLanguageEnglish ? "At school" : "學校"}</a>
              </li>
              <li>
                <a href="/">{isLanguageEnglish ? "At work" : "工作場所"}</a>
              </li>
            </ul>
          </div>
          <div className={styles["footer-column"]}>
            <h4>{isLanguageEnglish ? "Terms and conditions" : "使用條款"}</h4>
            <ul>
              <li>
                <a href="/">
                  {isLanguageEnglish ? "Terms and conditions" : "使用條款"}
                </a>
              </li>
              <li>
                <a href="/">
                  {isLanguageEnglish
                    ? "Privacy Policy"
                    : "隱私權政策"}
                </a>
              </li>
            </ul>
          </div>
          <div className={styles["footer-column"]}>
            <h4>{isLanguageEnglish ? "Follow us" : "追蹤我們"}</h4>
            <div className={styles["footer-social-links"]}>
              <a href="/">
                <FacebookIcon />
              </a>
              <a href="/">
                <TwitterIcon />
              </a>
              <a href="/">
                <InstagramIcon />
              </a>
              <a href="/">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
