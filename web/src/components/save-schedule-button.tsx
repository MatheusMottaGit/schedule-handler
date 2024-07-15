import { Save } from "lucide-react";
import Button from "./default/button";
import { toast } from "sonner";
import { Schedule } from "../types/schedule";

interface SaveScheduleButtonProps {
  completion: string;
}

function SaveScheduleButton({ completion }: SaveScheduleButtonProps) {
  function saveScheduleOnLocalStorage() {
    const scheduleData: Schedule = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      completion
    };

    const existingSchedules = JSON.parse(localStorage.getItem('schedules') || '[]') as Schedule[];

    const updatedSchedules = [...existingSchedules, scheduleData];

    localStorage.setItem('schedules', JSON.stringify(updatedSchedules));

    toast.success('Schedule saved!');
  }

  return (
    <Button size="small" skin="secondary" onClick={saveScheduleOnLocalStorage}>
      <Save className="size-4" />
    </Button>
  );
}

export default SaveScheduleButton;
