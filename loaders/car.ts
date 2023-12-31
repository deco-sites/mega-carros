import { Car } from "mc/types/types.ts";
import type { MCContext } from "mc/accounts/mc.ts";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

export interface Props {
  slug: string;
}

export default async function loader(
  props: Props,
  _req: Request,
  ctx: MCContext,
): Promise<Car | null> {
  const { slug } = props;
  const { configMC } = ctx;
  const { api, token } = configMC ?? {};

  const url = new URL(`${api}/cars`);
  url.searchParams.append("filters[slug][$eq]", slug);
  url.searchParams.append("populate[hero_media][populate]", "*");
  url.searchParams.append("populate[form_media][populate]", "*");
  url.searchParams.append("populate[images][populate]", "*");
  url.searchParams.append("populate[avatar][populate]", "*");
  url.searchParams.append("populate[brand][populate]", "*");
  url.searchParams.append("populate[related_cars][populate]", "*");

  const endpoint = url.toString();
  const headers = { Authorization: `Bearer ${token}` };
  const { data: responseData } = await axiod.get(endpoint, { headers });
  const { data, meta } = responseData;

  if (meta.pagination.total === 0) return null;
  return data[0].attributes;
}
