import { z } from "zod";

export const startFightInput = z.object({
  dragon1: z.string(),
  dragon2: z.string(),
});

export type StartFightInput = z.infer<typeof startFightInput>;

export const nextRoundInput = z.object({
  fightId: z.number(),
});
