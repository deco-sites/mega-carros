import { Children } from "preact/compat";
import type { JSX } from "preact";

type SliderProps = Omit<JSX.IntrinsicElements["ul"], "disabled"> & {
  snap?: string;
  disabled?: "mobile-only" | "all";
};

export function Slider({
  children,
  disabled,
  snap = "scroll-snap-center",
  class: _class = "gap-6 scrollbar-none",
  ...props
}: SliderProps) {
  const getClasses = () => {
    if (disabled === "all") {
      return _class;
    }

    if (disabled === "mobile-only") {
      const base = "lg:flex lg:flex-row";
      const scroll =
        "lg:overflow-x-auto lg:overscroll-x-contain lg:snap-x lg:snap-mandatory";

      return `${base} ${scroll} ${_class}`;
    }

    const base = "flex flex-row";
    const scroll = "overflow-x-auto overscroll-x-contain snap-x snap-mandatory";
    return `${base} ${scroll} ${_class}`;
  };

  return (
    <ul data-slider class={getClasses()} {...props}>
      {Children.map(children, (child, index) => (
        <li
          class={snap}
          data-slider-item={index}
        >
          {child}
        </li>
      ))}
    </ul>
  );
}
