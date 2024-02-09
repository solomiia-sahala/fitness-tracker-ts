import { useState } from 'react';
import { Button, Grid, Slider, TextField, Typography } from '@mui/material';
import { activityType } from '../constants/activityTypes.const';
import AutocompleteInput from './AutocompleteInput';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ExerciseLevel } from '../enums/exerciseLevels.enum';
import { Activity } from '../interfaces/activity.interface';
import { Option } from '../interfaces/option.interface';
import SnackBar from './SnackBar';
import Firebase from '../services/firebase.service';

const levelIntensity: Option[] = Object.values(ExerciseLevel).map((level: ExerciseLevel) => ({ label: level } as Option))

const defaultActivityData: Activity = {
  duration: 30,
  type: null,
  level: null,
  addInfo: ''
}

function CreateActivity({ date, userId, firebase }: {
  date?: string;
  userId: string;
  firebase: Firebase
}) {
  const [activity, setActivity] = useState<Activity>(defaultActivityData);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleChange = (event: Event | React.ChangeEvent): void => {
    const { name, value } = event.target as HTMLInputElement;
    setActivity({ ...activity, [name]: value });
  }
  const handleOptionSelect = (key: string, value: string): void => {
    setActivity({ ...activity, [key]: value });
  }

  const handleSubmit = (activity: Activity): void => {
    setOpenSnackbar(true);
    firebase.addActivity(userId, activity).then(() => {
      // setActivity(defaultActivityData);
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000)
    }).catch((error: Error) => console.error(error.message))
  }

  const isDataFilled = !!activity.type && !!activity.level;

  return (
    <>
      <form noValidate onSubmit={e => e.preventDefault()}>
        <Typography variant="h6" gutterBottom>
          New activity for {date}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AutocompleteInput inputLabel={'Choose the activity type'}
                               options={activityType}
                               formName={'type'}
                               handleOptionSelect={handleOptionSelect}/>
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
              inputLabel={'Choose the Intensity'}
              options={levelIntensity}
              selectedOption={activity.level}
              formName={'level'}
              handleOptionSelect={handleOptionSelect}/>
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
            <Button
              type="submit"
              variant="contained"
              endIcon={<CheckCircleOutlineIcon/>}
              disabled={!isDataFilled}
              onClick={() => handleSubmit(activity)}
            >Create</Button>
          </Grid>
        </Grid>
      </form>
      <SnackBar isOpen={openSnackbar} message={"Activity is created"}/>
    </>
  )
}

export default CreateActivity;