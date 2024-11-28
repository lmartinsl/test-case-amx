import { TestBed } from '@angular/core/testing';
import { EmitterService } from './emitter.service';

describe('EmitterService', () => {
  let service: EmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmitterService],
    });
    service = TestBed.inject(EmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit the correct value when loading is called', (done) => {
    const expectedValue = true;

    service.emitterLoad.subscribe((value) => {
      expect(value).toBe(expectedValue);
      done();
    });

    service.loading(expectedValue);
  });

  it('should emit false when loading is called with false', (done) => {
    const expectedValue = false;

    service.emitterLoad.subscribe((value) => {
      expect(value).toBe(expectedValue);
      done();
    });

    service.loading(expectedValue);
  });
});
