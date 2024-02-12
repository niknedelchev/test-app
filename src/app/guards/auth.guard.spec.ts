import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['updateAuthStatus']);
    authServiceSpy.isAuthenticated = new BehaviorSubject(false);

    TestBed.configureTestingModule({ providers: [{ provide: AuthService, useValue: authServiceSpy }] });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
