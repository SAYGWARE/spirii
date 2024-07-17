import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { routes } from "@/constants/routes";
import { useDragons } from "@/hooks/useDragons";
import { trpc } from "@/lib/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { startFightInput, StartFightInput } from "common";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Fight } from "server";

export const Home = () => {
    const dragons = useDragons();
    const { watch, setValue, handleSubmit } = useForm<StartFightInput>({
        resolver: zodResolver(startFightInput),
        defaultValues: {
            dragon1: "",
            dragon2: "",
        },
    })
    const [currentFight, setCurrentFight] = useState<Fight | undefined>(undefined);

    const dragon1 = dragons.find((dragon) => dragon.id.toString() === watch("dragon1"));
    const dragon2 = dragons.find((dragon) => dragon.id.toString() === watch("dragon2"));
    const winner = currentFight?.healths[0] === 0 ? dragon2 : currentFight?.healths[1] === 0 ? dragon1 : undefined;

    const startFight = trpc.startFight.useMutation();
    const nextRound = trpc.nextRound.useMutation();

    const onSubmit = async (data: StartFightInput) => {
        if (!currentFight) {
            const fight = await startFight.mutateAsync(data);
            setCurrentFight(fight);
        } else {
            const fight = await nextRound.mutateAsync({ fightId: currentFight.id });
            setCurrentFight(fight);
        }
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 md:gap-0 md:flex-row mx-4 md:mx-0 justify-center my-4 md:mb-0 md:mt-20">
            <div className="flex flex-col gap-6">
                <Select onValueChange={(value: string) => setValue("dragon1", value)} >
                    <SelectTrigger disabled={currentFight} className="md:w-80">
                        <SelectValue placeholder="Select dragon 1" />
                    </SelectTrigger>
                    <SelectContent>
                        {dragons.map((dragon) => <SelectItem value={dragon.id.toString()}>{dragon.name} ({dragon.strength})</SelectItem>)}
                    </SelectContent>
                </Select>

                <Card className={winner?.id === dragon1?.id ? "border-green-500" : ""}>
                    <CardHeader>
                        <CardTitle>{dragon1?.name || "Select dragon 1..."}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            <li><b>Strength:</b> {dragon1?.strength}</li>
                            <li><b>Size:</b> {dragon1?.size}</li>
                            <li><b>Type:</b> {dragon1?.type}</li>
                        </ul>
                    </CardContent>
                </Card>

                {
                    currentFight &&
                        <div className="flex flex-col text-center">
                            {currentFight.healths[0]}
                            <Progress value={currentFight.healths[0]} />
                        </div>
                }
            </div>

            <div className="mx-auto md:mx-10 my-auto w-32 flex justify-center">
                {
                    currentFight ? 
                        winner ?
                            <div className="text-center">
                                <h1 className="mb-2 font-bold">Dragon {winner.id === dragon1?.id ? 2 : 1} wins !</h1>
                                <Button onClick={() => setCurrentFight(undefined)} variant={"destructive"}>New Fight !</Button>
                            </div> 
                            :
                            <Button variant={"secondary"} disabled={nextRound.isLoading}>Next Round !</Button>
                        :
                        <Button disabled={!dragon1?.id || !dragon2?.id}>FIGHT !</Button>
                }
            </div>

            <div className="flex flex-col gap-6">
                <Select onValueChange={(value: string) => setValue("dragon2", value)} >
                    <SelectTrigger disabled={currentFight} className="md:w-80">
                        <SelectValue placeholder="Select dragon 2" />
                    </SelectTrigger>
                    <SelectContent>
                        {dragons.map((dragon) => <SelectItem value={dragon.id.toString()}>{dragon.name} ({dragon.strength})</SelectItem>)}
                    </SelectContent>
                </Select>

                <Card className={winner?.id === dragon2?.id ? "border-green-500" : ""}>
                    <CardHeader>
                        <CardTitle>{dragon2?.name || "Select dragon 2..."}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            <li><b>Strength:</b> {dragon2?.strength}</li>
                            <li><b>Size:</b> {dragon2?.size}</li>
                            <li><b>Type:</b> {dragon2?.type}</li>
                        </ul>
                    </CardContent>
                </Card>

                {
                    currentFight &&
                        <div className="flex flex-col text-center">
                            {currentFight.healths[1]}
                            <Progress value={currentFight.healths[1]} />
                        </div>
                }

                <Link className="ml-auto font-semibold" to={routes.history}>History</Link>
            </div>
        </form>
    );
};
