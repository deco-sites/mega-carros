import YoutubeIframe from "mc/components/YoutubeIframe.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  configs: {
    mode: "video" | "image";
    lcp: boolean;
    efx: {
      useOverlay: boolean;
      applyGrayscale: boolean;
    };
  };
  data: {
    youtubeLink?: string;
    image: {
      mobile?: LiveImage;
      desktop?: LiveImage;
    };
  };
}

export default function HeroBackground(props: Props) {
  const { configs, data } = props;
  const grayscaleFilter = configs.efx.applyGrayscale ? "80%" : "0%";
  const maybeOverlay = configs.efx.useOverlay && (
    <div class="absolute w-full h-full bg-black bg-opacity-75 z-[2]" />
  );

  if (configs.mode === "image" && data.image) {
    return (
      <>
        <div class="absolute z-[1] h-full w-full">
          <Picture preload={configs.lcp}>
            <Source
              width={375}
              src={data.image.mobile!}
              media="(max-width: 767px)"
              fetchPriority={configs.lcp ? "high" : "auto"}
            />
            <Source
              width={1366}
              src={data.image.desktop!}
              media="(min-width: 768px)"
              fetchPriority={configs.lcp ? "high" : "auto"}
            />
            <img
              alt="background"
              src={data.image.mobile!}
              class="object-cover w-full h-full"
              loading={configs.lcp ? "eager" : "lazy"}
              style={{ filter: `grayscale(${grayscaleFilter})` }}
            />
          </Picture>
        </div>

        {maybeOverlay}
      </>
    );
  }

  if (configs.mode === "video" && data.youtubeLink) {
    return (
      <>
        <div class="absolute z-[1] h-full w-full">
          <YoutubeIframe url={data.youtubeLink} />
        </div>

        {maybeOverlay}
      </>
    );
  }

  return null;
}
