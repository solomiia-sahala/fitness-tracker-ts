import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import { navigationItem } from '../interfaces/navigationItem.interface';
import { NavigationTabs } from '../enums/navigationTabs.enum';

export const navigationList: navigationItem[] = [
  { icon: DashboardIcon, tabName: NavigationTabs.Dashboard, path: '' },
  { icon: AutoGraphIcon, tabName: NavigationTabs.ProgressChart, path: '/progressChart' },
  { icon: LocalSeeIcon, tabName: NavigationTabs.FitnessJournal, path: '/fitnessJournal' },
  { icon: LogoutIcon, tabName: NavigationTabs.Logout }];
