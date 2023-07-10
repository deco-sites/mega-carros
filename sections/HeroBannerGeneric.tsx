import HeroBanner from "mc/containers/HeroBanner.tsx";
import type { Props as HeroBannerProps } from "mc/containers/HeroBanner.tsx";

export type Props = {
  labels: {
    title: string;
    description: string;
  };
} & Omit<HeroBannerProps, "labels" | "helper">;

export default function HeroBannerGenericSection(props: Props) {
  return <HeroBanner {...props} />;
}
