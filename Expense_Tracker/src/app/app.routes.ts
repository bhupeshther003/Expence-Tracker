import { Routes } from '@angular/router';
// import { DashboardComponent } from './budget-planner/dashboard/dashboard.component';
import { ExpenseComponent } from './budget-planner/expense/expense.component';
import { HistoryComponent } from './budget-planner/history/history.component';
import { IncomeComponent } from './budget-planner/income/income.component';
import { ProfileComponent } from './budget-planner/profile/profile.component';
import { SideNavComponent } from './budget-planner/side-nav/side-nav.component';
import { TodoComponent } from './budget-planner/todo/todo.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {path:'budget-planner',loadChildren:()=> import('./budget-planner/budget-planner.module').then(m=> m.BudgetPlannerModule)},
    {path : 'login', loadComponent: ()=> import('./pages/login/login.component')},
    {path :'register', loadComponent: ()=> import('./pages/register/register.component')},
    {path : 'forget-password', loadComponent: ()=> import('./pages/forget-password/forget-password.component')},
    {path :'reset/:token', loadComponent: ()=> import('./pages/reset/reset.component')},

    {path:'side-nav',component:SideNavComponent},
    {path:'', loadComponent: ()=> import('./budget-planner/dashboard/dashboard.component'), canActivate: [AuthGuard] },
    {path:'income',component:IncomeComponent},
    {path:'expense',component:ExpenseComponent},
    {path:'todo',component:TodoComponent},
    {path:'history',component:HistoryComponent},
    {path:'profile',component:ProfileComponent}
  
];
