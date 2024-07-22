import dayjs from "dayjs";

export function handleMonthDates() {
  const currentMonth = dayjs().month()

  const currentYear = dayjs().year()

  const monthNumberOfDays = dayjs(currentMonth).daysInMonth()

  let selectedDates = [] as number[]
  let wednesdayDates = [] as number[]
  let saturdayDates = [] as number[]

  for (let day = 1; day <= monthNumberOfDays; day++) {
    const date = new Date(currentYear, currentMonth, day)

    const weekDay = date.getDay()

    if(weekDay === 3 || weekDay === 6) {
      selectedDates.push(day)

      if(weekDay === 3) {
        wednesdayDates.push(day)
      }

      if(weekDay === 6) {
        saturdayDates.push(day)
      }
    }
  }

  return {
    monthDates: selectedDates,
    wednesdayDates,
    saturdayDates
  }
}