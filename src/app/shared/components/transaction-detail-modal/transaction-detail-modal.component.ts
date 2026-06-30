import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentTrace } from '../../../features/home/models/agriculture.models';

@Component({
  selector: 'app-transaction-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-detail-modal.component.html',
  styleUrls: ['./transaction-detail-modal.component.css']
})
export class TransactionDetailModalComponent {
  @Input() transaction: PaymentTrace | null = null;
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'Completado': '#10b981',
      'En proceso': '#f59e0b',
      'Pendiente': '#ef4444'
    };
    return colors[status] || '#6b7280';
  }

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'Completado': '✓',
      'En proceso': '⏳',
      'Pendiente': '⏱'
    };
    return icons[status] || '•';
  }
}
