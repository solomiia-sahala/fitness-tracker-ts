import { ExerciseLevel } from '../enums/exerciseLevels.enum';
import { ExerciseStatus } from '../enums/exerciseStatus.enum';

export interface Activity {
  exerciseStatus: ExerciseStatus,
  duration: number,
  type: string | null,
  level: ExerciseLevel | null,
  addInfo: string,
  date: string
}
