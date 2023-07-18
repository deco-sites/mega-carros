import type { Manifest } from "mc/live.gen.ts";
import type { FnContext } from "$live/types.ts";
import type { Account as AccountBlock } from "$live/blocks/account.ts";

export interface MCAccount extends AccountBlock {
  api: string;
  token: string;
}

export type MCContext = FnContext<{ configMC?: MCAccount }, Manifest>;

function account(acc: MCAccount) {
  return acc;
}

export default account;
