import { Car } from "mc/types/types.ts";
import Button from "mc/components/Button.tsx";
import { toMoney } from "mc/helpers/number.tsx";
import Gallery from "mc/components/Gallery.tsx";
import { LoaderReturnType } from "$live/types.ts";

export interface Props {
  title: string;
  cars: LoaderReturnType<Car[]>;
  slide: {
    cta: string;
    priceHelper: string;
  };
}

const Slide = (config: Props["slide"], car: Car, index: number) => {
  return (
    <div class="relative flex w-full h-full">
      <div class="block absolute top-0 left-0 z-0 w-full h-full">
        <img
          alt={car.model}
          src={car.hero_media.data.attributes.url}
          loading={index === 0 ? "lazy" : "eager"}
          class="w-full h-full object-cover rounded-tl-3xl rounded-bl-3xl"
        />
      </div>

      <div class="block absolute top-0 left-0 z-10 w-full h-full bg-gradient-to-r from-gray-900" />

      <div class="absolute top-0 left-0 h-full flex flex-col p-12 justify-center z-20">
        <span class="mb-3 text-3xl font-bold">
          {car.model}
        </span>

        <span class="text-lg">
          {car.version}
        </span>

        <span class="mb-6 text-lg">
          {config.priceHelper}
          <span class="ml-1 text-yellow-400 font-bold">
            {toMoney(car.price)}
          </span>
        </span>

        <div class="w-min">
          <Button
            as="a"
            action={`/${car.brand.data.attributes.slug}/${car.slug}`}
          >
            {config.cta}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Bullet = (car: Car) => {
  return (
    <div class="bg-gray-800 flex flex-1 flex-col justify-center items-center gap-2">
      <span class="text-sm font-bold">
        {car.model}
      </span>

      <img
        height={65}
        alt={car.model}
        class="h-[65px]"
        src={car.avatar.data.attributes.url}
      />
    </div>
  );
};

export default function CarsGallery(props: Props) {
  const { title, cars, slide } = props;
  const mapSlide = (car: Car, index: number) => Slide(slide, car, index);

  const slides = cars.map(mapSlide);
  const bullets = cars.map(Bullet);

  return <Gallery title={title} slides={slides} bullets={bullets} />;
}
