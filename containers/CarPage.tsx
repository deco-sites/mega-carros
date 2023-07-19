import { CarPage } from "mc/types/types.ts";
import CarList from "mc/containers/CarList.tsx";
import { Section } from "$live/blocks/section.ts";
import { LoaderReturnType } from "$live/types.ts";
import DetailGrid from "mc/components/DetailGrid.tsx";
import CarGallery from "mc/containers/CarGallery.tsx";
import LimitedDiv from "mc/components/LimitedDiv.tsx";
import HeroContact from "mc/containers/HeroContact.tsx";
import YoutubeIframe from "mc/components/YoutubeIframe.tsx";
import HeroBannerCarSection from "mc/sections/HeroBannerCar.tsx";
import type { Props as CarListProps } from "mc/containers/CarList.tsx";

export interface Props {
  formSlot: Section;
  carPage: LoaderReturnType<CarPage>;
  carList: Omit<CarListProps, "cars">;
}

const renderHeroBanner = (props: Props) => {
  const { carPage, formSlot } = props;
  const { car } = carPage;

  if (!car) {
    return null;
  }

  const heroProps = {
    flags: {
      labelsPosition: car.hero_config.labels_position,
    },
    background: {
      configs: {
        lcp: true,
        mode: car.hero_config.mode,
        efx: {
          useOverlay: car.hero_config.use_overlay,
          applyGrayscale: car.hero_config.grayscale,
        },
      },
      data: {
        youtubeLink: car.hero_video,
        image: {
          mobile: car.hero_media.data.attributes.formats?.small.url ??
            car.hero_media.data.attributes.url,
          desktop: car.hero_media.data.attributes.url,
        },
      },
    },
    formSlot,
  };

  return <HeroBannerCarSection {...heroProps} car={car} />;
};

const renderCarDescription = (props: Props) => {
  const { car } = props.carPage;
  const brand = car?.brand.data.attributes.name;

  if (!car) {
    return null;
  }

  const title = `${brand} ${car.model} ${car.version}`;

  return (
    <LimitedDiv baseClass="bg-gray-900" class="px-6 py-12 lg:px-0">
      <h1 class="text-3xl">{title}</h1>

      <p class="text-xl mb-12">
        Confira todos os detalhes do {title}{" "}
        e solicite agora mesmo uma proposta que entraremos em contato com a
        melhor oferta para você.
      </p>

      <DetailGrid
        tabs={["Detalhes", "Itens de série"]}
        content={[car.specifications.details, car.specifications.items]}
      />
    </LimitedDiv>
  );
};

const renderVideo = (props: Props) => {
  if (!props.carPage.car?.hero_video || props.carPage.car.hero_video === "") {
    return null;
  }

  return (
    <div class="h-[420px]">
      <YoutubeIframe url={props.carPage.car.hero_video} />
    </div>
  );
};

const renderHeroContact = (props: Props) => {
  const { carPage, formSlot } = props;

  if (!carPage.car) {
    return null;
  }

  const heroProps = {
    formSlot,
    labels: {
      title: carPage.car.form_config.title,
      descriptionLines: [carPage.car.form_config.description],
    },
    flags: { showLabels: true, labelsOnRight: false },
    background: {
      configs: {
        mode: carPage.car.form_config.mode,
        lcp: false,
        efx: { useOverlay: true, applyGrayscale: true },
      },
      data: {
        youtubeLink: carPage.car.form_video,
        image: {
          mobile: carPage.car.form_media.data.attributes.formats?.small.url ??
            carPage.car.form_media.data.attributes.url,
          desktop: carPage.car.form_media.data.attributes.url,
        },
      },
    },
  };

  return <HeroContact {...heroProps} />;
};

const renderCarGrid = (props: Props) => {
  const { carPage, carList } = props;
  const { car } = carPage;

  if (!car?.related_cars?.data?.length) {
    return null;
  }

  const cars = car.related_cars.data.map((c) => c.attributes);
  return <CarList {...carList} cars={cars} />;
};

export default function CarPageContainer(props: Props) {
  if (!props.carPage.car) {
    return (
      <LimitedDiv baseClass="bg-white" class="py-12 text-black">
        <h1>Página não encontrada</h1>
        <a href="/" class="underline">Voltar</a>
      </LimitedDiv>
    );
  }

  return (
    <>
      {renderHeroBanner(props)}
      <CarGallery car={props.carPage.car} />
      {renderCarDescription(props)}
      {renderVideo(props)}
      {renderHeroContact(props)}
      {renderCarGrid(props)}
    </>
  );
}
