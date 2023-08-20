import Button from "mc/components/Button.tsx";
import { ServicePage } from "mc/types/types.ts";
import { Section } from "$live/blocks/section.ts";
import { LoaderReturnType } from "$live/types.ts";
import SEO from "deco-sites/std/sections/SEO.tsx";
import LimitedDiv from "mc/components/LimitedDiv.tsx";
import HeroContact from "mc/containers/HeroContact.tsx";
import type { Props as CarListProps } from "mc/containers/CarList.tsx";
import HeroBannerGenericSection from "mc/sections/HeroBannerGeneric.tsx";

export interface Props {
  /** @description use {{service}} to apply service title to page */
  pageTitle: string;
  formSlot: Section;
  servicePage: LoaderReturnType<ServicePage>;
}

const renderHeroBanner = (props: Props) => {
  const { servicePage, formSlot } = props;
  const { service } = servicePage;

  if (!service) {
    return null;
  }

  const heroProps = {
    labels: {
      title: service.name,
      description: "Preencha o formulário para facilitar seu atendimento",
    },
    flags: {
      labelsPosition: service.hero_config.labels_position,
    },
    background: {
      configs: {
        lcp: true,
        mode: service.hero_config.mode,
        efx: {
          useOverlay: service.hero_config.use_overlay,
          applyGrayscale: service.hero_config.grayscale,
        },
      },
      data: {
        youtubeLink: service.hero_video,
        image: {
          mobile: service.hero_media.data.attributes.formats?.small.url ??
            service.hero_media.data.attributes.url,
          desktop: service.hero_media.data.attributes.url,
        },
      },
    },
    formSlot,
  };

  return <HeroBannerGenericSection {...heroProps} />;
};

const renderHeroContact = (props: Props) => {
  const { servicePage, formSlot } = props;
  const { service } = servicePage;

  if (!service) {
    return null;
  }

  const heroProps = {
    formSlot,
    labels: {
      title: service.form_config.title,
      descriptionLines: [service.form_config.description],
    },
    flags: { showLabels: true, labelsOnRight: false },
    background: {
      configs: {
        mode: service.form_config.mode,
        lcp: false,
        efx: { useOverlay: true, applyGrayscale: true },
      },
      data: {
        youtubeLink: service.form_video,
        image: {
          mobile: service.form_media.data.attributes.formats?.small.url ??
            service.form_media.data.attributes.url,
          desktop: service.form_media.data.attributes.url,
        },
      },
    },
  };

  return <HeroContact {...heroProps} />;
};

const renderServiceDescription = (props: Props) => {
  const { servicePage } = props;
  const { service } = servicePage;

  if (!service) {
    return null;
  }

  return (
    <LimitedDiv baseClass="bg-gray-900" class="px-6 py-12 lg:px-0">
      <h1 class="font-bold text-3xl mb-3">{service.name}</h1>

      <p
        class="font-bold text-xl whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: service.description }}
      />

      <div class="w-min mt-12">
        <Button as="a" action="#hero-contact-form" mode="secondary">
          {service.cta}
        </Button>
      </div>
    </LimitedDiv>
  );
};

export default function ServicePageContainer(props: Props) {
  if (!props.servicePage.service) {
    return (
      <LimitedDiv baseClass="bg-white" class="py-12 text-black">
        <h1>Página não encontrada</h1>
        <a href="/" class="underline">Voltar</a>
      </LimitedDiv>
    );
  }

  const service = props.servicePage.service;

  return (
    <>
      <SEO
        description={service.description}
        image={service.form_media.data.attributes.url}
        title={props.pageTitle.replace("{{service}}", service.name)}
      />

      {renderHeroBanner(props)}
      {renderServiceDescription(props)}
      {renderHeroContact(props)}
    </>
  );
}
