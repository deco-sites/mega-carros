interface Props {
  url: string;
}

const BASE_IFRAME_URL =
  "https://www.youtube.com/embed/{{videoId}}?playlist={{videoId}}&loop=1;rel=0&autoplay=1&controls=0&showinfo=0&mute=1";

export default function YoutubeIframe(props: Props) {
  const url = new URL(props.url);
  const videoId = url.searchParams.get("v") ?? "";

  return (
    <div class="relative overflow-hidden w-full h-full">
      <iframe
        loop={true}
        title="video"
        frameBorder="0"
        controls={false}
        allowFullScreen={false}
        allow="autoplay; encrypted-media"
        class="RESPONSIVE_IFRAME absolute w-full h-full top-1/2 left-1/2 -translate-1/2"
        src={BASE_IFRAME_URL.replaceAll("{{videoId}}", videoId)}
      />
    </div>
  );
}
