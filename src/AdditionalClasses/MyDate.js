const CURRENT_POSITION = 'CURRENT_POSITION'
const NEXT_POSITION = 'NEXT_POSITION'
const PREV_POSITION = 'PREV_POSITION'

export const Position = {
  CURRENT_POSITION,
  NEXT_POSITION,
  PREV_POSITION,
}

class MyDate {
  now() {
    const date = new Date()

    return {
      month: date.getMonth(),
      year: date.getUTCFullYear(),
    }
  }

  createId(date) {
    return `${date.month}_${date.year}`
  }

  key(date) {
    return `${date.day}${date.month}${date.year}`
  }

  niceDate({ month, year }) {
    const options = { year: 'numeric', month: 'short' }
    const date = new Date(year, month + 1, 0)
    return date.toLocaleDateString('en-US', options)
  }

  getInitialCalendar() {
    return this.generateCalendarForMonth(...this.date)
  }

  getNumberOfDaysInMonth({ year, month }) {
    return new Date(year, month + 1, 0).getDate()
  }

  isSunday(dayIndex) {
    return dayIndex === 0
  }

  getIndexOfDayInWeek({ year, month, day }) {
    const indexOfDay = new Date(year, month, day).getDay()
    return this.isSunday(indexOfDay) ? 6 : indexOfDay - 1
  }

  prevMonth({ year, month }) {
    if (month === 0) {
      return {
        month: 11,
        year: --year,
      }
    }
    return {
      month: --month,
      year,
    }
  }

  nextMonth({ year, month }) {
    if (month === 11) {
      return {
        month: 0,
        year: ++year,
      }
    }
    return {
      month: ++month,
      year,
    }
  }

  isToday({ year, month, day }, now) {
    return (
      now.getUTCFullYear() === year &&
      now.getMonth() === month &&
      now.getDate() === day
    )
  }

  isOutOfCurrentMonth({ month }, now) {
    return month !== now.getMonth()
  }

  generateCalendarForMonth({ year, month }) {
    const numberOfDaysInCurrentMonth = this.getNumberOfDaysInMonth({
      year,
      month,
    })
    const numberOfDaysInPreviousMonth = this.getNumberOfDaysInMonth(
      this.prevMonth({ year, month }),
    )
    const indexOfFirstMonthDay = this.getIndexOfDayInWeek({
      year,
      month,
      day: 1,
    })
    const indexOfLastMonthDay = this.getIndexOfDayInWeek({
      year,
      month,
      day: numberOfDaysInCurrentMonth,
    })

    const MonthArray = []
    for (let i = 0; i < indexOfFirstMonthDay; i++) {
      MonthArray.unshift({
        position: Position.PREV_POSITION,
        day: numberOfDaysInPreviousMonth - i,
        ...this.prevMonth({ year, month }),
      })
    }
    for (let i = 1; i <= numberOfDaysInCurrentMonth; i++) {
      MonthArray.push({
        position: Position.CURRENT_POSITION,
        day: i,
        month,
        year,
        event: null,
      })
    }
    for (let i = indexOfLastMonthDay; i < 6; i++) {
      MonthArray.push({
        position: Position.NEXT_POSITION,
        day: i - indexOfLastMonthDay + 1,
        ...this.nextMonth({ year, month }),
      })
    }
    return MonthArray
  }
}

export const date = new MyDate()
