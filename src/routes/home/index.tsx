import styles from "./index.module.scss"
import useFetchFromDB from "../../hooks/useFetchFromDB"
import useFetchListFromDB from "../../hooks/useFetchListFromDB"
import { useContext } from "react"
import { SettingsContext } from "../../contexts"
import Loader from "../../components/Loader"
import { AboutMe, AppSettings } from "../../global-types"
import Introduction from "./Introduction"

export default function Home() {
  const settings: AppSettings = useContext(SettingsContext)

  const { data: aboutMe, isFetching: isAboutFetching } =
    useFetchFromDB<AboutMe>(`${settings.lang}/me`)

  const { list: photos, isFetching: isPhotosFetching } =
    useFetchListFromDB<string>(`photos`)

  if (isAboutFetching || isPhotosFetching) return <Loader />

  const { subtitle, summary }: AboutMe = aboutMe

  return (
    <main className={styles.Home}>
      <Introduction subtitle={subtitle} photos={photos} summary={summary} />
    </main>
  )
}
