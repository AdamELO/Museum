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
import { FloorsComponent } from './pages/Dashboard/Floors/Floors.component';
import { CategoriesComponent } from './pages/Dashboard/Categories/Categories.component';
import { UsersComponent } from './pages/Dashboard/Users/Users.component';
import { BookingsComponent } from './pages/Dashboard/Bookings/Bookings.component';
import { AddFloorComponent } from './pages/Dashboard/Floors/AddFloor/AddFloor.component';
import { UpdateFloorComponent } from './pages/Dashboard/Floors/UpdateFloor/UpdateFloor.component';
import { AddCategoryComponent } from './pages/Dashboard/Categories/AddCategory/AddCategory.component';
import { UpdateCategoryComponent } from './pages/Dashboard/Categories/UpdateCategory/UpdateCategory.component';
import { UpdateUserComponent } from './pages/Dashboard/Users/UpdateUser/UpdateUser.component';
import { MyBookingComponent } from './pages/Dashboard/Bookings/MyBooking/MyBooking.component';
import { isAdminGuard } from './guards/is-admin.guard';
import { PricingComponent } from './pages/Dashboard/Pricing/Pricing.component';

export const routes: Routes = [
    { path: '', redirectTo: 'elevator', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'elevator', component: ElevatorComponent },
    {
        path: 'floor',
        component: FloorComponent,
    },
    {
        path: "floor/:floorNumber",
        component: FloorDetailsComponent
    },
    {
        path: "exhibition/:id",
        component: ExhibitionDetailsComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [isLoggedGuard]
    },
    {
        path: 'floors',
        component: FloorsComponent,
        canActivate: [isAdminGuard]
    },
    { path: 'floors/add', component: AddFloorComponent, canActivate: [isAdminGuard] },
    { path: 'floors/update/:id', component: UpdateFloorComponent, canActivate: [isAdminGuard] },
    {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [isAdminGuard]
    },
    { path: 'categories/add', component: AddCategoryComponent, canActivate: [isAdminGuard] },
    { path: 'categories/update/:id', component: UpdateCategoryComponent, canActivate: [isAdminGuard] },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [isAdminGuard]
    },
    { path: 'users/update/:id', component: UpdateUserComponent, canActivate: [isLoggedGuard] },
    { path: 'bookings/:userid', component: MyBookingComponent, canActivate: [isLoggedGuard] },
    {
        path: 'bookings',
        component: BookingsComponent,
        canActivate: [isAdminGuard]
    },
    {
        path: 'pricing',
        component: PricingComponent,
        canActivate: [isAdminGuard]
    },
    { path: '**', component: ElevatorComponent }

];
