import { ComponentChildren } from "preact";

type AvailableComponents = "a" | "div";
type AvailableModes = "primary" | "secondary" | "tertiary";
type AvailableTypes = "regular" | "outline" | "ghost";
type AvailableSizes = "regular" | "small";

interface ButtonStateDef {
  color: string;
  backgroundColor: string;
}

interface ModeDefs {
  regular: ButtonStateDef;
  hover: ButtonStateDef;
  focus: ButtonStateDef;
  disabled: ButtonStateDef;
}

const PRIMARY_DEFS: ModeDefs = {
  regular: { color: "gray-800", backgroundColor: "yellow-400" },
  hover: { color: "gray-800", backgroundColor: "yellow-500" },
  focus: { color: "gray-800", backgroundColor: "yellow-600" },
  disabled: { color: "gray-600", backgroundColor: "gray-300" },
};

const SECONDARY_DEFS: ModeDefs = {
  regular: { color: "gray-800", backgroundColor: "white" },
  hover: { color: "gray-800", backgroundColor: "gray-200" },
  focus: { color: "gray-800", backgroundColor: "gray-400" },
  disabled: { color: "gray-600", backgroundColor: "gray-300" },
};

const TERTIARY_DEFS: ModeDefs = {
  regular: { color: "white", backgroundColor: "black" },
  hover: { color: "white", backgroundColor: "gray-900" },
  focus: { color: "white", backgroundColor: "gray-800" },
  disabled: { color: "white", backgroundColor: "gray-600" },
};

const DEFS: Record<AvailableModes, ModeDefs> = {
  primary: PRIMARY_DEFS,
  secondary: SECONDARY_DEFS,
  tertiary: TERTIARY_DEFS,
};

export function generateColorClassesByType(props: {
  def: ModeDefs;
  type: AvailableTypes;
}) {
  const { def, type } = props;
  const { regular, hover, focus } = def;

  // regular classes
  const regularTypeRegularState =
    `text-${regular.color} bg-${regular.backgroundColor}`;
  const regularTypeHoverState =
    `hover:(text-${hover.color} bg-${hover.backgroundColor})`;
  const regularTypeFocusState =
    `active:(text-${focus.color} bg-${focus.backgroundColor})`;
  const regularType =
    `${regularTypeRegularState} ${regularTypeHoverState} ${regularTypeFocusState}`;

  // outline classes
  const outlineTypeRegularState =
    `text-${regular.backgroundColor} border-2 border-${regular.backgroundColor}`;
  const outlineTypeHoverState =
    `hover:(text-${hover.backgroundColor} border-2 border-${hover.backgroundColor})`;
  const outlineTypeFocusState =
    `active:(text-${focus.backgroundColor} border-2 border-${focus.backgroundColor})`;
  const outlineType =
    `${outlineTypeRegularState} ${outlineTypeHoverState} ${outlineTypeFocusState}`;

  // outline classes
  const ghostTypeRegularState = `text-${regular.backgroundColor}`;
  const ghostTypeHoverState = `hover:(text-${hover.backgroundColor}`;
  const ghostTypeFocusState = `active:(text-${focus.backgroundColor}`;
  const ghostType =
    `${ghostTypeRegularState} ${ghostTypeHoverState} ${ghostTypeFocusState}`;

  const classesByType: Record<AvailableTypes, string> = {
    ghost: ghostType,
    outline: outlineType,
    regular: regularType,
  };

  return classesByType[type];
}

export function ButtonBase(props: {
  as: AvailableComponents;
  action?: string | (() => void);
  class: string;
  size: AvailableSizes;
  children: ComponentChildren;
}) {
  const { as, action, size, children, class: otherClasses } = props;

  const smallClasses = "h-[32px] py-[6px] px-[12px] text-sm";
  const regularClasses = "h-[48px] py-[12px] px-[24px] text-base";
  const sizeClasses = size === "regular" ? regularClasses : smallClasses;
  const textClasses = `font-medium  whitespace-nowrap`;
  const btnClasses = `rounded-[8px] flex items-center w-min`;

  if (as === "a") {
    return (
      <a
        href={action as string}
        class={`${sizeClasses} ${otherClasses} ${textClasses} ${btnClasses}`}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      onClick={action as (() => void)}
      class={`${sizeClasses} ${otherClasses} ${textClasses} ${btnClasses}`}
    >
      {children}
    </div>
  );
}

export function DisabledButton(props: {
  def: ModeDefs;
  type: AvailableTypes;
  size: AvailableSizes;
  children: ComponentChildren;
}) {
  const { size } = props;
  const { disabled } = props.def;
  const color = `text-${disabled.color}`;
  const bgColor = `bg-${disabled.backgroundColor}`;

  return (
    <ButtonBase
      as="div"
      size={size}
      action={undefined}
      class={`${color} ${bgColor} cursor-not-allowed`}
    >
      {props.children}
    </ButtonBase>
  );
}

export function ActiveButton(props: {
  as: AvailableComponents;
  action?: string | (() => void);
  def: ModeDefs;
  type: AvailableTypes;
  size: AvailableSizes;
  children: ComponentChildren;
}) {
  const { def, type, size, as, action } = props;
  const classes = generateColorClassesByType({ def, type });

  return (
    <ButtonBase
      as={as}
      size={size}
      action={action}
      class={`cursor-pointer ${classes}`}
    >
      {props.children}
    </ButtonBase>
  );
}

export default function Button(props: {
  as?: AvailableComponents;
  action?: string | (() => void);
  mode?: AvailableModes;
  type?: AvailableTypes;
  size?: AvailableSizes;
  children: ComponentChildren;
  disabled?: boolean;
}) {
  const {
    action,
    as = "div",
    mode = "primary",
    type = "regular",
    size = "regular",
  } = props;

  const ButtonComponent = props.disabled ? DisabledButton : ActiveButton;

  return (
    <ButtonComponent
      as={as}
      type={type}
      size={size}
      action={action}
      def={DEFS[mode]}
    >
      {props.children}
    </ButtonComponent>
  );
}
