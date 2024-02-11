import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FloorComponent } from './pages/Floor/Floor.component';
import { ExhibitionDetailsComponent } from './components/ExhibitionDetails/ExhibitionDetails.component';

export const routes: Routes = [
    { path: 'museum', component: AppComponent},
    { 
        path: 'floor/:id', 
        component: FloorComponent,
        children: [
            {
                path: "exhibition/:id",
                component: ExhibitionDetailsComponent
            }
        ]
    },

];
