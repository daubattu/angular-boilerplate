import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'about-page',
  imports: [MatSlideToggleModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})

export class AboutPageComponent {
  name = 'About';
}
