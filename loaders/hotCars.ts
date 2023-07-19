import { Car } from "mc/types/types.ts";
import type { MCContext } from "mc/accounts/mc.ts";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

export interface Props {
  sort?: string;
  limit?: string;
}

export default async function loader(
  props: Props,
  _req: Request,
  ctx: MCContext,
): Promise<Car[]> {
  const { configMC } = ctx;
  const { sort = "updatedAt", limit = "7" } = props;
  const { api, token } = configMC ?? {};

  const url = new URL(`${api}/cars`);
  url.searchParams.append("sort", sort);
  url.searchParams.append("pagination[limit]", limit);
  url.searchParams.append("populate[hero_media][populate]", "*");
  url.searchParams.append("populate[form_media][populate]", "*");
  url.searchParams.append("populate[images][populate]", "*");
  url.searchParams.append("populate[avatar][populate]", "*");
  url.searchParams.append("populate[brand][populate]", "*");
  url.searchParams.append("populate[related_cars][populate]", "*");

  const endpoint = url.toString();
  const headers = { Authorization: `Bearer ${token}` };
  const { data: responseData } = await axiod.get(endpoint, { headers });
  const { data } = responseData;

  // deno-lint-ignore no-explicit-any
  return data.map((d: any) => d.attributes);
}
