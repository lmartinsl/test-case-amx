import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProfileEnum } from '../enums/profile.enum';
import { User } from '../models/user.interface';
import { UserService } from './user.service';

const mockUser: User = {
  userName: 'testUser',
  password: 'testPassword',
  name: 'Test User',
  profile: ProfileEnum.CLIENT,
};

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the user when the username is found', () => {
    const userName = 'testUser';
    
    const mockResponse: User[] = [mockUser];

    service.checkUserByUserName(userName).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call handleError when an HTTP error occurs', () => {
    const userName = 'testUser';
    
    const errorResponse = new HttpErrorResponse({
      error: 'error',
      status: 500,
      statusText: 'Server Error',
    });

    service.checkUserByUserName(userName).subscribe({
      next: () => fail('should have thrown an error'),
      error: (error) => {
        expect(error.message).toBe('Ocorreu um erro desconhecido.');
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('GET');
    req.flush('Error', errorResponse);
  });
});
