import { Component } from '@angular/core';
import { MockSessionUser, SessionRole, SessionService } from '../../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: false
})
export class HeaderComponent {
  user: MockSessionUser | null = null;
  isLoginOpen = false;
  loginData: { name: string; email: string; role: SessionRole; password: string } = {
    name: '',
    email: '',
    role: 'productor',
    password: ''
  };

  constructor(private readonly session: SessionService) {
    this.session.user$.subscribe((user) => this.user = user);
  }

  openLogin() {
    this.isLoginOpen = true;
  }

  closeLogin() {
    this.isLoginOpen = false;
  }

  login() {
    const fallbackName = this.loginData.role === 'administrador' ? 'Administrador Demo' : 'Productor Demo';
    this.session.login({
      name: this.loginData.name.trim() || fallbackName,
      email: this.loginData.email.trim() || `${this.loginData.role}@demo.local`,
      role: this.loginData.role
    });
    this.closeLogin();
  }

  logout() {
    this.session.logout();
  }

  get userInitial(): string {
    return this.user?.name.charAt(0).toUpperCase() || 'U';
  }
}
