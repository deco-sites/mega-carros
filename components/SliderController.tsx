import Icon from "mc/components/Icon.tsx";

interface Props {
  buttonClass?: string;
  transparent?: boolean;
}

export default function SliderController(props: Props) {
  const { transparent, buttonClass = "" } = props;
  const colorClass = transparent ? "bg-transparent" : "bg-black";

  return (
    <div class="flex flex-row w-full justify-between">
      <div
        data-slide="prev"
        aria-label="Slide anterior"
        class={`w-12 h-12 cursor-pointer rounded-full ${buttonClass} ${colorClass} flex justify-center items-center`}
      >
        <Icon id="chevron-left" size={24} />
      </div>

      <div
        data-slide="next"
        aria-label="Próximo slide"
        class={`w-12 h-12 cursor-pointer rounded-full ${buttonClass} ${colorClass} flex justify-center items-center`}
      >
        <Icon id="chevron-right" size={24} />
      </div>
    </div>
  );
}
