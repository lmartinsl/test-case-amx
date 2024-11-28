import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/core/models/user.interface';
import { NotificationAlertService } from 'src/app/core/services/notification-alert.service';
import { UserService } from 'src/app/core/services/user.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { ProfileEnum } from './../../core/enums/profile.enum';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let mockUserService: Partial<UserService>;
  let mockAppService: Partial<AppService>;
  let mockNotificationAlertService: Partial<NotificationAlertService>;
  let mockUtilsService: Partial<UtilsService>;
  let mockRouter: Partial<Router>;

  beforeEach(() => {
    mockUserService = {
      checkUserByUserName: jasmine
        .createSpy('checkUserByUserName')
        .and.returnValue(of(undefined)),
    };

    mockAppService = {
      setCurrentUser: jasmine.createSpy('setCurrentUser'),
    };

    mockNotificationAlertService = {
      error: jasmine.createSpy('error'),
    };

    mockUtilsService = {
      profileMap: jasmine.createSpy('profileMap').and.returnValue('Admin'),
    };

    mockRouter = {
      navigateByUrl: jasmine.createSpy('navigateByUrl'),
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: AppService, useValue: mockAppService },
        {
          provide: NotificationAlertService,
          useValue: mockNotificationAlertService,
        },
        { provide: UtilsService, useValue: mockUtilsService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('profileMap', () => {
    it('should set currentUser and inputProfile correctly', () => {
      const mockUser: User = {
        userName: 'testUser',
        password: 'testPass',
        name: 'Test User',
        profile: ProfileEnum.ADMIN,
      };

      component.profileMap(mockUser);

      expect(component.currentUser).toEqual(mockUser);

      expect(mockUtilsService.profileMap).toHaveBeenCalledWith(
        mockUser.profile
      );

      expect(component.inputProfile).toBe('Admin');
    });
  });

  describe('checkUser', () => {
    it('should call userNameSubject.next if username length >= 3', () => {
      const userNameSubjectSpy = spyOn(component['userNameSubject'], 'next');
      component.checkUser('testUser');
      expect(userNameSubjectSpy).toHaveBeenCalledWith('testUser');
    });

    it('should not call userNameSubject.next if username is undefined or length < 3', () => {
      const userNameSubjectSpy = spyOn(component['userNameSubject'], 'next');
      component.checkUser('ab');
      component.checkUser(undefined);
      expect(userNameSubjectSpy).not.toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    it('should reset currentUser and input fields', () => {
      component.currentUser = {
        userName: 'user',
        password: 'pass',
        name: 'name',
        profile: ProfileEnum.ADMIN,
      };
      component.inputUserName = 'user';
      component.inputPassword = 'pass';
      component.inputProfile = 'Admin';

      component.cancel();

      expect(component.currentUser).toBeUndefined();
      expect(component.inputUserName).toBeUndefined();
      expect(component.inputPassword).toBeUndefined();
      expect(component.inputProfile).toBeUndefined();
    });
  });

  describe('submit', () => {
    it('should navigate to catalog if password matches currentUser', () => {
      component.currentUser = {
        userName: 'user',
        password: 'pass',
        name: 'name',
        profile: ProfileEnum.ADMIN,
      };
      component.inputPassword = 'pass';

      component.submit();

      expect(mockAppService.setCurrentUser).toHaveBeenCalledWith(
        component.currentUser
      );
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('catalog');
    });

    it('should call notification service if password does not match', () => {
      component.currentUser = {
        userName: 'user',
        password: 'pass',
        name: 'name',
        profile: ProfileEnum.ADMIN,
      };
      component.inputPassword = 'wrongPass';

      component.submit();

      expect(mockNotificationAlertService.error).toHaveBeenCalledWith(
        'Senha incorreta',
        'Tente novamente ou procure um administrador.'
      );
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from subscriptions', () => {
      const unsubscribeSpy = spyOn(component['subscription'], 'unsubscribe');
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });
});
