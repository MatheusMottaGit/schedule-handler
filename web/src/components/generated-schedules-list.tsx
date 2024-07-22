import { useEffect, useState } from "react";
import { Schedule } from "../types/schedule";
import { CircleAlert, Replace, Text } from "lucide-react";
import Button from "./default/button";

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
    <div className="max-h-[423px] space-y-3 overflow-y-auto">
      {schedules.length > 0 ? (
        schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="bg-slate-900/40 p-2 border border-slate-700 rounded-lg flex items-center justify-between"
          >
            <p className="text-slate-200 text-sm">
              {schedule.completion.substring(0, 50).concat("...")}
            </p>

            {/* <div className="flex items-center gap-2">
              <Button skin="secondary" size="small">
                <Text className="size-5" />
              </Button>

              <Button skin="secondary" size="small">
                <Replace className="size-5" />
              </Button>
            </div> */}
          </div>
        ))
      ) : (
        <div className="p-3 bg-slate-950 flex items-center gap-2 opacity-80 text-sm text-slate-700 border-dashed border-2 border-slate-700 rounded-lg">
          <CircleAlert className="size-5" />
          <p className="font-medium">No schedules found.</p>
        </div>
      )}
    </div>
  );
}

export default GeneratedSchedulesList;
