// deno-lint-ignore no-explicit-any
const IMask = (window as any).IMask as unknown as (
  element: HTMLInputElement,
  config: { mask: string | { mask: string }[] },
) => void;

export default IMask;
