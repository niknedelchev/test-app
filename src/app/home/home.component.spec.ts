import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain header with expected text', () => {
    //Arrange
    let text = "Designed for engineers";

    //Act
    let h1: HTMLElement = fixture.debugElement.query(By.css('h1')).nativeElement;

    //Assert
    expect(h1.textContent).toBe(text);

  })

  it('should contain two buttons', () => {

    let buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);
  })
});
