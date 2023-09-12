import { ContactHandler } from "mc/types/types.ts";
import type { MCContext } from "mc/accounts/mc.ts";

export default function loader(
  _props: unknown,
  _req: Request,
  ctx: MCContext,
): ContactHandler {
  const { configMC } = ctx;
  const { api, token } = configMC ?? {};
  return { api: api!, token: token! };
}
