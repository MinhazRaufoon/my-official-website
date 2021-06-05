import Poster from "../../components/Poster"
import styles from "./index.module.css"
import useFetchFromDB from "../../hooks/useFetchFromDB"
import useFetchListFromDB from "../../hooks/useFetchListFromDB"
import { useContext } from "react"
import { SettingsContext } from "../../contexts"
import Loader from "../../components/Loader"
import PosterSection from "../../components/PosterSection"
import secBg1 from "../../assets/images/sec-bg1.jpg"
import { AboutMe, AppSettings } from "../../global-types"
import EducationRecord from "../../components/EducationRecord"

export default function Home() {
  const settings: AppSettings = useContext(SettingsContext)

  const { data: aboutMe, isFetching: isAboutFetching } =
    useFetchFromDB<AboutMe>(`${settings.lang}/me`)

  const { list: photos, isFetching: isPhotosFetching } =
    useFetchListFromDB<string>(`photos`)

  if (isAboutFetching || isPhotosFetching) return <Loader />

  const { subtitle, educationHistory, summary, careerInterests }: AboutMe =
    aboutMe

  const randomizedPhoto: string =
    photos[Math.floor(Math.random() * photos.length)]

  return (
    <main className={styles.Home}>
      <PosterSection imgSrc={secBg1}>
        <div className={styles.intro}>
          <section className={styles.photoContainer}>
            <Poster className={styles.poster} src={randomizedPhoto} />
          </section>

          <article className={styles.aboutMe}>
            <h1>{subtitle}</h1>
            <p dangerouslySetInnerHTML={{ __html: summary }}></p>
          </article>
        </div>
      </PosterSection>

      <section className={styles.skillEdSection}>
        <article
          className={`centerized atLeastFullHeightUnlessPortrait`}
          style={{ backgroundColor: "var(--color-bg-3)" }}
        >
          <h1>Career interests</h1>
          <ul className={styles.careerInterests}>
            {careerInterests.map((data) => (
              <li key={data.title}>
                <h4 style={{ margin: "0 0 4px 0" }}>{data.title}</h4>
                <small>{data.subtitle}</small>
              </li>
            ))}
          </ul>
        </article>

        <article
          className="centerized atLeastFullHeightUnlessPortrait"
          style={{ backgroundColor: "var(--color-bg-4)" }}
        >
          <h1>My academic life</h1>
          <div>
            {educationHistory
              .map((ed) => <EducationRecord key={ed.degree} {...ed} />)
              .reverse()}
          </div>
        </article>
      </section>
    </main>
  )
}
