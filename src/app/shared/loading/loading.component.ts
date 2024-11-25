import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EmitterService } from 'src/app/core/services/emitter.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, AfterViewInit {
  public isShowingLoading: boolean = false;

  constructor(private _emitterService: EmitterService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this._emitterService.emitterLoad.subscribe((res: boolean) => {
      this.isShowingLoading = res;
    });
  }
}
