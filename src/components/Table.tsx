import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import { JSX } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Activity } from '../interfaces/activity.interface';

interface ActivitiesTableProps {
    activities: any;
    onEditAction: (activity: Activity, i: number) => void
    onDeleteAction: (i: number) => void
}

const ActivitiesTable = ({
  activities,
  onEditAction,
  onDeleteAction,
}: ActivitiesTableProps): JSX.Element => (
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
          const {
            level, type, duration, addInfo,
          } = activity;
          return (
            <TableRow key={i}>
              <TableCell>{type}</TableCell>
              <TableCell>{level}</TableCell>
              <TableCell>{`${duration} min.`}</TableCell>
              <TableCell>{addInfo}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <EditNoteIcon
                  onClick={() => onEditAction(activity, i)}
                  sx={{ cursor: 'pointer' }}
                />
                <DeleteForeverIcon
                  sx={{ marginLeft: '5px', cursor: 'pointer' }}
                  onClick={() => onDeleteAction(i)}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>

);

export default ActivitiesTable;
