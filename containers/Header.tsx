import { useRef } from "preact/hooks";
import { asset } from "$fresh/runtime.ts";
import Icon from "mc/components/Icon.tsx";
import Button from "mc/components/Button.tsx";
import LimitedDiv from "mc/components/LimitedDiv.tsx";
import Drawer, { DrawerRef } from "mc/islands/Drawer.tsx";
import { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Link {
  label: string;
  href: string;
}

export interface Brand {
  label: string;
  image: LiveImage;
  href: string;
}

export interface Props {
  links: Link[];
  action: Link;
  brands: Brand[];
}

export default function Header(props: Props) {
  const { links, action, brands } = props;
  const drawerRef = useRef<DrawerRef>(null);
  const toggleDrawer = () => drawerRef?.current?.toggle();

  return (
    <LimitedDiv>
      <div class="flex flex-row h-24 items-center p-6">
        <a href="/">
          <img
            class="h-[29px] w-[120px]"
            alt="Mega Carros PCD"
            src={asset("/logo.png")}
          />
        </a>

        <div class="ml-auto flex flex-row gap-2">
          <div class="-mr-[24px] sm:mr-0 lg:hidden">
            <Button type="ghost" mode="secondary" action={toggleDrawer}>
              <Icon id="menu" size={24} />
            </Button>
          </div>

          <div class="hidden md:block">
            <Button as="a" action={action.href}>
              {action.label}
            </Button>
          </div>
        </div>
      </div>

      <ul class="hidden lg:flex p-6 pt-0 justify-between">
        {links.map((link) => (
          <li class="text-white hover:text-yellow-400">
            <a href={link.href} class="uppercase text-lg font-bold">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div class="h-20 border-t-2 border-gray-800 flex">
        <ul class="flex flex-1 flex-row items-center justify-between overflow-y-hidden scrollbar-none scroll-smooth">
          {brands.map((brand) => (
            <li class="flex justify-center items-center opacity-50 hover:opacity-100 transition-opacity">
              <a href={brand.href} class="h-full px-6 w-max">
                <img src={brand.image} height={40} alt={brand.label} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <Drawer size="280px" ref={drawerRef}>
        <ul class="flex flex-col gap-4">
          {links.map((link) => (
            <li class="text-black hover:text-gray-800">
              <a href={link.href} class="uppercase text-lg font-bold">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Drawer>
    </LimitedDiv>
  );
}
