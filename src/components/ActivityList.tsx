import { JSX, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Activity } from '../interfaces/activity.interface';
import Firebase from '../services/firebase.service';
import ActivitiesTable from './ActivitiesTable';
import { ActionTypes } from '../enums/actionTypes.enum';
import { ActivityListInterface } from '../interfaces/activityLIst.interface';

const ActivityList = ({
  userId, handleAction, firebase, onEdit, selectedDate,
}: {
  userId: string;
  handleAction: (actionType: ActionTypes, activity: Activity | null, key: string) => void,
  onEdit: (activity: Activity, key: string)=> void,
  firebase: Firebase,
  selectedDate: string
}): JSX.Element => {
  const [activities, setActivities] = useState<ActivityListInterface>({});

  const [loading, setLoading] = useState<boolean>(false);

  const onActivitiesChange = (allActivities: ActivityListInterface): void => {
    setActivities(allActivities);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    const unsubscribe = firebase.fetchActivitiesByDate$(userId, selectedDate, onActivitiesChange);

    return (() => unsubscribe());
  }, [selectedDate]);

  const editActivity = (activity: Activity, i: number): void => {
    const activityKey = Object.keys(activities)[i];
    onEdit(activity, activityKey);
  };

  const deleteActivity = (i: number): void => {
    const activityKey = Object.keys(activities)[i];
    handleAction(ActionTypes.Delete, null, activityKey);
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
