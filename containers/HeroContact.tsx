import { Section } from "$live/blocks/section.ts";
import LimitedDiv from "mc/components/LimitedDiv.tsx";
import HeroBackground from "mc/components/HeroBackground.tsx";
import { useLivePageContext } from "$live/pages/LivePage.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";
import type { Props as BackgroundProps } from "mc/components/HeroBackground.tsx";

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
  };
  background: BackgroundProps;
  formSlot: Section;
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

      <div
        class={`w-full lg:w-[400px] rounded-2xl overflow-hidden ${formFlagClass}`}
      >
        {renderSection(formSlot, 0)}
      </div>
    </LimitedDiv>
  );
}

export default function HeroContact(props: Props) {
  return (
    <div class="relative">
      <HeroBackground {...props.background} />
      <HeroContent {...props} />
    </div>
  );
}
