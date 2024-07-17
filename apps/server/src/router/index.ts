import { nextRoundInput, startFightInput } from "common";
import { dragons } from "../data/dragons";
import { t } from "../lib/trpc";
import { Fight } from "../types/fight";
import { readFights, writeFights } from "../utils/fights";
import { TRPCError } from "@trpc/server";

export const appRouter = t.router({
    getDragons: t.procedure.query(() => dragons),

    startFight: t.procedure.input(startFightInput).mutation(({ input }) => {
        const fights = readFights();
        const fight = {
            id: fights.length + 1,
            dragons: [input.dragon1, input.dragon2],
            healths: [100, 100],
            turn: 0,
        } satisfies Fight;

        fights.push(fight);
        writeFights(fights);
        return fight;
    }),

    nextRound: t.procedure.input(nextRoundInput).mutation(({ input }) => {
        const fights = readFights();
        const fight = fights.find((fight) => fight.id === input.fightId);

        if (!fight)
            throw new TRPCError({
                code: "NOT_FOUND",
            });

        const attacker = dragons.find((dragon) => dragon.id.toString() === fight.dragons[fight.turn]);

        const isCritic = Math.random() < 0.3; // 30% chance to crit

        fight.healths[1 - fight.turn] -= isCritic ? attacker!.strength * 2 : attacker!.strength;
        if (fight.healths[1 - fight.turn] <= 0) fight.healths[1 - fight.turn] = 0;

        fight.turn = 1 - fight.turn;

        writeFights(fights);
        return fight;
    }),

    getHistory: t.procedure.query(() => readFights()),
});

export type AppRouter = typeof appRouter;
