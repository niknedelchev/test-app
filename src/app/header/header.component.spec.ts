import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '../services/auth.service';
import { MatToolbarRowStub, MatToolbarStub } from '../testing/test-utils';
import { BehaviorSubject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService',['logout']);
    authServiceMock.isAuthenticated = new BehaviorSubject(true);
   

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, MatToolbarStub, MatToolbarRowStub],
      providers:[
        {provide: AuthService, useValue: authServiceMock}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
