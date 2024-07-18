import { Routes } from '@angular/router';
import {AgencyDetailComponent} from './agency-detail/agency-detail.component'
import { CartographieComponent } from './cartographie/cartographie.component';
import {AgencyListComponent} from "./agency-list/agency-list.component"
export const routes: Routes = [
    {
      path: 'detail/:id',
      component: AgencyDetailComponent,
    },
    {
        path: '',
        component: AgencyListComponent,
      },
  ];
