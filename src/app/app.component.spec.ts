import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthFasadeService } from './store/auth/auth-fasade.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: AuthFasadeService, useValue: {} }],
    })
      .overrideComponent(AppComponent, { set: { template: '' } })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
