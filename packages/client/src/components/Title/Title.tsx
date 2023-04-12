import { FC } from "react";
import styles from "./Title.module.scss"

interface Title {
  text: string
}
export const Title: FC<Title> = ({ text }) => {
  return (
    <h2 className={styles.title}>{text}</h2>
  )
}
