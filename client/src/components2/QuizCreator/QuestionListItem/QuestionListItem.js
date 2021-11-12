import React from "react";
import styles from "./questionListItem.module.css";

function QuestionListItem({number, type, name, time, image}) {
  return (
    <div className={styles["question-list-item"]}>
      <h3 className={styles["question-list-item-title"]}>
        <span className={styles["question-list-number"]}>{number}&nbsp;</span>
        {type}
      </h3>
      <div className={styles["question-preview"]}>
        <h4 className={styles["question-preview-title"]}>
          {name}
          {/* <!-- dodać funkcję, która pokazuje tytuł, ale tylko pierwsze 20 znaków --> */}
        </h4>
        <div className={styles["question-preview-time"]}>{time}</div>
        <div className={styles["question-preview-background-image"]}>
          {image.length === 0 ? (
            <svg
              id="miniature-kahoot-block-0-media-icon"
              data-functional-selector="icon"
              viewBox="0 0 32 32"
              focusable="false"
              stroke="none"
              stroke-width="0"
            >
              <path
                d="M25,6 C26.104,6 27,6.897 27,8 L27,8 L27,24 C27,25.103 26.104,26 25,26 L25,26 L7,26 C5.897,26 5,25.103 5,24 L5,24 L5,8 C5,6.897 5.897,6 7,6 L7,6 Z M25,8 L7,8 L7,24 L24.997,24 L24.999,14 L25,14 L25,8 Z M18,14 L22,20 L10,20 L13,16 L15,18 L18,14 Z M12,11 C13.104,11 14,11.894 14,13 C14,14.105 13.104,15 12,15 C10.895,15 10,14.105 10,13 C10,11.894 10.895,11 12,11 Z"
                style={{ fill: "rgb(178, 178, 178)" }}
              ></path>
            </svg>
          ) : (
            <img src={image} alt="" />
          )}
        </div>
        <div className={styles["question-preview-answers"]}>
          <div className={styles["answer-image"]}></div>
          <div className={styles["answer-image"]}></div>
          <div className={styles["answer-image"]}></div>
          <div className={styles["answer-image"]}></div>
        </div>
      </div>
      {/* <!-- ikonka kosza --> */}
    </div>
  );
}

export default QuestionListItem;
