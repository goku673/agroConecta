import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
  standalone: false
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'text' = 'primary';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';
  
  @Output() btnClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    if (!this.disabled) {
      this.btnClick.emit(event);
    }
  }
}
