import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { sessionStop } from '../../store/session.state';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
  ],
  templateUrl: './Nav.component.html',
  styleUrl: './Nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {

  state: any
  token!: any
  username!: any

  links: MenuItem[] = []

  constructor(
    private readonly _store: Store,
    private readonly _router: Router,
  ) {
    this.state = this._store.pipe(select((state: any) => state.session)).subscribe((session) => {
      this.token = session.token;
      this.username = session.username;
      this.refreshLinks();
    });
  }

  isLogged(): boolean {
    return !!this.token;
  }

  logout(){
    this._store.dispatch(sessionStop())
    this._router.navigate(['/login']);
  }

  refreshLinks () {
    this.links = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/', visible: true },
      { label: 'Dashboard', icon: 'pi pi-cog', routerLink: '/dashboard', visible: this.isLogged() },
      { label: 'Logout', icon: 'pi pi-sign-out', routerLink: '/login', visible: this.isLogged(), command: ():void => this.logout() },
      { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/login', visible: !this.isLogged() },
      { label: 'Register', icon: 'pi pi-user-plus', routerLink: '/register', visible: !this.isLogged() }
    ]
  }

}
