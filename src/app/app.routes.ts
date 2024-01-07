import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./layout/layout.routes').then(mod => mod.routes) },
  // { path: '', loadComponent: () => import('./layout/layout.component').then(mod => mod.LayoutComponent) },
  { path: 'admin', loadComponent: () => import('./admin/admin.component').then(mod => mod.AdminComponent) },
];
