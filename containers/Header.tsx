import { useId } from "preact/hooks";
import { useRef } from "preact/hooks";
import { Brand } from "mc/types/types.ts";
import { asset } from "$fresh/runtime.ts";
import Icon from "mc/components/Icon.tsx";
import Button from "mc/components/Button.tsx";
import { Slider } from "mc/components/Slider.tsx";
import { LoaderReturnType } from "$live/types.ts";
import LimitedDiv from "mc/components/LimitedDiv.tsx";
import Drawer, { DrawerRef } from "mc/islands/Drawer.tsx";

import SliderControllerJS from "mc/islands/SliderJS.tsx";
import SliderController from "mc/components/SliderController.tsx";

export interface Link {
  label: string;
  href: string;
}

export interface Props {
  links: Link[];
  action: Link;
  brands: LoaderReturnType<Brand[]>;
}

export default function Header(props: Props) {
  const { links, action, brands } = props;
  const drawerRef = useRef<DrawerRef>(null);
  const toggleDrawer = () => drawerRef?.current?.toggle();
  const url = window?.location?.href ? new URL(window?.location?.href) : null;

  const randomFragment = Math.floor(Math.random() * 100);
  const id = randomFragment + useId();

  return (
    <LimitedDiv>
      <div class="flex flex-row h-24 items-center p-6">
        <a href="/">
          <img
            alt="Mega Carros PCD"
            class="h-[29px] w-[120px]"
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
        {links.map((link) => {
          const isActive = url?.pathname === link.href;
          const activeColor = "text-yellow-400";
          const inactiveColor = "text-white";
          const colorClass = isActive ? activeColor : inactiveColor;

          return (
            <li class={`${colorClass} hover:text-yellow-400`}>
              <a href={link.href} class="uppercase text-lg font-bold">
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>

      <div id={id} class="relative h-20 border-t-2 border-gray-800 flex">
        <Slider
          snap="scroll-snap-start flex"
          class="scrollbar-none gap-6 lg:w-[calc(100%+96px)] lg:-mx-12 relative z-20"
        >
          {brands.map((brand, index) => {
            const isFirst = index === 0;
            const isLast = index === (brands.length - 1);
            const first = isFirst ? "lg:ml-12" : "";
            const last = isLast ? "lg:mr-12" : "";

            const brandURL = `/${brand.slug}`;
            const isActive = url?.pathname === brandURL;

            // classes
            const baseClass = `${first} ${last} flex h-full`;
            const opacity = "opacity-50 hover:opacity-100 transition-opacity";
            const activeBorder = "border-yellow-500 border-b-2";
            const inactiveBorder = "border-transparent border-b-2";
            const opacityClass = isActive ? "" : opacity;
            const borderClass = isActive ? activeBorder : inactiveBorder;

            return (
              <li class={`${baseClass} ${opacityClass} ${borderClass}`}>
                <a
                  href={brandURL}
                  class="h-full px-6 w-max flex justify-center items-center"
                >
                  <img
                    height={40}
                    alt={brand.name}
                    class="object-cover h-[40px]"
                    src={brand.logo.data.attributes.url}
                  />
                </a>
              </li>
            );
          })}
        </Slider>

        <div class="hidden h-full lg:flex absolute w-[calc(100%+96px)] -mx-12 items-center">
          <SliderController transparent={true} buttonClass="z-30" />
        </div>

        <span class="hidden lg:block w-12 h-full bg-gradient-to-r from-black absolute top-0 -left-12 z-10" />
        <span class="hidden lg:block w-12 h-full bg-gradient-to-l from-black absolute top-0 -right-12 z-10" />

        <SliderControllerJS rootId={id} />
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
