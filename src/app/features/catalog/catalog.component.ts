import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  currentUser$: Observable<User>;

  constructor(private _appService: AppService) {
    this.currentUser$ = this._appService.getCurrentUser();
  }
}
