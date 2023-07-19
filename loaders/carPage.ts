import CarLoader from "mc/loaders/car.ts";
import { CarPage } from "mc/types/types.ts";
import type { MCContext } from "mc/accounts/mc.ts";
import type { RequestURLParam } from "deco-sites/std/functions/requestToParam.ts";

export interface Props {
  slug: RequestURLParam;
}

export default async function loader(
  props: Props,
  _req: Request,
  ctx: MCContext,
): Promise<CarPage> {
  return {
    car: await CarLoader(props, _req, ctx),
  };
}
