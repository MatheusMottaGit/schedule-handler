from handlers.schedule_handler import ScheduleHandler

handler = ScheduleHandler('utils/monthly.pdf')

handler.on_generate_schedule()