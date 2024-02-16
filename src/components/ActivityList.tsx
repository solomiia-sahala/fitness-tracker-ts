import { JSX, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Activity } from '../interfaces/activity.interface';
import Firebase from '../services/firebase.service';
import ActivitiesTable from './ActivitiesTable';
import { ActionTypes } from '../enums/actionTypes.enum';

const ActivityList = ({
  userId, handleAction, firebase, onEdit,
}: {
  userId: string;
  handleAction: (actionType: ActionTypes, activity: Activity | null, userId: string, key: string) => void,
  onEdit: (activity: Activity, key: string)=> void,
  firebase: Firebase
}): JSX.Element => {
  const [activities, setActivities] = useState({});
  const [loading, setLoading] = useState<boolean>(true);

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
    onEdit(activity, activityKey);
  };

  const deleteActivity = (i: number): void => {
    const activityKey = Object.keys(activities)[i];
    handleAction(ActionTypes.Delete, null, userId, activityKey);
  };

  return (
    loading ? (
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
      )
  );
};

export default ActivityList;
