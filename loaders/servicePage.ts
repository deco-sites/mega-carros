import { ServicePage } from "mc/types/types.ts";
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
): Promise<ServicePage> {
  const { configMC } = ctx;
  const { api, token } = configMC ?? {};

  const url = new URL(`${api}/services`);
  url.searchParams.append("filters[slug][$eq]", props.slug);
  url.searchParams.append("populate[icon][populate]", "*");
  url.searchParams.append("populate[hero_media][populate]", "*");
  url.searchParams.append("populate[form_media][populate]", "*");

  const endpoint = url.toString();
  const headers = { Authorization: `Bearer ${token}` };
  const { data: responseData } = await axiod.get(endpoint, { headers });
  const { data } = responseData;

  return { service: data?.[0]?.attributes };
}
