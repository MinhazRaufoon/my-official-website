import styles from "./VideoPoster.module.scss"

interface Props {
  className?: string
  src: string
}

export default function VideoPoster({ className, src }: Props) {
  const isYoutubeLink = src.indexOf("youtube.com") !== -1

  return (
    <div className={`${styles.VideoPoster} ${className}`}>
      {isYoutubeLink && (
        <iframe
          allow="fullscreen"
          title="Youtube link"
          src={src}
          data-testid="youtube-video-elem"
        ></iframe>
      )}
      {!isYoutubeLink && (
        <video src={src} controls data-testid="rest-video-elem"></video>
      )}
    </div>
  )
}
