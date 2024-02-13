import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule
  ],
  templateUrl: './Nav.component.html',
  styleUrl: './Nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent { 
  links: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/'},
    { label: 'Dashboard', icon: 'pi pi-list', routerLink: '/dashboard'},
    { label: 'Login', icon: 'pi pi-user', routerLink: '/login'},
    { label: 'Register', icon: 'pi pi-user', routerLink: '/register'},
    // { label: 'test', icon: 'pi pi-sun', items: [
    //   { label: 'test-child', icon: 'pi pi-list', routerLink: '/test' }
    // ] }
  ]
}
