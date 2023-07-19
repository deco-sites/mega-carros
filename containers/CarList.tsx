import { Car } from "mc/types/types.ts";
import Button from "mc/components/Button.tsx";
import { toMoney } from "mc/helpers/number.tsx";
import { LoaderReturnType } from "$live/types.ts";
import CardGrid from "mc/components/CardGrid.tsx";
import CommonSection from "mc/components/CommonSection.tsx";
import type { Props as CardGridProps } from "mc/components/CardGrid.tsx";
import type { Props as CommonSectionProps } from "mc/components/CommonSection.tsx";

export interface Props {
  container: Omit<CommonSectionProps, "children" | "baseClass">;
  grid: Omit<CardGridProps, "children" | "class">;
  cars: LoaderReturnType<Car[]>;
  cardConfig: {
    cta: string;
    priceHelper?: string;
    showDescription: boolean;
  };
}

const Item = (config: Props["cardConfig"], car: Car, index: number) => {
  return (
    <div
      key={`${car.model}-${index}`}
      class="bg-gray-700 p-6 rounded-2xl flex flex-1 w-[220px] lg:w-[180px]"
    >
      <a
        href={`/${car.brand.data.attributes.slug}/${car.slug}`}
        class="flex flex-1 flex-col justify-center items-center"
      >
        <img
          height={90}
          alt={car.model}
          class="h-[90px] object-contain"
          src={car.avatar.data.attributes.url}
        />

        <span class="text-base font-medium mt-2 text-center">
          {car.model}
        </span>

        {config.showDescription && (
          <span class="text-base text-center">
            {car.version}
          </span>
        )}

        {config.priceHelper && config.priceHelper !== "" && (
          <span class="text-sm text-yellow-400 text-center">
            {config.priceHelper}
          </span>
        )}

        <span class="text-xl text-yellow-400 font-semibold text-center mb-auto">
          {toMoney(car.price)}
        </span>

        <div class="w-min mt-9">
          <Button mode="secondary" size="small">
            {config.cta}
          </Button>
        </div>
      </a>
    </div>
  );
};

export default function CarList(props: Props) {
  const { container, grid, cars, cardConfig: config } = props;

  if (!cars.length) {
    return null;
  }

  const mapCarsProxy = (car: Car, index: number) => Item(config, car, index);

  return (
    <CommonSection
      labels={container.labels}
      action={container.action}
      baseClass="py-12 lg:py-24 bg-black"
    >
      <CardGrid cols={grid.cols} class="py-12 scrollbar-none">
        {cars.map(mapCarsProxy)}
      </CardGrid>
    </CommonSection>
  );
}
