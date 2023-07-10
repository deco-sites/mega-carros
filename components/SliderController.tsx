import Icon from "mc/components/Icon.tsx";

export default function SliderController() {
  return (
    <div class="flex flex-row w-full justify-between">
      <div
        data-slide="prev"
        aria-label="Slide anterior"
        class="w-12 h-12 cursor-pointer rounded-full bg-black flex justify-center items-center"
      >
        <Icon id="chevron-left" size={24} />
      </div>

      <div
        data-slide="next"
        aria-label="Próximo slide"
        class="w-12 h-12 cursor-pointer rounded-full bg-black flex justify-center items-center"
      >
        <Icon id="chevron-right" size={24} />
      </div>
    </div>
  );
}
