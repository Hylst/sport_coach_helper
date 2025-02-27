import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export const TimerControls = ({ isRunning, isPaused, onToggle, onReset }: TimerControlsProps) => {
  return (
    <div className="flex justify-center gap-4">
      <Button
        size="lg"
        onClick={onToggle}
        className={isRunning && !isPaused ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary-dark"}
      >
        {isRunning && !isPaused ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </Button>
      <Button size="lg" variant="outline" onClick={onReset}>
        <RotateCcw className="w-6 h-6" />
      </Button>
    </div>
  );
};