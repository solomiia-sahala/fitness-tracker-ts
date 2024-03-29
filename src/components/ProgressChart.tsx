import React, {
 JSX, useEffect, useReducer, useState,
} from 'react';
import { Button, Grid } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { defaults } from 'chart.js/auto';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import PaperItem from './Paper';
import { useUserContext } from '../contexts/userContext';
import { Activity } from '../interfaces/activity.interface';
import { countActivitiesByDay, countActivitiesByMonth, countActivitiesByYear } from '../utils/utils';
import { CHART_DATE_DURATION } from '../constants/chartTypes.const';
import './styles/ProgressChart.css';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = 'start';
defaults.plugins.title.color = 'black';

const initialChartData = {
    activeAction: CHART_DATE_DURATION.YEAR,
    chart1: [],
    chart2: [],
    chart3: [],
};

const actionCreators = {
    countYear: (allActivities: Activity[]) => ({ type: CHART_DATE_DURATION.YEAR, payload: allActivities }),
    countMonth: (allActivities: Activity[]) => ({ type: CHART_DATE_DURATION.MONTH, payload: allActivities }),
    countWeek: (allActivities: Activity[]) => ({ type: CHART_DATE_DURATION.WEEK, payload: allActivities }),
};

function reducer(state: any, action: { type: string, payload: Activity[]}): any {
    switch (action.type) {
        case CHART_DATE_DURATION.YEAR:
            return {
 ...state,
                chart1: countActivitiesByYear(action.payload),
                chart2: [],
                chart3: [],
                activeAction: CHART_DATE_DURATION.YEAR,
};
        case CHART_DATE_DURATION.MONTH:
            return {
                ...state,
                chart1: countActivitiesByMonth(action.payload),
                chart2: [],
                chart3: [],
                activeAction: CHART_DATE_DURATION.MONTH,
            };
        case CHART_DATE_DURATION.WEEK:
            return {
                ...state,
                chart1: countActivitiesByDay(action.payload),
                chart2: [],
                chart3: [],
                activeAction: CHART_DATE_DURATION.WEEK,
            };
        default:
            return initialChartData;
    }
}

const revenueData = [
    {
        label: 'Jan',
        revenue: 64854,
        cost: 32652,
    },
    {
        label: 'Feb',
        revenue: 54628,
        cost: 42393,
    },
    {
        label: 'Mar',
        revenue: 117238,
        cost: 50262,
    },
    {
        label: 'Apr',
        revenue: 82830,
        cost: 64731,
    },
    {
        label: 'May',
        revenue: 91208,
        cost: 41893,
    },
];

const ProgressChart = (): JSX.Element => {
    const { userId, firebase } = useUserContext();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [chartData, dispatch] = useReducer(reducer, initialChartData);

    const getUserStatistics = (): void => {
        firebase.fetchActivitiesByUid(userId).then((result) => {
            const activities = Object.values(result);
            setActivities(activities);
            dispatch(actionCreators.countYear(activities));
        });
    };

    useEffect(() => {
        getUserStatistics();
    }, []);

    const getPluginsConfig = (text: string): { plugins: { title: { text: string } } } => ({
        plugins: {
            title: {
                text,
            },
        },
    });

    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <PaperItem height={60} additionalStyle={{ justifyContent: 'center', flexDirection: 'row' }}>
            <div className={`chart-tabs ${chartData.activeAction}`}>
              <Button onClick={() => dispatch(actionCreators.countYear(activities))}>Year</Button>
              <Button onClick={() => dispatch(actionCreators.countMonth(activities))}>Month</Button>
              <Button onClick={() => dispatch(actionCreators.countWeek(activities))}>Week</Button>
            </div>
          </PaperItem>
        </Grid>

        <Grid item xs={12}>
          <PaperItem height={250}>
            <Line
              data={{
                            labels: chartData.chart1.map((data: any) => data.label),
                            datasets: [
                                {
                                    label: 'Completed',
                                    data: chartData.chart1.map((data: any) => data.completed),
                                    backgroundColor: '#b09db4',
                                    borderColor: '#4ab74e',
                                },
                                {
                                    label: 'Uncompleted',
                                    data: chartData.chart1.map((data: any) => data.uncompleted),
                                    backgroundColor: '#4b545d',
                                    borderColor: '#e13030',
                                },
                            ],
                        }}
              options={{
                            elements: {
                                line: {
                                    tension: 0.5,
                                },
                            },
                            ...getPluginsConfig('Completed & Uncompleted Workouts'),
                        }}
            />
          </PaperItem>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <PaperItem height={340}>
            <Bar
              data={{
                            labels: revenueData.map((data) => data.label),
                            datasets: [
                                {
                                    label: 'Count',
                                    data: revenueData.map((data) => data.cost),
                                    backgroundColor: [
                                        'rgba(43, 63, 229, 0.8)',
                                        'rgba(250, 192, 19, 0.8)',
                                        'rgba(253, 135, 135, 0.8)',
                                    ],
                                    borderRadius: 5,
                                },
                            ],
                        }}
              options={getPluginsConfig('Revenue Source')}
            />
          </PaperItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <PaperItem height={340}>
            <Doughnut
              data={{
                            labels: revenueData.map((data) => data.label),
                            datasets: [
                                {
                                    label: 'Count',
                                    data: revenueData.map((data) => data.cost),
                                    backgroundColor: [
                                        'rgba(43, 63, 229, 0.8)',
                                        'rgba(250, 192, 19, 0.8)',
                                        'rgba(253, 135, 135, 0.8)',
                                    ],
                                    borderColor: [
                                        'rgba(43, 63, 229, 0.8)',
                                        'rgba(250, 192, 19, 0.8)',
                                        'rgba(253, 135, 135, 0.8)',
                                    ],
                                },
                            ],
                        }}
              options={getPluginsConfig('Revenue Source')}
            />
          </PaperItem>
        </Grid>
      </Grid>
    );
};
export default ProgressChart;
