import { Slider } from "@/components/ui/slider";

interface TimerSettingsProps {
  mode: "countdown" | "stopwatch" | "intervals" | "rounds";
  workTime: number;
  restTime: number;
  totalRounds: number;
  onWorkTimeChange: (value: number) => void;
  onRestTimeChange: (value: number) => void;
  onTotalRoundsChange: (value: number) => void;
  isRunning: boolean;
}

export const TimerSettings = ({
  mode,
  workTime,
  restTime,
  totalRounds,
  onWorkTimeChange,
  onRestTimeChange,
  onTotalRoundsChange,
  isRunning,
}: TimerSettingsProps) => {
  return (
    <div className="space-y-4">
      {mode === "countdown" && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Durée (secondes): {workTime}
          </label>
          <Slider
            defaultValue={[workTime]}
            max={300}
            step={5}
            onValueChange={(value) => onWorkTimeChange(value[0])}
            disabled={isRunning}
          />
        </div>
      )}

      {(mode === "intervals" || mode === "rounds") && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Temps de travail (secondes): {workTime}
            </label>
            <Slider
              defaultValue={[workTime]}
              max={300}
              step={5}
              onValueChange={(value) => onWorkTimeChange(value[0])}
              disabled={isRunning}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Temps de repos (secondes): {restTime}
            </label>
            <Slider
              defaultValue={[restTime]}
              max={120}
              step={5}
              onValueChange={(value) => onRestTimeChange(value[0])}
              disabled={isRunning}
            />
          </div>
        </>
      )}

      {mode === "rounds" && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Nombre de rounds: {totalRounds}
          </label>
          <Slider
            defaultValue={[totalRounds]}
            max={10}
            step={1}
            onValueChange={(value) => onTotalRoundsChange(value[0])}
            disabled={isRunning}
          />
        </div>
      )}
    </div>
  );
};