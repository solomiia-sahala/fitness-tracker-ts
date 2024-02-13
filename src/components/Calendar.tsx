// import withAuthentication from './hocComponents/withAuthentication';
// import moment from 'moment';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar/DateCalendar';
// import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
// import dayjs from 'dayjs';
// import { MutableRefObject, useEffect, useRef, useState } from 'react';
// import { Badge } from '@mui/material';
// import { PickersDay } from '@mui/x-date-pickers/PickersDay/PickersDay';
// import React from 'react';
//
// const initialValue = dayjs();
//
// // @ts-ignore
// function fakeFetch(date, { signal }) {
//   return new Promise((resolve, reject) => {
//     const timeout = setTimeout(() => {
//       const daysToHighlight = [1, 2, 3];
//
//       resolve({ daysToHighlight });
//     }, 500);
//
//     signal.onabort = () => {
//       clearTimeout(timeout);
//       reject(new DOMException('aborted', 'AbortError'));
//     };
//   });
// }
//
// function ServerDay(props: any) {
//   const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
//
//   const isSelected =
//     !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
//
//   return (
//     <Badge
//       key={props.day.toString()}
//       overlap="circular"
//       badgeContent={isSelected ? '🏋🏼' : undefined}
//     >
//       <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
//     </Badge>
//   );
// }
//
export default function Calendar(): void {
//   const requestAbortController: MutableRefObject<any> = useRef(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [highlightedDays, setHighlightedDays] = useState([]);
//
//   const fetchHighlightedDays = (date: any) => {
//     console.log(date)
//     const controller = new AbortController();
//     fakeFetch(date, {
//       signal: controller.signal,
//     })
//       .then(({ daysToHighlight }: any) => {
//         setHighlightedDays(daysToHighlight);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         // ignore the error if it's caused by `controller.abort`
//         if (error.name !== 'AbortError') {
//           throw error;
//         }
//       });
//
//     requestAbortController.current = controller;
//   };
//
//   useEffect(() => {
//     fetchHighlightedDays(initialValue);
//     // abort request on unmount
//     return () => requestAbortController.current?.abort();
//   }, []);
//
//   const handleMonthChange = (date: any) => {
//     if (requestAbortController.current) {
//       // make sure that you are aborting useless requests
//       // because it is possible to switch between months pretty quickly
//       requestAbortController.current.abort();
//     }
//
//     setIsLoading(true);
//     setHighlightedDays([]);
//     fetchHighlightedDays(date);
//   };
//
//   // console.log(firebase, user);
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateCalendar
//         defaultValue={initialValue}
//         onChange={(newValue) => console.log(newValue)}
//         loading={isLoading}
//         onMonthChange={handleMonthChange}
//         renderLoading={() => <DayCalendarSkeleton />}
//         slots={{
//           day: ServerDay,
//         }}
//         slotProps={{
//           day: {
//             // @ts-ignore
//             highlightedDays,
//           },
//         }}
//       />
//     </LocalizationProvider>
//   )
}
//
// export default withAuthentication(Calendar as unknown as typeof React.Component);
