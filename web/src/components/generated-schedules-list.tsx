import { useEffect, useState } from "react";
import { Schedule } from "../types/schedule";
import { CircleAlert } from "lucide-react";

function GeneratedSchedulesList() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  function getStoragedSchedules() {
    const storaged = localStorage.getItem("schedules");

    if (!storaged) return;

    setSchedules(JSON.parse(storaged));
  }

  useEffect(() => {
    getStoragedSchedules();
  }, []);

  return (
    <div className="max-h-[423px] overflow-y-auto">
      {schedules.length > 0 ? (
        schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="bg-zinc-900/40 p-2 border border-zinc-700 rounded-lg"
          >
            <p className="text-zinc-200 text-sm">
              {schedule.completion.substring(0, 57).concat("...")}
            </p>
          </div>
        ))
      ) : (
        <div className="p-3 bg-zinc-950 flex items-center gap-2 opacity-80 text-sm text-zinc-700 border-dashed border-2 border-zinc-700 rounded-lg">
          <CircleAlert className="size-5" />
          <p className="font-medium">No schedules found.</p>
        </div>
      )}
    </div>
  );
}

export default GeneratedSchedulesList;
