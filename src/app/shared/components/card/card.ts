import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
  standalone: false
})
export class CardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() variant: 'default' | 'premium' = 'default';
}
