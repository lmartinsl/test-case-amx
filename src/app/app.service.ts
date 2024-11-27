import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileEnum } from './core/enums/profile.enum';
import { User } from './core/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  subjectUser$ = new BehaviorSubject<User | undefined>({
    userName: 'lucas',
    password: 'lucas123',
    name: 'Lucas Martins Lima',
    profile: ProfileEnum.ADMIN,
  });

  setCurrentUser(user: User): void {
    this.subjectUser$.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.subjectUser$.asObservable();
  }
}
