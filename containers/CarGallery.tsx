import { Car } from "mc/types/types.ts";
import Gallery from "mc/components/Gallery.tsx";
import { LoaderReturnType } from "$live/types.ts";

export interface Props {
  car: LoaderReturnType<Car>;
}

const Slide = (picture: string, index: number) => {
  return (
    <img
      src={picture}
      alt={`Imagem #${index}`}
      class="w-full h-full object-cover"
      loading={index === 0 ? "lazy" : "eager"}
    />
  );
};

const Bullet = (picture: string, index: number) => {
  return (
    <div class="flex flex-1">
      <img
        src={picture}
        alt={`Imagem #${index}`}
        class="h-full w-full object-cover"
      />
    </div>
  );
};

export default function CarGallery(props: Props) {
  const { car } = props;
  const slides = car.pictures.map(Slide);
  const bullets = car.pictures.map(Bullet);

  return <Gallery slides={slides} bullets={bullets} />;
}
