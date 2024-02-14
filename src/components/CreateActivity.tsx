import { JSX, useEffect, useState } from 'react';
import {
  Button, Grid, Slider, Stack, TextField, Typography,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { activityType } from '../constants/activityTypes.const';
import AutocompleteInput from './AutocompleteInput';
import { ExerciseLevel } from '../enums/exerciseLevels.enum';
import { Activity } from '../interfaces/activity.interface';
import { Option } from '../interfaces/option.interface';
import { ActionTypes } from '../enums/actionTypes.enum';

const levelIntensity: Option[] = Object.values(ExerciseLevel).map((level: ExerciseLevel) => ({ label: level } as Option));
const dateFormat: string = 'YYYY-MM-DD';
const today = dayjs().format(dateFormat);

const defaultActivityData: Activity = {
  duration: 30,
  type: null,
  level: null,
  addInfo: '',
  date: today,
};

function CreateActivity({
  userId, selectedActivity, onCancel, handleAction,
}: {
  userId: string;
  selectedActivity: { activity: Activity, key: string} | null,
  handleAction: (actionType: ActionTypes, activity: Activity | null, userId: string, key?: string,) => void,
  onCancel: ()=> void
}): JSX.Element {
  const [activity, setActivity] = useState<Activity>(defaultActivityData);

  useEffect(() => {
    setActivity(selectedActivity?.activity ? selectedActivity.activity : defaultActivityData);
  }, [selectedActivity]);

  const handleChange = (event: Event | React.ChangeEvent): void => {
    const { name, value } = event.target as HTMLInputElement;
    setActivity({ ...activity, [name]: value });
  };
  const handleOptionSelect = (key: string, value: Option | null): void => {
    setActivity({ ...activity, [key]: value?.label });
  };

  const handleSubmit = (): void => {
    handleAction(ActionTypes.Create, activity, userId);
    setActivity(defaultActivityData);
  };

  const handleUpdate = (): void => {
    handleAction(ActionTypes.Update, activity, userId, selectedActivity!.key);
    setActivity(defaultActivityData);
  };

  const isDataFilled = !!activity.type && !!activity.level;

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <Typography variant="h6" gutterBottom>
        { selectedActivity?.activity ? 'Update the activity ' : 'Create new activity ' }
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ display: 'flex', gap: '50px' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(activity.date)}
              disablePast
              views={['year', 'month', 'day']}
              onChange={(date) => setActivity((prev) => ({ ...prev, date: date!.format(dateFormat) }))}
            />
          </LocalizationProvider>
          <AutocompleteInput
            inputLabel="Choose the activity type"
            selectedOption={activity.type ? { label: activity.type } as Option : null}
            options={activityType}
            formName="type"
            handleOptionSelect={handleOptionSelect}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography id="input-slider" gutterBottom>
            Duration
          </Typography>
          <Slider
            aria-labelledby="input-slider"
            name="duration"
            value={activity.duration}
            valueLabelDisplay="auto"
            step={5}
            marks
            min={10}
            max={90}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <AutocompleteInput
            inputLabel="Choose the Intensity"
            selectedOption={activity.level ? { label: activity.level } as Option : null}
            options={levelIntensity}
            formName="level"
            handleOptionSelect={handleOptionSelect}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={activity.addInfo}
            id="add-info"
            name="addInfo"
            label="Additional info"
            fullWidth
            autoComplete="add-info"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          {selectedActivity?.activity ? (
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                endIcon={<CheckCircleOutlineIcon />}
                disabled={!isDataFilled}
                onClick={() => handleUpdate()}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                endIcon={<ClearIcon />}
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
            </Stack>
          )
            : (
              <Button
                type="submit"
                variant="contained"
                endIcon={<CheckCircleOutlineIcon />}
                disabled={!isDataFilled}
                onClick={() => handleSubmit()}
              >
                Create
              </Button>
            )}
        </Grid>
      </Grid>
    </form>
  );
}

export default CreateActivity;
