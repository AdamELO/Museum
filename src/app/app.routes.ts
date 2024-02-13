import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FloorComponent } from './pages/Floor/Floor.component';
import { ExhibitionDetailsComponent } from './components/ExhibitionDetails/ExhibitionDetails.component';
import { FloorDetailsComponent } from './components/FloorDetails/FloorDetails.component';
import { ElevatorComponent } from './components/Elevator/Elevator.component';
import { DashboardComponent } from './pages/Dashboard/Dashboard.component';
import { isLoggedGuard } from './guards/is-logged.guard';
import { LoginComponent } from './pages/Login/Login.component';
import { RegisterComponent } from './pages/Register/Register.component';
import { isNotLoggedGuard } from './guards/is-not-logged.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'elevator' , pathMatch: 'full'},
    { path: 'login',  component: LoginComponent},
    { path: 'register',  component: RegisterComponent},
    { path: 'elevator', component: ElevatorComponent},
    { 
        path: 'floor', 
        component: FloorComponent,
    },
    {
        path: "floor/:id",
        component: FloorDetailsComponent
    },
    {
        path: "exhibition/:id",
        component: ExhibitionDetailsComponent
    },
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [isNotLoggedGuard],
        children: [/*page voir ses reservations, voir son profil et le modif |||| pour admin : reactiver compte user, crud expo,categ,etages, sup une review*/]
    },
    { path: '**', component: ElevatorComponent}

];
