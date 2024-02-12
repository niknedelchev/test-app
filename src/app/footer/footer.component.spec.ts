import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconStub, MatNavlistStub, MatToolbarStub, MockComponent } from '../testing/test-utils';


describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [FooterComponent, MatToolbarStub, MatIconStub, MatNavlistStub],
      imports: [RouterTestingModule.withRoutes(
        [
          { path: 'home', component: MockComponent },
          { path: 'about', component: MockComponent },
          { path: 'login', component: MockComponent },
          { path: 'products', component: MockComponent }
        ]
      )]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
