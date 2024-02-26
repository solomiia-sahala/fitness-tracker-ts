import React, { JSX, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import { useUserContext } from '../pages/Dashboard';
import CreateActivity from './CreateActivity';
import ActivityList from './ActivityList';
import { ActionTypes } from '../enums/actionTypes.enum';
import { Activity } from '../interfaces/activity.interface';
import { SnackBarMessages } from '../constants/snackBarMessages.const';
import SnackBar from './SnackBar';

const ManageActivity = (): JSX.Element => {
  const { userId, firebase } = useUserContext();
  const [selectedActivity, setSelectedActivity] = useState<{activity: Activity, key: string} | null>(null);
  const [snackbarConfig, setSnackbarConfig] = useState<{ isOpen: boolean, message: string }>({ isOpen: false, message: '' });

  const handleAction = (actionType: ActionTypes, activity: Activity | null, id: string, key?: string): void => {
    let request: Promise<any>;

    switch (actionType) {
      case ActionTypes.Create:
        request = firebase.addActivity(id, activity!);
        break;
      case ActionTypes.Update:
        request = firebase.updateActivity(id, activity, key!).then(() => {
          setSelectedActivity(null);
        });
        break;
      case ActionTypes.Delete:
        request = firebase.updateActivity(id, null, key!);
        break;
      default:
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    request.then(() => {
      setSnackbarConfig({ isOpen: true, message: SnackBarMessages[actionType] });
      setTimeout(() => setSnackbarConfig((prev) => ({ ...prev, isOpen: false })), 3000);
    });
  };

  const onEditActivity = (activity: Activity, key: string): void => {
    setSelectedActivity({ activity, key });
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6} lg={12}>
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
            userId={userId}
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
