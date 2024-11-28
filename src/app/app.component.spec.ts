import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SharedModule } from 'primeng/api';
import { AppComponent } from './app.component';
import { LoadingComponent } from './shared/loading/loading.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        SimpleNotificationsModule.forRoot(),
      ],
      declarations: [AppComponent, LoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize configAlert with the correct values', () => {
    expect(component.configAlert).toBeTruthy();
    expect(component.configAlert.position).toEqual(['bottom', 'right']);
    expect(component.configAlert.timeOut).toBe(3000);
    expect(component.configAlert.showProgressBar).toBeTrue();
    expect(component.configAlert.pauseOnHover).toBeTrue();
    expect(component.configAlert.clickToClose).toBeTrue();
    expect(component.configAlert.preventDuplicates).toBeTrue();
  });

  it('should have the correct initial position in configAlert', () => {
    const positions = component.configAlert.position;
    expect(positions).toEqual(['bottom', 'right']);
  });

  it('should have the correct timeout in configAlert', () => {
    expect(component.configAlert.timeOut).toBe(3000);
  });
});
