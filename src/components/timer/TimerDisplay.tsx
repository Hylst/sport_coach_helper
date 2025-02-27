import { formatTime } from "@/lib/utils";

interface TimerDisplayProps {
  time: number;
  currentRound?: number;
  totalRounds?: number;
  isResting?: boolean;
  mode: "countdown" | "stopwatch" | "intervals" | "rounds";
}

export const TimerDisplay = ({ time, currentRound, totalRounds, isResting, mode }: TimerDisplayProps) => {
  return (
    <div className="text-center">
      <div className="text-8xl font-mono mb-4">{formatTime(time)}</div>
      
      {mode === "rounds" && (
        <div className="text-xl mb-4">
          Round {currentRound}/{totalRounds}
          {isResting && " - Repos"}
        </div>
      )}

      {mode === "intervals" && (
        <div className="text-xl mb-4">
          {isResting ? "Repos" : "Travail"}
        </div>
      )}
    </div>
  );
};