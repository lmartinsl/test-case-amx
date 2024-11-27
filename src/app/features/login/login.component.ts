import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/core/models/user.interface';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { NotificationAlertService } from './../../core/services/notification-alert.service';
import { UserService } from './../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  currentUser: User | undefined;

  inputUserName: string | undefined;
  inputPassword: string | undefined;
  inputProfile: string | undefined;

  private userNameSubject = new Subject<string>();

  private subscription = new Subscription();

  constructor(
    private _userService: UserService,
    private _appService: AppService,
    private _notificationAlertService: NotificationAlertService,
    private _router: Router,
    private _utilsService: UtilsService
  ) {}

  ngAfterViewInit(): void {
    this.subscription.add(
      this.userNameSubject
        .pipe(
          debounceTime(700),
          distinctUntilChanged(),
          switchMap((userName) => {
            return this._userService.checkUserByUserName(userName).pipe(
              catchError((error) => {
                this._notificationAlertService.error('Erro', error.message);
                return of(undefined);
              })
            );
          })
        )
        .subscribe({
          next: (user) => {
            if (user) this.profileMap(user);
          },
          error: (error) =>
            this._notificationAlertService.error('Erro', error.message),
        })
    );
  }

  checkUser(userName: string | undefined): void {
    if (userName && userName.length >= 3) {
      this.userNameSubject.next(userName);
    }
  }

  cancel(): void {
    this.currentUser = undefined;
    this.inputUserName = undefined;
    this.inputPassword = undefined;
    this.inputProfile = undefined;
  }

  submit(): void {
    if (this.inputPassword === this.currentUser!.password) {
      this._appService.setCurrentUser(this.currentUser!);
      this._router.navigateByUrl('catalog');
    } else {
      this._notificationAlertService.error(
        'Senha incorreta',
        'Tente novamente ou procure um administrador.'
      );
    }
  }

  profileMap(user: User): void {
    this.currentUser = user;
    this.inputProfile = this._utilsService.profileMap(user.profile);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
