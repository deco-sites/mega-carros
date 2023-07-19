import { BrandPage } from "mc/types/types.ts";
import type { MCContext } from "mc/accounts/mc.ts";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import type { RequestURLParam } from "deco-sites/std/functions/requestToParam.ts";

export interface Props {
  slug: RequestURLParam;
}

export default async function loader(
  props: Props,
  _req: Request,
  ctx: MCContext,
): Promise<BrandPage> {
  const [brand, cars] = await Promise.all([
    getBrandData(props, ctx),
    getRelatedCars(props, ctx),
  ]);

  return { brand, cars };
}

const getBrandData = async (
  props: Props,
  ctx: MCContext,
): Promise<BrandPage["brand"]> => {
  const { configMC } = ctx;
  const { api, token } = configMC ?? {};

  const url = new URL(`${api}/brands`);
  url.searchParams.append("filters[slug][$eq]", props.slug);
  url.searchParams.append("populate[logo][populate]", "*");
  url.searchParams.append("populate[form_media][populate]", "*");
  url.searchParams.append("populate[best_cars][populate]", "*");
  url.searchParams.append("populate[highlighted_offer][populate]", "*");

  const endpoint = url.toString();
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axiod.get(endpoint, { headers });

  return response.data.data?.[0]?.attributes;
};

const getRelatedCars = async (
  props: Props,
  ctx: MCContext,
): Promise<BrandPage["cars"]> => {
  const { configMC } = ctx;
  const { api, token } = configMC ?? {};

  const url = new URL(`${api}/cars`);
  url.searchParams.append("filters[brand][slug][$eq]", props.slug);
  url.searchParams.append("populate", "*");

  const endpoint = url.toString();
  const headers = { Authorization: `Bearer ${token}` };
  const { data: responseData } = await axiod.get(endpoint, { headers });
  const { data } = responseData;

  // deno-lint-ignore no-explicit-any
  return data.map((d: any) => d.attributes);
};
