import OriginalIMask from "npm:imask@6.6.2";

const IMask = OriginalIMask as unknown as (
  element: HTMLInputElement,
  config: { mask: string | { mask: string }[] },
) => void;

export default IMask;
