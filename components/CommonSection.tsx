import { ComponentChildren } from "preact";
import Button from "mc/components/Button.tsx";
import LimitedDiv from "mc/components/LimitedDiv.tsx";
import type { AvailableModes, AvailableTypes } from "mc/components/Button.tsx";

export interface ActionProps {
  label?: string;
  href?: string;
  type?: AvailableTypes;
  mode?: AvailableModes;
}

export interface LabelProps {
  title?: string;
  subtitle?: string;
  align?: "center" | "left" | "right";
}

export interface Props {
  baseClass?: string;
  labels?: LabelProps;
  action?: ActionProps;
  children: ComponentChildren;
}

export default function CommonSection(props: Props) {
  const { labels, action, children, baseClass = "" } = props;

  const getLabelsClasses = () => {
    const base = "flex flex-col w-full items-center px-6 lg:px-0";

    switch (labels?.align) {
      case "center":
        return `${base}`;
      case "right":
        return `${base} lg:items-end`;
      default:
        return `${base} lg:items-start`;
    }
  };

  return (
    <LimitedDiv
      baseClass={baseClass}
      class="flex flex-col justify-center items-center"
    >
      <div class={getLabelsClasses()}>
        <h3 class="w-min text-3xl whitespace-nowrap">{labels?.title}</h3>
        <h4 class="w-min text-xl whitespace-nowrap">{labels?.subtitle}</h4>
      </div>

      {children}

      {Boolean(action?.label) && Boolean(action?.href) && (
        <div class="w-min px-6 lg:px-0">
          <Button
            as="a"
            mode={action?.mode}
            type={action?.type}
            action={action?.href}
          >
            {action?.label}
          </Button>
        </div>
      )}
    </LimitedDiv>
  );
}
