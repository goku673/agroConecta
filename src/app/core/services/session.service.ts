import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SessionRole = 'productor' | 'administrador';

export interface MockSessionUser {
  name: string;
  email: string;
  role: SessionRole;
}

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly storageKey = 'agro_mock_session';
  private readonly userSubject = new BehaviorSubject<MockSessionUser | null>(this.loadUser());
  readonly user$ = this.userSubject.asObservable();

  get currentUser(): MockSessionUser | null {
    return this.userSubject.value;
  }

  login(user: MockSessionUser) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.userSubject.next(null);
  }

  private loadUser(): MockSessionUser | null {
    const rawUser = localStorage.getItem(this.storageKey);
    return rawUser ? JSON.parse(rawUser) : null;
  }
}
