import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FloorComponent } from './pages/Floor/Floor.component';
import { ExhibitionDetailsComponent } from './components/ExhibitionDetails/ExhibitionDetails.component';
import { FloorDetailsComponent } from './components/FloorDetails/FloorDetails.component';
import { ElevatorComponent } from './components/Elevator/Elevator.component';
import { DashboardComponent } from './pages/Dashboard/Dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'elevator' , pathMatch: 'full'},
    { path: 'elevator', component: ElevatorComponent},
    { 
        path: 'floor', 
        component: FloorComponent,
        children: [
            {
                path: "floor/:id",
                component: FloorDetailsComponent,
                children: [
                    {
                        path: "Exhibition/id",
                        component: ExhibitionDetailsComponent,
                        children: [/* faire une reservation */]
                    }
                ]
            }
        ]
    },
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        children: [/*page voir ses reservations, voir son profil et le modif |||| pour admin : reactiver compte user, crud expo,categ,etages, sup une review*/]
    },
    { path: '**', component: ElevatorComponent}

];
