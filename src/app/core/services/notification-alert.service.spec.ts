import { TestBed } from '@angular/core/testing';
import { NotificationsService } from 'angular2-notifications';
import { NotificationAlertService } from './notification-alert.service';

class MockNotificationsService {
  success = jasmine.createSpy('success');
  warn = jasmine.createSpy('warn');
  error = jasmine.createSpy('error');
  info = jasmine.createSpy('info');
}

describe('NotificationAlertService', () => {
  let service: NotificationAlertService;
  let mockNotificationService: MockNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationAlertService,
        { provide: NotificationsService, useClass: MockNotificationsService },
      ],
    });
    service = TestBed.inject(NotificationAlertService);
    mockNotificationService = TestBed.inject(NotificationsService) as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call success method on _notificationService when success is called', () => {
    const title = 'Success Title';
    const content = 'Success Content';
    const override = { timeOut: 2000 };

    service.success(title, content, override);

    expect(mockNotificationService.success).toHaveBeenCalledWith(
      title,
      content,
      override
    );
  });

  it('should call warn method on _notificationService when warn is called', () => {
    const title = 'Warning Title';
    const content = 'Warning Content';
    const override = { timeOut: 2000 };

    service.warn(title, content, override);

    expect(mockNotificationService.warn).toHaveBeenCalledWith(
      title,
      content,
      override
    );
  });

  it('should call error method on _notificationService when error is called', () => {
    const title = 'Error Title';
    const content = 'Error Content';
    const override = { timeOut: 2000 };

    service.error(title, content, override);

    expect(mockNotificationService.error).toHaveBeenCalledWith(
      title,
      content,
      override
    );
  });

  it('should call info method on _notificationService when info is called', () => {
    const title = 'Info Title';
    const content = 'Info Content';
    const override = { timeOut: 2000 };

    service.info(title, content, override);

    expect(mockNotificationService.info).toHaveBeenCalledWith(
      title,
      content,
      override
    );
  });
});
