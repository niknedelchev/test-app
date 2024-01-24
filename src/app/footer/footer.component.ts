import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  links = [
    { description: 'home', url: '' },
    { description: 'about', url: '' },
    { description: 'login', url: 'login' },
    { description: 'products', url: '' }
  ]
}
