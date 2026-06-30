import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgroApiService } from '../../../home/services/agro-api.service';
import { PaymentTrace, Product } from '../../../home/models/agriculture.models';
import { MOCK_PAYMENT_TRACES } from '../../../home/data/agriculture.data';
import { SessionService } from '../../../../core/services/session.service';

interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface AdminPerson {
  id: string;
  full_name?: string;
  email?: string;
  document_number?: string;
  phone?: string;
  city?: string;
  address?: string;
  person_type: string;
  created_at: string;
}

type AdminTab = 'resumen' | 'usuarios' | 'productos' | 'pagos' | 'reservas' | 'perfil';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
  standalone: false
})
export class AdminDashboardComponent implements OnInit {
  loginData = {
    email: 'admin@agroconecta.local',
    password: '123456'
  };

  newProduct = {
    name: '',
    description: '',
    unit: 'kg',
    price: 0,
    stock: 0,
    categoryId: 1,
    originCity: 'Cochabamba',
    imageUrl: ''
  };

  currentUser: { id: string; full_name: string; email: string; role: string } | null = null;
  users: AdminUser[] = [];
  people: AdminPerson[] = [];
  products: Product[] = [];
  paymentTraces: PaymentTrace[] = [...MOCK_PAYMENT_TRACES];
  activeTab: AdminTab = 'resumen';
  chartBars = [
    { label: 'Lun', value: 34 },
    { label: 'Mar', value: 52 },
    { label: 'Mie', value: 41 },
    { label: 'Jue', value: 68 },
    { label: 'Vie', value: 73 },
    { label: 'Sab', value: 59 }
  ];
  roleStats = [
    { label: 'Productores', value: 46, color: '#059669' },
    { label: 'Compradores', value: 38, color: '#2563eb' },
    { label: 'Operadores', value: 16, color: '#f59e0b' }
  ];
  isLoading = false;
  message = '';
  messageType: 'success' | 'warning' | 'info' = 'info';

  constructor(
    private readonly agroApi: AgroApiService,
    private readonly session: SessionService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    const sessionUser = this.session.currentUser;
    if (sessionUser?.role === 'administrador') {
      this.currentUser = {
        id: 'u-session',
        full_name: sessionUser.name,
        email: sessionUser.email,
        role: 'admin'
      };
    } else {
      this.currentUser = this.agroApi.getStoredUser();
    }

    if (!this.currentUser) {
      this.currentUser = {
        id: 'u-001',
        full_name: 'Administrador Demo',
        email: 'admin@agroconecta.local',
        role: 'admin'
      };
    }
    this.loadDashboard();
    this.route.fragment.subscribe((fragment) => {
      const tabs: AdminTab[] = ['resumen', 'usuarios', 'productos', 'pagos', 'reservas', 'perfil'];
      if (this.isAdminTab(fragment, tabs)) {
        this.activeTab = fragment;
      }
    });
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  loginAdmin() {
    this.isLoading = true;
    this.message = '';

    this.agroApi.login(this.loginData.email, this.loginData.password).subscribe({
      next: (response) => {
        this.currentUser = response.user;
        this.session.login({
          name: response.user.full_name,
          email: response.user.email,
          role: 'administrador'
        });
        this.isLoading = false;

        if (!this.isAdmin()) {
          this.agroApi.logout();
          this.currentUser = null;
          this.showMessage('Tu usuario existe, pero no tiene rol de administrador.', 'warning');
          return;
        }

        this.showMessage('Sesion mock iniciada. Cualquier dato es valido en esta demo.', 'success');
        this.loadDashboard();
      },
      error: () => {
        this.isLoading = false;
        this.showMessage('No se pudo iniciar la sesion mock.', 'warning');
      }
    });
  }

  logout() {
    this.agroApi.logout();
    this.session.logout();
    this.currentUser = null;
    this.users = [];
    this.people = [];
    this.products = [];
    this.showMessage('Sesion cerrada.', 'info');
  }

  loadDashboard() {
    this.isLoading = true;
    this.agroApi.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.showMessage('No se pudieron cargar productos mock.', 'warning');
      }
    });

    this.agroApi.getUsers().subscribe({
      next: (users) => this.users = users,
      error: () => this.showMessage('No se pudieron cargar usuarios mock.', 'warning')
    });

    this.agroApi.getPeople().subscribe({
      next: (people) => this.people = people,
      error: () => this.showMessage('No se pudieron cargar personas mock.', 'warning')
    });
  }

  createProduct(form: any) {
    if (!form.valid) {
      this.showMessage('Completa los campos del producto.', 'warning');
      return;
    }

    this.isLoading = true;
    this.agroApi.createProduct({
      ...this.newProduct,
      price: Number(this.newProduct.price),
      stock: Number(this.newProduct.stock),
      isAvailable: Number(this.newProduct.stock) > 0
    }).subscribe({
      next: (product) => {
        this.products.unshift(product);
        this.resetProductForm(form);
        this.isLoading = false;
        this.showMessage('Producto agregado al panel mock.', 'success');
      },
      error: () => {
        this.isLoading = false;
        this.showMessage('No se pudo registrar el producto mock.', 'warning');
      }
    });
  }

  get activeUsersCount(): number {
    return this.users.filter((user) => user.is_active).length;
  }

  get revenueTotal(): number {
    return this.paymentTraces.reduce((total, trace) => total + trace.amount, 0);
  }

  get pendingPaymentsCount(): number {
    return this.paymentTraces.filter((trace) => trace.currentStatus !== 'Liquidado').length;
  }

  setTab(tab: AdminTab) {
    this.activeTab = tab;
  }

  private isAdminTab(fragment: string | null, tabs: AdminTab[]): fragment is AdminTab {
    return !!fragment && tabs.includes(fragment as AdminTab);
  }

  private resetProductForm(form: any) {
    this.newProduct = {
      name: '',
      description: '',
      unit: 'kg',
      price: 0,
      stock: 0,
      categoryId: 1,
      originCity: 'Cochabamba',
      imageUrl: ''
    };
    form.resetForm(this.newProduct);
  }

  private showMessage(message: string, type: 'success' | 'warning' | 'info') {
    this.message = message;
    this.messageType = type;
  }
}
