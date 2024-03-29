import dayjs from 'dayjs';
import { DATE_FORMAT } from '../constants/dateFormat.config';
import { Activity } from '../interfaces/activity.interface';
import { ExerciseStatus } from '../enums/exerciseStatus.enum';

export function formatDate(date: dayjs.Dayjs): string {
    return date.format(DATE_FORMAT);
}

export function countActivitiesByYear(elements: Activity[]): any {
    const countsByMonth: any = {};

    // Iterate over the elements array
    elements.forEach((element) => {
        const month = new Date(element.date).getMonth(); // Get month index (0-based)
        countActivity(countsByMonth, month, element, getMonthLabel(month));
    });

    // Convert countsByMonth object to an array of counts
    const countsArray = Object.values(countsByMonth);

    return countsArray;
}

export function countActivitiesByMonth(elements: Activity[]): any {
    const countsByWeek: any = {};

    // Iterate over the elements array
    filterActivitiesForCurrentMonth(elements).forEach((element) => {
        const date = new Date(element.date);
        const weekNumber = getWeekNumber(date);

        countActivity(countsByWeek, weekNumber, element, `Week ${weekNumber}`);
    });

    // Convert countsByWeek object to an array of counts
    const countsArray = Object.values(countsByWeek);

    return countsArray;
}

export function countActivitiesByDay(activities: Activity[]): any {
    const countsByDay: any = {};
    // Iterate over the filtered activities array
    filterActivitiesForLastWeek(activities).forEach((element) => {
        const date = new Date(element.date);
        const dayOfWeek = getDayOfWeek(date); // Get day of the week name (e.g., Monday, Tuesday)

        countActivity(countsByDay, dayOfWeek, element, dayOfWeek);
    });

    // Convert countsByDay object to an array of counts
    const countsArray = Object.values(countsByDay);

    return countsArray;
}

function countActivity(resultCounter: any, dateRange: number | string, element: Activity, label: string): any {
    // Initialize counts for the day if not already present
    if (!resultCounter[dateRange]) {
        resultCounter[dateRange] = { label, completed: 0, uncompleted: 0 };
    }

    // Increment the completed or uncompleted count based on exerciseStatus
    if (element.exerciseStatus === ExerciseStatus.Completed) {
        resultCounter[dateRange].completed++;
    } else {
        resultCounter[dateRange].uncompleted++;
    }
    return resultCounter;
}

function filterActivitiesForCurrentMonth(elements: Activity[]): Activity[] {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed in JavaScript

    return elements.filter((element) => {
        const activityDate = new Date(element.date);
        const activityYear = activityDate.getFullYear();
        const activityMonth = activityDate.getMonth() + 1; // Month is 0-indexed in JavaScript

        return activityYear === currentYear && activityMonth === currentMonth;
    });
}

function filterActivitiesForLastWeek(activities: Activity[]): Activity[] {
    const lastWeek = getLastWeek(); // Get the start and end dates of the last week
    // Filter elements for the last week
    return activities.filter((element) => {
        const date = new Date(element.date);
        return date >= lastWeek.start && date <= lastWeek.end;
    });
}

function getWeekNumber(date: Date): number {
    // Get the day of the month
    const dayOfMonth = date.getDate();
    // Calculate the week number by dividing the day by 7 and rounding up
    return Math.ceil(dayOfMonth / 7);
}

function getLastWeek(): { start: Date, end: Date } {
    const today = new Date();
    const lastWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const lastWeekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return { start: lastWeekStart, end: lastWeekEnd };
}

function getDayOfWeek(date: Date): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
}

function getMonthLabel(monthIndex: number): string {
    const months = ['January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'];
    return months[monthIndex];
}
