import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../chat/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/tab3.module').then(m => m.Tab3PageModule)
      },
      /* {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      } */
    ]
  }/* ,
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
