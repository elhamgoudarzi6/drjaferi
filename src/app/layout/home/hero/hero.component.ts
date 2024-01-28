import { Component } from '@angular/core';
import { PrimengListModule } from '../../../primeng-list.module';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [PrimengListModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
}
