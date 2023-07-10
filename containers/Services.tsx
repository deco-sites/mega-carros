import { Service } from "mc/types/types.ts";
import Button from "mc/components/Button.tsx";
import { LoaderReturnType } from "$live/types.ts";
import CardGrid from "mc/components/CardGrid.tsx";
import CommonSection from "mc/components/CommonSection.tsx";
import type { Props as CardGridProps } from "mc/components/CardGrid.tsx";
import type { Props as CommonSectionProps } from "mc/components/CommonSection.tsx";

export interface Props {
  container: Omit<CommonSectionProps, "children" | "baseClass">;
  grid: Omit<CardGridProps, "children" | "class">;
  services: LoaderReturnType<Service[]>;
}

const Item = (service: Service, index: number) => {
  return (
    <div
      key={`${service.name}-${index}`}
      class="bg-black p-6 rounded-2xl flex flex-1 w-[180px] flex-col justify-center items-center"
    >
      <img
        height={36}
        class="h-[36px]"
        alt={service.name}
        src={service.icon}
      />

      <span class="text-base font-medium mt-2 mb-auto text-center">
        {service.name}
      </span>

      <div class="w-min mt-6">
        <Button mode="secondary" size="small">
          Ver mais
        </Button>
      </div>
    </div>
  );
};

export default function Services(props: Props) {
  const { container, grid, services } = props;
  const { labels, action } = container;

  return (
    <CommonSection
      labels={labels}
      action={action}
      baseClass="py-12 lg:py-24 bg-gray-900"
    >
      <CardGrid cols={grid.cols} class="py-12 scrollbar-none">
        {services.map(Item)}
      </CardGrid>
    </CommonSection>
  );
}