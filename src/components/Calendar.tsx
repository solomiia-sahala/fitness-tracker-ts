import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import dayjs from 'dayjs';
import React, {
  JSX,
  MutableRefObject, useEffect, useRef, useState,
} from 'react';
import { Badge } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers/PickersDay/PickersDay';
import Firebase from '../services/firebase.service';
import { Activity } from '../interfaces/activity.interface';
import { ActivityListInterface } from '../interfaces/activityLIst.interface';

function fetchActivitiesByMonth(userId: string, firebase: Firebase, date: dayjs.Dayjs): Promise<number[]> {
  return firebase.fetchActivitiesByUid(userId)
      .then((activities: ActivityListInterface) => {
    const matchData = date.format('YYYY-MM');
    return Object.values(activities)
        .filter((activity) => (activity as Activity).date.includes(matchData))
        .map((activity) => new Date((activity as Activity).date).getDate());
  });
}

function ServerDay(props: any): JSX.Element {
  const {
    highlightedDays = [], day, outsideCurrentMonth, ...other
  } = props;

  const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🏋🏼' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

interface CalendarProps {
  firebase: Firebase,
  userId: string;
  selectDate: dayjs.Dayjs
  onSelectDate: (date: any) => void
}

function Calendar({
 userId, firebase, selectDate, onSelectDate,
}: CalendarProps): JSX.Element {
  const requestAbortController: MutableRefObject<any> = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);

  const fetchHighlightedDays = (date: dayjs.Dayjs): void => {
    const controller = new AbortController();
    fetchActivitiesByMonth(userId, firebase, date)
      .then((daysToHighlight: number[]) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error: any) => {
          throw error;
      });

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(selectDate);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, [selectDate]);

  const handleMonthChange = (date: any): void => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={selectDate}
        onChange={(newDate) => onSelectDate(newDate)}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            highlightedDays,
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
