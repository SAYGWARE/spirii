import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader"
import { routes } from "@/constants/routes";
import { useDragons } from "@/hooks/useDragons";
import { trpc } from "@/lib/trpc"
import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";

export const History = () => {
  const { data: history, isLoading } = trpc.getHistory.useQuery()
  const dragons = useDragons()
  
  if (isLoading) return <Loader />;
  return (
      <div className="flex justify-center">
        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
            <CardDescription>Total {history?.length} fights.</CardDescription>
            <Link className="text-sm" to={routes.home}>Go back</Link>
          </CardHeader>

          <CardContent>
              {history?.map((fight, index) => {
                const dragon1 = dragons.find((dragon) => dragon.id.toString() === fight.dragons[0]);
                const dragon2 = dragons.find((dragon) => dragon.id.toString() === fight.dragons[1]);

                const winner = fight.healths[0] === 0 ? dragon2 : fight.healths[1] === 0 ? dragon1 : undefined;
                
                return (
                    <div
                      key={index}
                      className="flex gap-4"
                    >
                      <span className={cn("flex h-2 w-2 translate-y-1 rounded-full", winner?.id === dragon1?.id && "bg-green-500")} />
                      <p>{dragon1?.name} ({fight.healths[0]})</p>
                      <b>-</b>
                      <p>{dragon2?.name} ({fight.healths[1]})</p>
                      <span className={cn("flex h-2 w-2 translate-y-1 rounded-full", winner?.id === dragon2?.id && "bg-green-500")} />
                    </div>
                )})
              }
          </CardContent>
        </Card>
      </div>
  )
}
