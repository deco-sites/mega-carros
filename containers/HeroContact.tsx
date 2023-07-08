import { Section } from "$live/blocks/section.ts";
import LimitedDiv from "mc/components/LimitedDiv.tsx";
import YoutubeIframe from "mc/components/YoutubeIframe.tsx";
import { useLivePageContext } from "$live/pages/LivePage.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";

import type {
  HTML,
  Image as LiveImage,
} from "deco-sites/std/components/types.ts";

export interface Props {
  labels: {
    title?: HTML;
    descriptionLines?: string[];
  };
  flags: {
    /** @default true */
    showLabels: boolean;
    /** @default false */
    labelsOnRight: boolean;
    /** @default image */
    backgroundMode: "video" | "image";
  };
  background: {
    youtubeLink?: string;
    image: {
      mobile?: LiveImage;
      desktop?: LiveImage;
    };
  };
  formSlot: Section;
}

function HeroBackground(props: Props) {
  const { background, flags } = props;
  const lcp = false;

  if (flags.backgroundMode === "image") {
    return (
      <>
        <div class="absolute z-[1] h-full w-full">
          <Picture preload={lcp}>
            <Source
              width={375}
              media="(max-width: 767px)"
              src={background.image.mobile!}
              fetchPriority={lcp ? "high" : "auto"}
            />
            <Source
              width={1366}
              media="(min-width: 768px)"
              fetchPriority={lcp ? "high" : "auto"}
              src={background.image.desktop!}
            />
            <img
              alt="Formulário de Contato"
              src={background.image.mobile!}
              loading={lcp ? "eager" : "lazy"}
              class="object-cover w-full h-full"
              style={{ filter: "grayscale(80%)" }}
            />
          </Picture>
        </div>

        <div class="absolute w-full h-full bg-black bg-opacity-75 z-[2]" />
      </>
    );
  }

  if (background.youtubeLink) {
    return (
      <>
        <div class="absolute z-[1] h-full w-full">
          <YoutubeIframe url={background.youtubeLink} />
        </div>

        <div class="absolute w-full h-full bg-black bg-opacity-75 z-[2]" />
      </>
    );
  }

  return null;
}

function HeroContent(props: Props) {
  const { renderSection } = useLivePageContext();
  const { flags, labels, formSlot } = props;
  const { labelsOnRight, showLabels } = flags;

  const formFlagClass = labelsOnRight ? "mr-auto" : "ml-auto";
  const labelFlagClass = labelsOnRight ? "lg:flex-row-reverse" : "lg:flex-row";

  return (
    <LimitedDiv
      baseClass="relative z-10"
      class={`p-6 lg:p-12 flex flex-col lg:flex-row gap-12 ${labelFlagClass}`}
    >
      {showLabels && (
        <div class="flex flex-col flex-1 lg:pt-12">
          <h3
            class="text-3xl"
            dangerouslySetInnerHTML={{ __html: labels.title ?? "" }}
          />

          {labels.descriptionLines?.map((line) => (
            <p class="text-xl">
              {line}
            </p>
          ))}
        </div>
      )}

      <div class={`w-full lg:w-[400px] ${formFlagClass}`}>
        {renderSection(formSlot, 0)}
      </div>
    </LimitedDiv>
  );
}

export default function ContactForm(props: Props) {
  return (
    <div class="relative">
      <HeroBackground {...props} />
      <HeroContent {...props} />
    </div>
  );
}
