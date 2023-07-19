import { ComponentChildren } from "preact";
import { toMoney } from "mc/helpers/number.tsx";
import { Section } from "$live/blocks/section.ts";
import LimitedDiv from "mc/components/LimitedDiv.tsx";
import { useLivePageContext } from "$live/pages/LivePage.tsx";
import HeroBackground from "mc/components/HeroBackground.tsx";
import type { Props as BackgroundProps } from "mc/components/HeroBackground.tsx";

export interface Props {
  action?: string;
  labels: {
    title: string;
    description: string;
    priceFrom?: string;
    price?: string;
  };
  flags: {
    labelsPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  };
  helper?: ComponentChildren;
  background: BackgroundProps;
  formSlot: Section;
}

function Badge(props: Props) {
  const { labels, flags } = props;
  const { labelsPosition } = flags;

  const hasPriceFrom = labels.priceFrom && labels.priceFrom !== "";
  const hasPrice = labels.price && labels.price !== "";

  const getLabelClasses = () => {
    const size = "flex flex-col p-6 h-[min-content] w-full lg:w-[250px]";
    const details = "bg-gray-600 bg-opacity-80 rounded-t-2xl relative z-20";

    switch (labelsPosition) {
      case "top-left":
        return `${size} ${details} lg:rounded-tr-2xl lg:rounded-tl-none lg:rounded-br-2xl`;
      case "bottom-left":
        return `${size} ${details} lg:rounded-tr-2xl lg:rounded-tl-none lg:rounded-br-2xl`;
      case "top-right":
        return `${size} ${details} lg:rounded-tl-2xl lg:rounded-tr-none lg:rounded-bl-2xl`;
      case "bottom-right":
        return `${size} ${details} lg:rounded-tl-2xl lg:rounded-tr-none lg:rounded-bl-2xl`;
    }
  };

  if (!hasPriceFrom && !hasPrice) {
    return (
      <div class={getLabelClasses()}>
        <span class="flex items-center font-extrabold text-2xl">
          {labels.title}
        </span>

        <span class="flex items-start font-medium overflow-hidden text-lg">
          {labels.description}
        </span>
      </div>
    );
  }

  return (
    <div class={getLabelClasses()}>
      <span class="flex items-center font-medium text-2xl truncate">
        {labels.title}
      </span>

      <span class="flex items-start font-extrabold h-[4.2rem] overflow-hidden text-2xl">
        {labels.description}
      </span>

      {labels.priceFrom && labels.priceFrom != "" && (
        <span class="flex items-end text-base line-through text-gray-400 truncate">
          de {toMoney(Number(labels.priceFrom))}
        </span>
      )}

      {labels.price && labels.price !== "" && (
        <span class="flex items-center font-semibold text-2xl truncate">
          por{" "}
          <b class="text-yellow-500 ml-2">{toMoney(Number(labels.price))}</b>
        </span>
      )}
    </div>
  );
}

function HeroContent(props: Props) {
  const { renderSection } = useLivePageContext();

  const { flags, labels, formSlot, helper } = props;
  const { labelsPosition } = flags;

  const getContainerClasses = () => {
    switch (labelsPosition) {
      case "top-left":
        return "lg:flex-row";
      case "bottom-left":
        return "lg:flex-row lg:items-end";
      case "top-right":
        return "lg:flex-row-reverse";
      case "bottom-right":
        return "lg:flex-row-reverse lg:items-end";
    }
  };

  const getFormClasses = () => {
    const base = "rounded-b-2xl";

    switch (labelsPosition) {
      case "top-left":
        return `${base} lg:rounded-tr-none lg:rounded-tl-2xl`;
      case "bottom-left":
        return `${base} lg:rounded-t-2xl lg:rounded-br-none`;
      case "top-right":
        return `${base} lg:rounded-tl-none lg:rounded-tr-2xl`;
      case "bottom-right":
        return `${base} lg:rounded-t-2xl lg:rounded-bl-none`;
    }
  };

  return (
    <div class="relative z-10">
      {props.action && props.action !== "" && (
        <a
          href={props.action}
          class="w-full h-full absolute top-0 left-0 z-20"
        />
      )}

      <LimitedDiv
        baseClass="bg-gray-900 lg:bg-transparent"
        class="flex flex-col-reverse gap-3 lg:flex-col p-6 lg:py-12 lg:px-0 -mt-[287px] lg:mt-0"
      >
        <div class={`flex flex-col-reverse ${getContainerClasses()}`}>
          <div
            class={`relative z-20 w-full lg:w-[320px] overflow-hidden ${getFormClasses()}`}
          >
            {renderSection(formSlot, 0)}
          </div>

          <Badge {...props} />
        </div>

        {/* helper cps */}
        {!helper && <span class="block h-12 lg:hidden" />}
        {helper && <div class="h-12 relative z-20">{helper}</div>}
      </LimitedDiv>
    </div>
  );
}

export default function HeroBanner(props: Props) {
  return (
    <div class="relative h-auto">
      <div class="relative w-full h-[calc(100vh-230px)] lg:h-full lg:absolute">
        <HeroBackground {...props.background} />
      </div>

      <HeroContent {...props} />
    </div>
  );
}
