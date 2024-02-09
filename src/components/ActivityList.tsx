import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import Firebase from "../services/firebase.service";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Activity } from '../interfaces/activity.interface';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import SnackBar from "./SnackBar";
import TableContainer from "@mui/material/TableContainer";

const ActivityList = ({ userId, firebase }: {
  userId: string;
  firebase: Firebase
}) => {
  const [activities, setActivities] = useState({});
  const [loading, setLoading] = useState<boolean>(true);
  // { isOpen: boolean, message: string }
  const [snackbar, setSnackbar] = useState<{ isOpen: boolean, message: string }>({
    isOpen: false,
    message: ''
  });

  const onActivitiesChange = (allActivities: any) => {
    setActivities(allActivities);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);

    const unsubscribe = firebase.fetchActivitiesByUid$(userId, onActivitiesChange)

    return (() => unsubscribe());
  }, [])

  const editActivity = (activity: Activity, i: number): void => {
    const activityKey = Object.keys(activities)[i];
    firebase.updateActivity(userId, activity, activityKey)
  }

  const deleteActivity = (i: number): void => {
    const activityKey = Object.keys(activities)[i];
    firebase.updateActivity(userId, null, activityKey).then(() => {
      setSnackbar({ isOpen: true, message: 'Activity is deleted' });
      setTimeout(() => {
        setSnackbar({ isOpen: false, message: '' });
      }, 3000)
    }).catch((error: Error) => console.error(error.message))
  }

  return (
    <>
      {loading ?
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress/>
        </Box>
        :
        <TableContainer sx={{ maxHeight: 320 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Additional Info</TableCell>
              <TableCell style={{ textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(activities).map((activity: any, i: number) => {
              const { level, type, duration, addInfo } = activity;
              return (
                <TableRow key={i}>
                  <TableCell>{type}</TableCell>
                  <TableCell>{level}</TableCell>
                  <TableCell>{duration + ' min.'}</TableCell>
                  <TableCell>{addInfo}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <EditNoteIcon
                      onClick={e => editActivity(activity, i)}
                      sx={{ cursor: 'pointer' }}
                    />
                    <DeleteForeverIcon
                      sx={{ marginLeft: "5px", cursor: 'pointer' }}
                      onClick={e => deleteActivity(i)}
                    />
                  </TableCell>
                </TableRow>
              )
            })
            }
          </TableBody>
        </Table>
        </TableContainer>
      }
      <SnackBar isOpen={snackbar.isOpen} message={snackbar.message}/>
    </>
  )
}

export default ActivityList;
