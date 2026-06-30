import { Product, DeliveryPoint, PaymentTrace } from '../models/agriculture.models';

const productArt = (fill: string, accent: string) =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 450"><rect width="720" height="450" rx="32" fill="${encodeURIComponent(fill)}"/><circle cx="180" cy="150" r="74" fill="${encodeURIComponent(accent)}" opacity=".88"/><circle cx="330" cy="230" r="110" fill="${encodeURIComponent(accent)}" opacity=".55"/><circle cx="520" cy="170" r="84" fill="${encodeURIComponent(accent)}" opacity=".35"/><path d="M112 340c124-92 260-112 496-46" stroke="%23ffffff" stroke-width="36" stroke-linecap="round" opacity=".7"/><text x="48" y="84" font-family="Arial" font-size="34" font-weight="700" fill="%230f172a">AgroConecta</text></svg>`;

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Tomate Chonto Orgánico',
    category: 'Verduras',
    imageUrl: productArt('#fee2e2', '#ef4444'),
    price: 2500,
    unit: 'Kg',
    producer: 'Juan Pérez',
    origin: 'Boyacá (Villa de Leyva)',
    harvestDate: '2026-05-19',
    stock: 50,
    qualityStatus: 'Premium',
    cropType: 'Orgánico',
    logisticStatus: 'Recolectado',
    qrCodeSimulated: 'AGRO-CHONTO-JP-001',
    batchCode: 'LOTE-TOM-260619',
    paymentTraceId: 'pay-001'
  },
  {
    id: 'prod-02',
    name: 'Papa Pastusa Seleccionada',
    category: 'Tubérculos',
    imageUrl: productArt('#fef3c7', '#d97706'),
    price: 1800,
    unit: 'Kg',
    producer: 'María Gómez',
    origin: 'Nariño (Pasto)',
    harvestDate: '2026-05-18',
    stock: 120,
    qualityStatus: 'Fresco',
    cropType: 'Tradicional',
    logisticStatus: 'En Centro de Acopio',
    qrCodeSimulated: 'AGRO-PASTUSA-MG-002',
    batchCode: 'LOTE-PAP-260618',
    paymentTraceId: 'pay-002'
  },
  {
    id: 'prod-03',
    name: 'Fresas del Bosque',
    category: 'Frutas',
    imageUrl: productArt('#fce7f3', '#db2777'),
    price: 5000,
    unit: 'Bandeja (500g)',
    producer: 'Luisa Mora',
    origin: 'Cundinamarca (Guasca)',
    harvestDate: '2026-05-20',
    stock: 35,
    qualityStatus: 'Excelente',
    cropType: 'Orgánico',
    logisticStatus: 'En Ruta',
    qrCodeSimulated: 'AGRO-FRESAS-LM-003',
    batchCode: 'LOTE-FRE-260620',
    paymentTraceId: 'pay-003'
  },
  {
    id: 'prod-04',
    name: 'Lechuga Crespa Hidropónica',
    category: 'Hortalizas',
    imageUrl: productArt('#dcfce7', '#16a34a'),
    price: 1500,
    unit: 'Unidad',
    producer: 'Carlos Ruiz',
    origin: 'Cundinamarca (Sopó)',
    harvestDate: '2026-05-20',
    stock: 25,
    qualityStatus: 'Premium',
    cropType: 'Ecológico',
    logisticStatus: 'Listo para Entrega',
    qrCodeSimulated: 'AGRO-LECHUGA-CR-004',
    batchCode: 'LOTE-LEC-260620',
    paymentTraceId: 'pay-004'
  },
  {
    id: 'prod-05',
    name: 'Zanahoria Dulce',
    category: 'Tubérculos',
    imageUrl: productArt('#ffedd5', '#ea580c'),
    price: 2000,
    unit: 'Kg',
    producer: 'Juan Pérez',
    origin: 'Boyacá (Ventaquemada)',
    harvestDate: '2026-05-18',
    stock: 75,
    qualityStatus: 'Fresco',
    cropType: 'Tradicional',
    logisticStatus: 'En Centro de Acopio',
    qrCodeSimulated: 'AGRO-ZANAHORIA-JP-005',
    batchCode: 'LOTE-ZAN-260618',
    paymentTraceId: 'pay-005'
  },
  {
    id: 'prod-06',
    name: 'Mora de Castilla Silvestre',
    category: 'Frutas',
    imageUrl: productArt('#ede9fe', '#7c3aed'),
    price: 3200,
    unit: 'Kg',
    producer: 'Elena Torres',
    origin: 'Santander (Pamplona)',
    harvestDate: '2026-05-19',
    stock: 45,
    qualityStatus: 'Maduro',
    cropType: 'Ecológico',
    logisticStatus: 'En Ruta',
    qrCodeSimulated: 'AGRO-MORA-ET-006',
    batchCode: 'LOTE-MOR-260619',
    paymentTraceId: 'pay-006'
  }
];

export const MOCK_DELIVERY_POINTS: DeliveryPoint[] = [
  {
    id: 'pt-01',
    name: 'Plaza 14 de Septiembre',
    address: 'Centro historico, Cochabamba',
    schedule: 'Lunes a Viernes: 08:00 AM - 02:00 PM',
    status: 'Activo',
    lat: -17.3936,
    lng: -66.1570
  },
  {
    id: 'pt-02',
    name: 'Mercado Campesino Calatayud',
    address: 'Av. Republica, Cochabamba',
    schedule: 'Miércoles y Sábados: 09:00 AM - 05:00 PM',
    status: 'Activo',
    lat: -17.3977,
    lng: -66.1518
  },
  {
    id: 'pt-03',
    name: 'UMSS - Punto Universitario',
    address: 'Av. Oquendo, Cochabamba',
    schedule: 'Martes y Jueves: 10:00 AM - 04:00 PM',
    status: 'Activo',
    lat: -17.3932,
    lng: -66.1456
  }
];

export const MOCK_PAYMENT_TRACES: PaymentTrace[] = [
  {
    id: 'pay-001',
    orderCode: 'ORD-2606-1842',
    buyer: 'Restaurante El Molino',
    producer: 'Juan Pérez',
    product: 'Tomate Chonto Orgánico',
    amount: 125000,
    method: 'QR Bancario',
    currentStatus: 'Liquidado',
    steps: [
      { title: 'Pedido creado', description: 'El comprador confirma cantidad, precio y punto de entrega.', date: '2026-06-26 08:15', status: 'Completado', actor: 'Comprador' },
      { title: 'Pago recibido', description: 'La pasarela registra el comprobante y bloquea el monto para conciliacion.', date: '2026-06-26 08:18', status: 'Completado', amount: 125000, actor: 'Pasarela mock' },
      { title: 'Producto entregado', description: 'El centro de entrega valida lote, peso y condicion del producto.', date: '2026-06-26 13:40', status: 'Completado', actor: 'Punto de entrega' },
      { title: 'Liquidacion al productor', description: 'Se libera el pago al productor con la comision administrativa descontada.', date: '2026-06-26 17:05', status: 'Completado', amount: 118750, actor: 'Administrador' }
    ]
  },
  {
    id: 'pay-002',
    orderCode: 'ORD-2606-1907',
    buyer: 'Familia Rojas',
    producer: 'María Gómez',
    product: 'Papa Pastusa Seleccionada',
    amount: 54000,
    method: 'Transferencia',
    currentStatus: 'En conciliacion',
    steps: [
      { title: 'Pedido creado', description: 'Pedido tomado desde el catalogo con retiro en mercado campesino.', date: '2026-06-27 09:04', status: 'Completado', actor: 'Comprador' },
      { title: 'Pago reportado', description: 'El comprador adjunta referencia bancaria para revision.', date: '2026-06-27 09:12', status: 'Completado', amount: 54000, actor: 'Comprador' },
      { title: 'Validacion administrativa', description: 'Administracion compara referencia, monto y titular de cuenta.', date: '2026-06-27 10:25', status: 'En proceso', actor: 'Administrador' },
      { title: 'Liquidacion al productor', description: 'Queda pendiente hasta cerrar la entrega y conciliacion.', date: 'Pendiente', status: 'Pendiente', amount: 51300, actor: 'Administrador' }
    ]
  },
  {
    id: 'pay-003',
    orderCode: 'ORD-2606-2033',
    buyer: 'Tienda Natural Vida',
    producer: 'Luisa Mora',
    product: 'Fresas del Bosque',
    amount: 85000,
    method: 'Efectivo en punto',
    currentStatus: 'Pago confirmado',
    steps: [
      { title: 'Reserva generada', description: 'Se aparta stock mientras el comprador llega al punto.', date: '2026-06-28 07:50', status: 'Completado', actor: 'Sistema mock' },
      { title: 'Cobro en punto', description: 'El operador registra el efectivo recibido y emite constancia.', date: '2026-06-28 11:30', status: 'Completado', amount: 85000, actor: 'Operador' },
      { title: 'Cierre de caja', description: 'El administrador debe confirmar el arqueo del punto de entrega.', date: 'Hoy', status: 'En proceso', actor: 'Administrador' },
      { title: 'Liquidacion al productor', description: 'Programada despues del cierre de caja.', date: 'Pendiente', status: 'Pendiente', amount: 80750, actor: 'Administrador' }
    ]
  }
];
