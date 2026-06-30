import { Component, OnInit } from '@angular/core';
import { Product, DeliveryPoint, CartItem, DashboardStats, PaymentTrace } from '../../models/agriculture.models';
import { MOCK_PRODUCTS, MOCK_DELIVERY_POINTS, MOCK_PAYMENT_TRACES } from '../../data/agriculture.data';
import { AgroApiService } from '../../services/agro-api.service';
import { MockSessionUser, SessionService } from '../../../../core/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: false
})
export class HomeComponent implements OnInit {
  // State
  products: Product[] = [];
  filteredProducts: Product[] = [];
  deliveryPoints: DeliveryPoint[] = [];
  cart: CartItem[] = [];
  selectedCategory: string = 'Todos';
  categories: string[] = ['Todos'];
  selectedDeliveryPoint: DeliveryPoint | null = null;
  selectedProductForTraceability: Product | null = null;
  selectedPaymentTrace: PaymentTrace | null = null;
  paymentTraces: PaymentTrace[] = [];
  currentUser: MockSessionUser | null = null;
  isLoadingProducts = false;
  reservationData = {
    buyerName: '',
    phone: '',
    paymentMethod: 'qr',
    pickupDate: ''
  };
  producerTab: 'productos' | 'registrar' | 'reservas' = 'productos';
  
  // Dashboard stats
  stats: DashboardStats = {
    totalProducts: 0,
    totalProducers: 0,
    totalOrders: 0,
    totalDeliveryPoints: 0
  };

  // Alert/Toast Notification System
  notificationMessage: string | null = null;
  notificationType: 'success' | 'info' | 'warning' = 'info';

  // Producer Offer Form model
  newProduct: Partial<Product> = {
    name: '',
    category: 'Verduras',
    price: undefined,
    unit: 'Kg',
    producer: '',
    origin: '',
    harvestDate: '',
    stock: undefined,
    qualityStatus: 'Premium',
    cropType: 'Orgánico',
    logisticStatus: 'Recolectado'
  };

  readonly cochabambaMapUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=-66.1900%2C-17.4200%2C-66.1250%2C-17.3650&layer=mapnik&marker=-17.3895%2C-66.1568';

  constructor(
    private readonly agroApi: AgroApiService,
    private readonly session: SessionService
  ) {}

  get activePaymentTrace(): PaymentTrace | null {
    return this.selectedPaymentTrace || this.paymentTraces[0] || null;
  }

  get isProducer(): boolean {
    return this.currentUser?.role === 'productor';
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'administrador';
  }

  get producerProducts(): Product[] {
    if (!this.currentUser) {
      return [];
    }

    const producerName = this.currentUser.name.trim().toLowerCase();
    return this.products.filter((product) => product.producer.trim().toLowerCase() === producerName);
  }

  get visiblePaymentTraces(): PaymentTrace[] {
    if (!this.currentUser) {
      return this.paymentTraces;
    }

    if (this.currentUser.role === 'productor') {
      const producerName = this.currentUser.name.trim().toLowerCase();
      const producerTraces = this.paymentTraces.filter((trace) => trace.producer.toLowerCase().includes(producerName));
      return producerTraces.length ? producerTraces : this.paymentTraces.slice(0, 3);
    }

    return this.paymentTraces;
  }

  get visibleReservations(): PaymentTrace[] {
    return this.visiblePaymentTraces;
  }

  setProducerTab(tab: 'productos' | 'registrar' | 'reservas') {
    this.producerTab = tab;
  }

  ngOnInit() {
    this.products = [...MOCK_PRODUCTS];
    this.deliveryPoints = [...MOCK_DELIVERY_POINTS];
    this.paymentTraces = [...MOCK_PAYMENT_TRACES];
    this.currentUser = this.session.currentUser;
    this.session.user$.subscribe((user) => {
      this.currentUser = user;
      if (user?.role === 'productor') {
        this.newProduct.producer = user.name;
        this.ensureProducerMockData(user.name);
      }
    });
    this.filterByCategory('Todos');
    this.calculateStats();
    this.loadProductsFromApi();
    if (this.currentUser?.role === 'productor') {
      this.ensureProducerMockData(this.currentUser.name);
    }
  }

  loadProductsFromApi() {
    this.isLoadingProducts = true;

    this.agroApi.getProducts().subscribe({
      next: (products) => {
        if (products.length > 0) {
          this.products = products;
          this.refreshCategories();
          this.filterByCategory('Todos');
          this.calculateStats();
        }
        this.isLoadingProducts = false;
      },
      error: () => {
        this.refreshCategories();
        this.isLoadingProducts = false;
        this.showNotification('Usando datos locales de demostracion.', 'info');
      }
    });
  }

  // HU-01 & HU-02: Visualizar y filtrar por categoría
  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'Todos') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
  }

  // HU-03: Agregar a pedido simulado
  addToCart(product: Product) {
    if (product.stock <= 0) {
      this.showNotification('Este producto no tiene stock disponible', 'warning');
      return;
    }

    const existingIndex = this.cart.findIndex(item => item.product.id === product.id);
    if (existingIndex > -1) {
      if (this.cart[existingIndex].quantity >= product.stock) {
        this.showNotification(`No puedes pedir más de ${product.stock} ${product.unit} (límite de stock)`, 'warning');
        return;
      }
      this.cart[existingIndex].quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    
    this.showNotification(`Agregado al pedido: ${product.name}`, 'success');
  }

  updateQuantity(item: CartItem, change: number) {
    const newQty = item.quantity + change;
    if (newQty <= 0) {
      this.removeFromCart(item);
    } else if (newQty > item.product.stock) {
      this.showNotification(`Límite de stock alcanzado para ${item.product.name}`, 'warning');
    } else {
      item.quantity = newQty;
    }
  }

  removeFromCart(item: CartItem) {
    this.cart = this.cart.filter(cartItem => cartItem.product.id !== item.product.id);
    this.showNotification(`Removido del pedido: ${item.product.name}`, 'info');
  }

  clearCart() {
    this.cart = [];
    this.showNotification('Se ha limpiado el pedido simulado', 'info');
  }

  getCartTotal(): number {
    return this.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getCartItemsCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  // HU-04: Seleccionar punto estratégico de entrega
  selectDeliveryPoint(point: DeliveryPoint) {
    this.selectedDeliveryPoint = point;
    this.showNotification(`Punto de entrega seleccionado: ${point.name}`, 'success');
  }

  confirmSimulatedOrder() {
    if (this.cart.length === 0) {
      this.showNotification('Agrega productos antes de reservar.', 'warning');
      return;
    }
    if (!this.selectedDeliveryPoint) {
      this.showNotification('Debes seleccionar un punto estratégico de entrega.', 'warning');
      return;
    }

    const trace = this.createPaymentTraceFromCart();
    this.paymentTraces.unshift(trace);
    this.selectedPaymentTrace = trace;
    this.stats.totalOrders += 1;
    this.showNotification(`Reserva creada: ${trace.orderCode}.`, 'success');
    this.cart = [];
    this.selectedDeliveryPoint = null;
    this.reservationData = {
      buyerName: '',
      phone: '',
      paymentMethod: 'qr',
      pickupDate: ''
    };
  }

  // HU-05: Consultar trazabilidad
  showTraceability(product: Product) {
    this.selectedProductForTraceability = product;
    this.selectedPaymentTrace = this.paymentTraces.find((trace) => trace.id === product.paymentTraceId || trace.product === product.name) || this.buildPendingTrace(product);
  }

  closeTraceability() {
    this.selectedProductForTraceability = null;
    this.selectedPaymentTrace = null;
  }

  // HU-06: Registrar oferta diaria simulada
  registerOffer(form: any) {
    if (!this.isProducer) {
      this.showNotification('Inicia sesión como productor para registrar productos.', 'warning');
      return;
    }

    if (!form.valid) {
      this.showNotification('Por favor, completa todos los campos requeridos correctamente.', 'warning');
      return;
    }

    const prodId = `prod-${Date.now()}`;
    const cleanProductName = this.newProduct.name || 'Producto';
    const cleanProducerName = this.currentUser?.name || this.newProduct.producer || 'Productor Local';
    const codePrefix = cleanProductName.substring(0, 3).toUpperCase();
    const producerPrefix = cleanProducerName.substring(0, 2).toUpperCase();
    
    const productToAdd: Product = {
      id: prodId,
      name: cleanProductName,
      category: this.newProduct.category as any,
      price: Number(this.newProduct.price),
      unit: this.newProduct.unit || 'Kg',
      producer: cleanProducerName,
      origin: this.newProduct.origin || 'Origen Desconocido',
      harvestDate: this.newProduct.harvestDate || new Date().toISOString().split('T')[0],
      stock: Number(this.newProduct.stock),
      qualityStatus: (this.newProduct.qualityStatus || 'Premium') as any,
      cropType: (this.newProduct.cropType || 'Orgánico') as any,
      logisticStatus: 'Recolectado',
      qrCodeSimulated: `AGRO-${codePrefix}-${producerPrefix}-${Math.floor(100 + Math.random() * 900)}`,
      batchCode: `LOTE-${codePrefix}-${Date.now().toString().slice(-5)}`
    };

    this.addProductToCatalog(productToAdd);
    this.resetOfferForm(form);
    this.showNotification('Producto registrado y agregado al catálogo.', 'success');
  }

  // HU-07: Estadísticas dinámicas
  calculateStats() {
    const uniqueProducers = new Set(this.products.map(p => p.producer.trim().toLowerCase())).size;
    
    this.stats.totalProducts = this.products.length;
    this.stats.totalProducers = uniqueProducers > 0 ? uniqueProducers : 0;
    this.stats.totalDeliveryPoints = this.deliveryPoints.length;
    // totalOrders stays persistent as simulated checkout runs
  }

  private addProductToCatalog(product: Product) {
    this.products.unshift(product);
    this.refreshCategories();
    this.filterByCategory(this.selectedCategory);
    this.calculateStats();
  }

  private ensureProducerMockData(producerName: string) {
    const exists = this.products.some((product) => product.producer.trim().toLowerCase() === producerName.trim().toLowerCase());
    if (exists) {
      return;
    }

    const producerSamples: Product[] = [
      {
        ...MOCK_PRODUCTS[0],
        id: `producer-${Date.now()}-1`,
        name: 'Mix de verduras frescas',
        producer: producerName,
        stock: 38,
        price: 4200,
        batchCode: `LOTE-${producerName.substring(0, 3).toUpperCase()}-001`,
        qrCodeSimulated: `AGRO-${producerName.substring(0, 3).toUpperCase()}-001`
      },
      {
        ...MOCK_PRODUCTS[3],
        id: `producer-${Date.now()}-2`,
        name: 'Lechuga seleccionada',
        producer: producerName,
        stock: 24,
        price: 1800,
        batchCode: `LOTE-${producerName.substring(0, 3).toUpperCase()}-002`,
        qrCodeSimulated: `AGRO-${producerName.substring(0, 3).toUpperCase()}-002`
      }
    ];

    this.products = [...producerSamples, ...this.products];
    this.paymentTraces = [
      {
        id: `pay-producer-${Date.now()}`,
        orderCode: `RES-${Date.now().toString().slice(-5)}`,
        buyerId: 'buyer-temp',
        buyerName: 'Cliente Feria Central',
        buyerPhone: '591-7-9999999',
        producerId: `prod-${Date.now()}`,
        producer: producerName,
        producerPhone: '591-7-8888888',
        product: 'Mix de verduras frescas',
        quantity: 25,
        unit: 'Kg',
        amount: 84000,
        method: 'Pago en punto de entrega',
        deliveryPointId: 'pt-01',
        deliveryPointName: 'Punto Entrega Central',
        deliveryPointAddress: 'Centro Cochabamba',
        currentStatus: 'En conciliacion',
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 86400000).toISOString(),
        steps: [
          { title: 'Reserva recibida', description: 'Cliente reservo producto desde el catalogo.', date: 'Hoy 09:20', status: 'Completado', actor: 'Cliente' },
          { title: 'Pago en punto', description: 'El pago se confirma cuando el cliente retira.', date: 'Pendiente', status: 'Pendiente', amount: 84000, actor: 'Punto de entrega' },
          { title: 'Entrega', description: 'Producto preparado para retiro.', date: 'Hoy 15:00', status: 'En proceso', actor: producerName },
          { title: 'Liquidacion', description: 'Saldo pendiente de liberacion al productor.', date: 'Pendiente', status: 'Pendiente', amount: 79800, actor: 'Administrador' }
        ]
      },
      ...this.paymentTraces
    ];
    this.refreshCategories();
    this.filterByCategory(this.selectedCategory);
    this.calculateStats();
  }

  private refreshCategories() {
    const categories = Array.from(new Set(this.products.map((product) => product.category).filter(Boolean)));
    this.categories = ['Todos', ...categories];
  }

  private resetOfferForm(form: any) {
    this.newProduct = {
      name: '',
      category: 'Hortalizas',
      price: undefined,
      unit: 'kg',
      producer: '',
      origin: '',
      harvestDate: '',
      stock: undefined,
      qualityStatus: 'Premium',
      cropType: 'Orgánico',
      logisticStatus: 'Recolectado'
    };

    form.resetForm({
      category: 'Hortalizas',
      unit: 'kg',
      qualityStatus: 'Premium',
      cropType: 'Orgánico'
    });
  }

  private createPaymentTraceFromCart(): PaymentTrace {
    const firstItem = this.cart[0];
    const orderCode = `ORD-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const total = this.getCartTotal();
    const producerSummary = Array.from(new Set(this.cart.map((item) => item.product.producer))).join(', ');
    const productSummary = this.cart.map((item) => `${item.quantity} ${item.product.unit} ${item.product.name}`).join(' + ');

    return {
      id: `pay-${Date.now()}`,
      orderCode,
      buyerId: `buyer-${Date.now()}`,
      buyerName: this.reservationData.buyerName || 'Cliente en tienda',
      buyerPhone: '591-7-0000000',
      producerId: `prod-${Date.now()}`,
      producer: producerSummary || firstItem.product.producer,
      producerPhone: '591-7-1111111',
      product: productSummary,
      quantity: this.cart.reduce((sum, item) => sum + item.quantity, 0),
      unit: 'Kg',
      amount: total,
      method: this.reservationData.paymentMethod === 'qr' ? 'QR por la app' : 'Pago en punto de entrega',
      deliveryPointId: this.selectedDeliveryPoint?.id || 'pt-01',
      deliveryPointName: this.selectedDeliveryPoint?.name || 'Punto de entrega',
      deliveryPointAddress: this.selectedDeliveryPoint?.address || 'Cochabamba',
      currentStatus: this.reservationData.paymentMethod === 'qr' ? 'Pago confirmado' : 'En conciliacion',
      createdAt: new Date().toISOString(),
      estimatedDelivery: this.reservationData.pickupDate || new Date(Date.now() + 86400000).toISOString(),
      steps: [
        { title: 'Reserva generada', description: 'El stock queda apartado para el comprador.', date: 'Ahora', status: 'Completado', actor: this.reservationData.buyerName || 'Cliente' },
        {
          title: this.reservationData.paymentMethod === 'qr' ? 'Pago QR confirmado' : 'Pago pendiente en punto',
          description: this.reservationData.paymentMethod === 'qr'
            ? 'La app genera un QR mock y registra el pago.'
            : 'El comprador pagara al retirar el pedido.',
          date: this.reservationData.paymentMethod === 'qr' ? 'Ahora' : 'Al retirar',
          status: this.reservationData.paymentMethod === 'qr' ? 'Completado' : 'Pendiente',
          amount: total,
          actor: this.reservationData.paymentMethod === 'qr' ? 'App mock' : 'Punto de entrega'
        },
        { title: 'Entrega programada', description: `Retiro asociado a ${this.selectedDeliveryPoint?.name}.`, date: this.reservationData.pickupDate || 'Proxima ventana', status: 'En proceso', actor: 'Punto de entrega' },
        { title: 'Liquidacion al productor', description: 'El administrador confirma la entrega y libera el saldo al productor.', date: 'Pendiente', status: 'Pendiente', amount: total * 0.95, actor: 'Administrador' }
      ]
    };
  }

  private buildPendingTrace(product: Product): PaymentTrace {
    return {
      id: `pending-${product.id}`,
      orderCode: product.batchCode || product.qrCodeSimulated,
      buyerId: 'buyer-pending',
      buyerName: 'Sin comprador asignado',
      buyerPhone: '',
      producerId: `prod-${product.id}`,
      producer: product.producer,
      producerPhone: '591-7-2222222',
      product: product.name,
      quantity: product.stock || 0,
      unit: product.unit || 'Kg',
      amount: product.price,
      method: 'Pendiente',
      deliveryPointId: 'pt-01',
      deliveryPointName: 'Punto de entrega',
      deliveryPointAddress: 'Cochabamba',
      currentStatus: 'En conciliacion',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 86400000).toISOString(),
      steps: [
        { title: 'Lote publicado', description: 'El productor registro la oferta para venta.', date: product.harvestDate, status: 'Completado', actor: product.producer },
        { title: 'Pedido pendiente', description: 'Aun no existe una compra confirmada para este lote.', date: 'Pendiente', status: 'Pendiente', actor: 'Comprador' },
        { title: 'Pago pendiente', description: 'Se generara automaticamente cuando el comprador confirme el pedido.', date: 'Pendiente', status: 'Pendiente', actor: 'Sistema front' },
        { title: 'Liquidacion pendiente', description: 'El pago al productor depende de entrega y conciliacion.', date: 'Pendiente', status: 'Pendiente', actor: 'Administrador' }
      ]
    };
  }

  // Notifications helper
  showNotification(message: string, type: 'success' | 'info' | 'warning' = 'info') {
    this.notificationMessage = message;
    this.notificationType = type;
    
    setTimeout(() => {
      this.notificationMessage = null;
    }, 4500);
  }
}
