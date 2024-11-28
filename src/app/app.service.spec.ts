import { TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import { ProfileEnum } from './core/enums/profile.enum';
import { User } from './core/models/user.interface';

describe('AppService', () => {
  let service: AppService;
  let mockUser: User;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppService);
    mockUser = {
      userName: 'testUser',
      password: 'testPassword',
      name: 'Test User',
      profile: ProfileEnum.ADMIN,
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit the correct value when setting a new user', (done) => {
    const newUser: User = {
      userName: 'newUser',
      password: 'newPassword',
      name: 'New User',
      profile: ProfileEnum.CLIENT,
    };

    service.setCurrentUser(newUser);
    service.getCurrentUser().subscribe((user) => {
      expect(user).toEqual(newUser);
      done();
    });
  });
});
