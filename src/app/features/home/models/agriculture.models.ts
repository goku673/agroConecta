export interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  imageUrl?: string;
  price: number;
  unit: string;
  producer: string;
  origin: string;
  harvestDate: string;
  stock: number;
  qualityStatus: 'Premium' | 'Maduro' | 'Fresco' | 'Excelente';
  cropType: 'Orgánico' | 'Tradicional' | 'Ecológico';
  logisticStatus: 'Recolectado' | 'En Centro de Acopio' | 'En Ruta' | 'Listo para Entrega';
  qrCodeSimulated: string;
  batchCode?: string;
  paymentTraceId?: string;
}

export interface DeliveryPoint {
  id: string;
  name: string;
  address: string;
  schedule: string;
  status: 'Activo' | 'Saturado' | 'Cerrado';
  lat?: number;
  lng?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalProducers: number;
  totalOrders: number;
  totalDeliveryPoints: number;
}

export interface PaymentTraceStep {
  title: string;
  description: string;
  date: string;
  status: 'Completado' | 'En proceso' | 'Pendiente';
  amount?: number;
  actor?: string;
}

export interface PaymentTrace {
  id: string;
  orderCode: string;
  buyerId?: string;
  buyerName: string;
  buyerPhone?: string;
  producerId?: string;
  producer: string;
  producerPhone?: string;
  product: string;
  quantity?: number;
  unit?: string;
  amount: number;
  method: string;
  deliveryPointId?: string;
  deliveryPointName?: string;
  deliveryPointAddress?: string;
  currentStatus: 'Pago confirmado' | 'En conciliacion' | 'Liquidado';
  steps: PaymentTraceStep[];
  createdAt?: string;
  estimatedDelivery?: string;
}
