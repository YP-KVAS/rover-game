import { FC, MouseEvent } from 'react'
import styles from './CrudIcons.module.scss'
import { EmojiEnum  } from '../../../utils/const-variables/emoji'

interface EmojiIconsProps {
  emojiIconsHandler: (e: MouseEvent) => void
  emojiHappyFace: number
  emojiSadFace: number
  emojiAngryFace: number
  emojiLike: number
  emojiDislike: number
}

export const EmojiIcons: FC<EmojiIconsProps> = ({
  emojiIconsHandler,
  emojiHappyFace,
  emojiSadFace,
  emojiAngryFace,
  emojiLike,
  emojiDislike,
}) => {
  return (
    <div className={styles.svg_emoji}>
      <div className={styles.svg_emoji} onClick={emojiIconsHandler} id={EmojiEnum.HAPPY_FACE}>
        <svg className={styles.svg_icon}>
          <use xlinkHref="./images/icons-sprite.svg#happyFace"></use>
        </svg>
        <p>{emojiHappyFace}</p>
      </div>
      <div className={styles.svg_emoji} onClick={emojiIconsHandler} id={EmojiEnum.SAD_FACE}>
        <svg className={styles.svg_icon}>
          <use xlinkHref="./images/icons-sprite.svg#sadFace"></use>
        </svg>
        <p>{emojiSadFace}</p>
      </div>
      <div className={styles.svg_emoji} onClick={emojiIconsHandler} id={EmojiEnum.ANGRY_FACE}>
        <svg className={styles.svg_icon}>
          <use xlinkHref="./images/icons-sprite.svg#angryFace"></use>
        </svg>
        <p>{emojiAngryFace}</p>
      </div>
      <div className={styles.svg_emoji} onClick={emojiIconsHandler} id={EmojiEnum.LIKE}>
        <svg className={styles.svg_icon}>
          <use xlinkHref="./images/icons-sprite.svg#like"></use>
        </svg>
        <p>{emojiLike}</p>
      </div>
      <div className={styles.svg_emoji} onClick={emojiIconsHandler} id={EmojiEnum.DISLIKE}>
        <svg className={styles.svg_icon}>
          <use xlinkHref="./images/icons-sprite.svg#dislike"></use>
        </svg>
        <p>{emojiDislike}</p>
      </div>
    </div>
  )
}
