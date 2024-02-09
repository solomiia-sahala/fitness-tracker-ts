import { NavigationTabs } from '../enums/navigationTabs.enum';

export interface navigationItem {
  icon: any;
  tabName: NavigationTabs;
  path?: string
}