import Button from "mc/components/Button.tsx";
import { BrandPage } from "mc/types/types.ts";
import { toMoney } from "mc/helpers/number.tsx";
import CarList from "mc/containers/CarList.tsx";
import { Section } from "$live/blocks/section.ts";
import { LoaderReturnType } from "$live/types.ts";
import SEO from "deco-sites/std/sections/SEO.tsx";
import LimitedDiv from "mc/components/LimitedDiv.tsx";
import HeroContact from "mc/containers/HeroContact.tsx";
import type { Props as CarListProps } from "mc/containers/CarList.tsx";
import HeroBannerSliderCarSection from "mc/sections/HeroBannerCarSlider.tsx";

export interface Props {
  formSlot: Section;
  /** @description use {{brand}} to apply service title to page */
  pageTitle: string;
  carList: Omit<CarListProps, "cars">;
  brandPage: LoaderReturnType<BrandPage>;
}

const renderHeroBannerCarSlider = (props: Props) => {
  const { brandPage, formSlot } = props;
  const { brand } = brandPage;

  const slides = brand.best_cars.data.map((car, index) => ({
    car: car.attributes,
    lcp: index === 0,
  }));

  return <HeroBannerSliderCarSection banners={slides} formSlot={formSlot} />;
};

const renderBrandDescription = (props: Props) => {
  const { brand } = props.brandPage;
  const car = brand.highlighted_offer.data.attributes;

  return (
    <LimitedDiv baseClass="bg-gray-900" class="px-6 py-12 lg:px-0">
      <h1 class="text-3xl">{brand.name}</h1>
      <p class="text-xl">{brand.description}</p>

      <div class="mt-12 flex flex-col lg:flex-row gap-6">
        <div class="flex justify-center items-center w-full lg:w-[250px] bg-black rounded-2xl py-6">
          <img
            height={100}
            alt={brand.name}
            class="w-[100px] object-contain"
            src={brand.logo.data.attributes.url}
          />
        </div>

        <div class="flex flex-col flex-1 w-full p-6 bg-white rounded-2xl gap-3">
          <span class="text-gray-400 uppercase font-semibold text-xs">
            Ofertas em destaque
          </span>

          <div class="flex flex-col lg:flex-row">
            <img
              height={140}
              class="h-[140px] object-contain"
              src={car.avatar.data.attributes.url}
            />

            <div class="flex w-full flex-col gap-2 text-gray-900 justify-center items-center">
              <p class="text-2xl font-bold">{car.model}</p>
              <p class="text-xl">Versão {car.version}</p>
              <p class="text-3xl font-semibold">por {toMoney(car.price)}</p>

              <div class="w-min">
                <Button
                  as="a"
                  size="small"
                  action={`/${car.brand.data.attributes.slug}/${car.slug}`}
                >
                  Ver oferta
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LimitedDiv>
  );
};

const renderHeroContact = (props: Props) => {
  const { brandPage, formSlot } = props;

  const heroProps = {
    formSlot,
    labels: {
      title: brandPage.brand.form_config.title,
      descriptionLines: [brandPage.brand.form_config.description],
    },
    flags: { showLabels: true, labelsOnRight: false },
    background: {
      configs: {
        mode: brandPage.brand.form_config.mode,
        lcp: false,
        efx: { useOverlay: true, applyGrayscale: true },
      },
      data: {
        youtubeLink: brandPage.brand.form_video,
        image: {
          mobile:
            brandPage.brand.form_media.data.attributes.formats?.small.url ??
              brandPage.brand.form_media.data.attributes.url,
          desktop: brandPage.brand.form_media.data.attributes.url,
        },
      },
    },
  };

  return <HeroContact {...heroProps} />;
};

export default function BrandPage(props: Props) {
  if (!props.brandPage.brand) {
    return (
      <LimitedDiv class="py-12">
        <h1>Página não encontrada</h1>
        <a href="/" class="underline">Voltar</a>
      </LimitedDiv>
    );
  }

  const brand = props.brandPage.brand;

  return (
    <>
      <SEO
        description={brand.description}
        image={brand.form_media.data.attributes.url}
        title={props.pageTitle.replace("{{brand}}", brand.name)}
      />

      {renderHeroBannerCarSlider(props)}
      {renderBrandDescription(props)}
      <CarList {...props.carList} cars={props.brandPage.cars} />
      {renderHeroContact(props)}
    </>
  );
}
