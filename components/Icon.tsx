import type { JSX } from "preact";
import { asset } from "$fresh/runtime.ts";

export type AvailableIcons =
  | "search"
  | "x-circle"
  | "chevrons-left"
  | "chevrons-right"
  | "chevron-left"
  | "chevron-right"
  | "play-circle"
  | "acessorios"
  | "financiamento"
  | "blindagem"
  | "estetica"
  | "seguro"
  | "pelicula-seguranca";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, size, width, height, ...otherProps }: Props,
) {
  return (
    <svg {...otherProps} width={width ?? size} height={height ?? size}>
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
