import styles from "./Introduction.module.scss"
import Poster from "../../components/Poster"

type Props = {
  photos: string[]
  subtitle: string
  summary: string
}

export default function Introduction(props: Props) {
  const { photos, subtitle, summary } = props

  const randomizedPhoto: string =
    photos[Math.floor(Math.random() * photos.length)]

  return (
    <section className={`${styles.intro} atLeastFullHeight`}>
      <section className={styles.photoContainer}>
        <Poster className={styles.poster} src={randomizedPhoto} />
      </section>

      <article className={styles.aboutMe}>
        <h1>{subtitle}</h1>
        <p dangerouslySetInnerHTML={{ __html: summary }}></p>
      </article>
    </section>
  )
}
