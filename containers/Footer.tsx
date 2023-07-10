import { Brand } from "mc/types/types.ts";
import { asset } from "$fresh/runtime.ts";
import { LoaderReturnType } from "$live/types.ts";
import LimitedDiv from "mc/components/LimitedDiv.tsx";
import Icon, { AvailableIcons } from "mc/components/Icon.tsx";

export interface Link {
  label: string;
  href: string;
}

export interface MediaLink {
  icon: AvailableIcons;
  href: string;
}

export interface Props {
  links: Link[];
  copyright: string;
  policyLinks: Link[];
  medias: MediaLink[];
  brands: LoaderReturnType<Brand[]>;
}

export default function Footer(props: Props) {
  const { links, copyright, policyLinks, brands, medias } = props;

  return (
    <LimitedDiv baseClass="border-t-2 border-yellow-500">
      <div class="px-6 py-12 flex gap-6 flex-col lg:flex-row justify-between">
        <a href="/">
          <img
            class="h-[29px] w-[120px]"
            alt="Mega Carros PCD"
            src={asset("/logo.png")}
          />
        </a>

        <div class="flex flex-col gap-6 lg:(flex-row gap-12)">
          <ul class="flex flex-col gap-2">
            <li class="uppercase font-bold text-sm mt-[4px]">marcas</li>
            {brands.map((brand) => (
              <li class="uppercase">
                <a href={brand.href} class="text-sm hover:underline">
                  {brand.label}
                </a>
              </li>
            ))}
          </ul>

          <ul class="flex flex-col gap-2">
            {links.map((link) => (
              <li class="uppercase font-bold">
                <a href={link.href} class="text-sm hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ul class="flex flex-row gap-6">
          {medias.map((media) => (
            <li class="opacity-50 hover:opacity-100 transition-opacity">
              <a href={media.href}>
                <Icon id={media.icon} size={24} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div class="border-t-2 border-gray-800 flex flex-col py-3 gap-3">
        <ul class="flex flex-col gap-3 lg:(flex-row gap-6) px-6">
          {policyLinks.map((link) => (
            <li class="text-gray-400">
              <a href={link.href} class="text-sm hover:underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p class="text-sm text-gray-400 px-6">{copyright}</p>
      </div>
    </LimitedDiv>
  );
}
