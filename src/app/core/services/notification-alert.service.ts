import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class NotificationAlertService {
  constructor(private _notificationService: NotificationsService) {}

  public success(_title?: string, _content?: string, _override?: any) {
    this._notificationService.success(_title, _content, _override);
  }

  public warn(_title?: string, _content?: string, _override?: any) {
    this._notificationService.warn(_title, _content, _override);
  }

  public error(_title?: string, _content?: string, _override?: any) {
    this._notificationService.error(_title, _content, _override);
  }

  public info(_title?: string, _content?: string, _override?: any) {
    this._notificationService.info(_title, _content, _override);
  }
}
