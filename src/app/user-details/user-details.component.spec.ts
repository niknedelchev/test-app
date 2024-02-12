import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { AuthService } from '../services/auth.service';
import { MatCardContentStub, MatCardHeaderStub, MatCardStub, MatCardSubTitle, MatCardTitleGroupStub, MatCardTitleStub, MatListItemmStub, MatListStub } from '../testing/test-utils';
import { User } from '../contracts/user';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let user: User;
  let user2: User;

  beforeEach(async () => {
    user = {
      id: '1',
      email: 'user1@test.com',
      firstName: 'firstName1',
      lastName: 'lastName1',
      gender: 'male',
      username: 'username1',
      token: 'token1',
      image: 'imageUrl1'

    }

    user2 = {
      id: '2',
      email: 'user2@test.com',
      firstName: 'firstName2',
      lastName: 'lastName2',
      gender: 'female',
      username: 'username2',
      token: 'token2',
      image: 'imageUrl2'

    }
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthTokenValid'], {user: user});


    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent, MatCardStub, MatCardHeaderStub, MatCardTitleGroupStub,
        MatCardTitleStub, MatCardSubTitle, MatCardContentStub, MatListStub, MatListItemmStub],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    authServiceSpy.isAuthTokenValid.and.returnValue(true);

    //change property value on spied object
    (Object.getOwnPropertyDescriptor(authServiceSpy, 'user')?.get as jasmine.Spy<() => User>).and.returnValue(user2);
    expect(component).toBeTruthy();
  });
});
