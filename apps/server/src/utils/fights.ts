import { Fight } from "../types/fight";
import fs from "fs";

export const readFights = () => JSON.parse(fs.readFileSync("db/fights.json", "utf-8")) as Fight[];

export const writeFights = (fights: Fight[]) => fs.writeFileSync("db/fights.json", JSON.stringify(fights, null, 2));
