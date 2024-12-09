import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { ExploreComponent } from './features/explore/explore.component';
import { ProfileComponent } from './features/profile/profile.component';
import { SettingsComponent } from './features/settings/settings.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },

  {
    path: 'home', component: HomeComponent
  },

  {
    path: 'explore', component: ExploreComponent
  },

  {
    path: 'profile', component: ProfileComponent
  },
   {
    path: 'settings', component: SettingsComponent
   }
];
