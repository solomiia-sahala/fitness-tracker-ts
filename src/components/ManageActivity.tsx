import React, { JSX, useState } from 'react';
import { Grid } from '@mui/material';
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
import PaperItem from './Paper';

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
        throw new Error();
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
        <PaperItem height={340}>
          <Calendar
            userId={userId}
            firebase={firebase}
            selectDate={selectedDate}
            onSelectDate={(date) => setSelectedDate(date)}
          />
        </PaperItem>
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <PaperItem height={390}>
          <CreateActivity
            selectedActivity={selectedActivity}
            handleAction={handleAction}
            onCancel={() => setSelectedActivity(null)}
          />
        </PaperItem>
      </Grid>
      <Grid item xs={12}>
        <PaperItem>
          <ActivityList
            userId={userId}
            firebase={firebase}
            selectedDate={formatDate(selectedDate)}
            handleAction={handleAction}
            onEdit={onEditActivity}
          />
        </PaperItem>
      </Grid>
      <SnackBar isOpen={snackbarConfig.isOpen} message={snackbarConfig.message} />
    </Grid>
  );
};
export default ManageActivity;
