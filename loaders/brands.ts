import { Brand } from "mc/types/types.ts";
import type { MCContext } from "mc/accounts/mc.ts";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

export default async function loader(
  _props: unknown,
  _req: Request,
  ctx: MCContext,
): Promise<Brand[]> {
  const { configMC } = ctx;
  const { api, token } = configMC ?? {};

  const endpoint = `${api}/brands?populate=logo&sort=order`;
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axiod.get(endpoint, { headers });

  // deno-lint-ignore no-explicit-any
  return response.data.data.map((d: any) => d.attributes);
}
