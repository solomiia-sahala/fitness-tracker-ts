import { JSX, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SnackBar from './SnackBar';
import { Activity } from '../interfaces/activity.interface';
import Firebase from '../services/firebase.service';
import ActivitiesTable from './Table';

const ActivityList = ({ userId, firebase }: {
  userId: string;
  firebase: Firebase
}): JSX.Element => {
  const [activities, setActivities] = useState({});
  const [loading, setLoading] = useState<boolean>(true);
  const [snackbar, setSnackbar] = useState<{ isOpen: boolean, message: string }>({
    isOpen: false,
    message: '',
  });

  const onActivitiesChange = (allActivities: any): void => {
    setActivities(allActivities);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    const unsubscribe = firebase.fetchActivitiesByUid$(userId, onActivitiesChange);

    return (() => unsubscribe());
  }, []);

  const editActivity = (activity: Activity, i: number): void => {
    const activityKey = Object.keys(activities)[i];
    firebase.updateActivity(userId, activity, activityKey);
  };

  const deleteActivity = (i: number): void => {
    const activityKey = Object.keys(activities)[i];
    firebase.updateActivity(userId, null, activityKey).then(() => {
      setSnackbar({ isOpen: true, message: 'Activity is deleted' });
      setTimeout(() => {
        setSnackbar({ isOpen: false, message: '' });
      }, 3000);
    }).catch((error: Error) => console.error(error.message));
  };

  return (
    <>
      {loading
        ? (
          <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )
        : (
          <ActivitiesTable
            activities={activities}
            onEditAction={editActivity}
            onDeleteAction={deleteActivity}
          />
        )}
      <SnackBar isOpen={snackbar.isOpen} message={snackbar.message} />
    </>
  );
};

export default ActivityList;
