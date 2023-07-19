import { useSignal } from "@preact/signals";

export interface Props {
  tabs: string[];
  content: Record<string, string>[];
}

export default function DetailGrid(props: Props) {
  const activeIndex = useSignal(0);
  const activeContent = props.content[activeIndex.value];
  const activeKeys = Object.keys(activeContent);

  return (
    <div class="rounded-2xl bg-gray-800">
      <ul class="flex flex-row border-b-2 border-gray-600 relative">
        {props.tabs.map((tab, index) => {
          const isActive = index === activeIndex.value;
          const activeBorder = "border-b-2 border-yellow-500";
          const inactiveBorder = "border-b-2 border-gray-600";
          const borderClass = isActive ? activeBorder : inactiveBorder;

          const pillClass = "rounded-full py-1 px-3 cursor-pointer";
          const pillActive = "bg-yellow-500 text-black";
          const pillInactive = "bg-gray-600 text-white";
          const pillAccent = isActive ? pillActive : pillInactive;

          const click = () => activeIndex.value = index;

          return (
            <li class={`${borderClass} -mb-[2px]`}>
              <div class="h-full w-min whitespace-nowrap p-3">
                <div onClick={click} class={`${pillClass} ${pillAccent}`}>
                  {tab}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <ul class="p-6 flex flex-col gap-3">
        {activeKeys.map((key) => {
          return (
            <li class="flex flex-row gap-1 text-gray-400">
              <span class="font-bold">{key}:</span>
              <span>{activeContent[key]}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
