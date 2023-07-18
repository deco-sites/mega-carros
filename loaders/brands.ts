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

  const endpoint = `${api}/brands?populate=logo`;
  const headers = { Authorization: `Bearer ${token}` };

  const response = await axiod.get(endpoint, { headers });

  // deno-lint-ignore no-explicit-any
  const formatedResponse: Brand[] = response.data.data.map((item: any) => ({
    ...item.attributes,
    logo: item.attributes.logo.data.attributes.url,
  }));

  return formatedResponse;
}
