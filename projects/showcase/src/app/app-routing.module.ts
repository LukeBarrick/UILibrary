import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ShowcaseComponent } from 'uilibrary';

const routes: Routes = [
  { path: '', 
    component: LayoutComponent, 
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, 
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, 
      { path: 'docs', loadChildren: () => import('./docs/docs.module').then(m => m.DocumentationModule) }, 
      { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) }, 
    ] 
  },
  { path: 'showcase', component: ShowcaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
