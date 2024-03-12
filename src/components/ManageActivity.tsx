import React, { JSX, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import dayjs from 'dayjs';
import CreateActivity from './CreateActivity';
import ActivityList from './ActivityList';
import { ActionTypes } from '../enums/actionTypes.enum';
import { Activity } from '../interfaces/activity.interface';
import { SnackBarMessages } from '../constants/snackBarMessages.const';
import SnackBar from './SnackBar';
import { useUserContext } from '../contexts/userContext';
import Calendar from './Calendar';
import { formatDate } from '../utils/utils';

const today = dayjs();

const ManageActivity = (): JSX.Element => {
  const { userId, firebase } = useUserContext();
  const [selectedActivity, setSelectedActivity] = useState<{activity: Activity, key: string} | null>(null);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(today);
  const [snackbarConfig, setSnackbarConfig] = useState<{ isOpen: boolean, message: string }>({ isOpen: false, message: '' });

  const handleAction = (actionType: ActionTypes, activity: Activity | null, key?: string): void => {
    let request: Promise<any>;

    switch (actionType) {
      case ActionTypes.Create:
        request = firebase.addActivity(userId, { ...activity, date: formatDate(selectedDate) } as Activity);
        break;
      case ActionTypes.Update:
        request = firebase.updateActivity(userId, activity, key!).then(() => {
          setSelectedActivity(null);
        });
        break;
      case ActionTypes.Delete:
        request = firebase.updateActivity(userId, null, key!);
        break;
      default:
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    request.then(() => {
        if (actionType !== ActionTypes.Update) {
            setSelectedDate(dayjs(selectedDate));
        }
      setSnackbarConfig({ isOpen: true, message: SnackBarMessages[actionType] });
      setTimeout(() => setSnackbarConfig((prev) => ({ ...prev, isOpen: false })), 3000);
    });
  };

  const onEditActivity = (activity: Activity, key: string): void => {
    setSelectedActivity({ activity, key });
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 340,
            width: '100%',
          }}
        >
          <Calendar
            userId={userId}
            firebase={firebase}
            selectDate={selectedDate}
            onSelectDate={(date) => setSelectedDate(date)}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 390,
            width: '100%',
          }}
        >
          <CreateActivity
            selectedActivity={selectedActivity}
            handleAction={handleAction}
            onCancel={() => setSelectedActivity(null)}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <ActivityList
            userId={userId}
            firebase={firebase}
            selectedDate={formatDate(selectedDate)}
            handleAction={handleAction}
            onEdit={onEditActivity}
          />
        </Paper>
      </Grid>
      <SnackBar isOpen={snackbarConfig.isOpen} message={snackbarConfig.message} />
    </Grid>
  );
};
export default ManageActivity;
