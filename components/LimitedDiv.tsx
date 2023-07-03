import { ComponentChildren } from "preact";

export default function LimitedDiv(props: { children: ComponentChildren }) {
  return (
    <div class="flex w-full justify-center">
      <div class="max-w-[1140px] w-full">
        {props.children}
      </div>
    </div>
  );
}
