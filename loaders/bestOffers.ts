import { Car } from "mc/types/types.ts";
import type { MCContext } from "mc/accounts/mc.ts";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

export default async function loader(
  _props: unknown,
  _req: Request,
  ctx: MCContext,
): Promise<Car[]> {
  const { configMC } = ctx;
  const { api, token } = configMC ?? {};

  const url = new URL(`${api}/best-offers`);
  url.searchParams.append("populate[cars][populate]", "*");

  const endpoint = url.toString();
  const headers = { Authorization: `Bearer ${token}` };
  const { data: responseData } = await axiod.get(endpoint, { headers });
  const { data } = responseData;

  // deno-lint-ignore no-explicit-any
  return data.attributes.cars.data.map((d: any) => d.attributes);
}
