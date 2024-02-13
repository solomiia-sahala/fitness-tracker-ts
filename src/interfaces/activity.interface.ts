import { ExerciseLevel } from '../enums/exerciseLevels.enum';

export interface Activity {
  duration: number,
  type: string | null,
  level: ExerciseLevel | null,
  addInfo: string,
  date: string
}
