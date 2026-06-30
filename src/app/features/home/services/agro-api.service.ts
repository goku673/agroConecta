import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/agriculture.models';
import { MOCK_PRODUCTS } from '../data/agriculture.data';

interface ApiProduct {
  id: string;
  name: string;
  description?: string;
  unit: string;
  price: string | number;
  stock: string | number;
  image_url?: string;
  origin_city?: string;
  is_available: boolean;
  category_name?: string;
  producer_name?: string;
  created_at?: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    full_name: string;
    email: string;
    role: string;
  };
}

interface ApiUser {
  id: string;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

interface ApiPerson {
  id: string;
  document_number?: string;
  phone?: string;
  city?: string;
  address?: string;
  person_type: string;
  full_name?: string;
  email?: string;
  created_at: string;
}

interface CreateProductPayload {
  name: string;
  description?: string;
  unit: string;
  price: number;
  stock: number;
  categoryId?: number;
  producerId?: string | null;
  imageUrl?: string;
  originCity?: string;
  isAvailable?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AgroApiService {
  private token: string | null = localStorage.getItem('agro_token') || 'mock-token';
  private products: Product[] = [...MOCK_PRODUCTS];
  private users: ApiUser[] = [
    { id: 'u-001', full_name: 'Camila Duarte', email: 'admin@agroconecta.local', role: 'admin', is_active: true, created_at: '2026-05-01' },
    { id: 'u-002', full_name: 'Juan Pérez', email: 'juan.productor@demo.local', role: 'productor', is_active: true, created_at: '2026-05-08' },
    { id: 'u-003', full_name: 'Restaurante El Molino', email: 'compras@elmolino.local', role: 'comprador', is_active: true, created_at: '2026-05-13' },
    { id: 'u-004', full_name: 'Operador Calatayud', email: 'calatayud@demo.local', role: 'operador', is_active: false, created_at: '2026-05-20' }
  ];
  private people: ApiPerson[] = [
    { id: 'p-001', full_name: 'Juan Pérez', email: 'juan.productor@demo.local', document_number: '7894561', phone: '70700011', city: 'Villa de Leyva', address: 'Vereda Centro', person_type: 'Productor', created_at: '2026-05-08' },
    { id: 'p-002', full_name: 'María Gómez', email: 'maria@demo.local', document_number: '4512789', phone: '70700022', city: 'Pasto', address: 'Zona rural norte', person_type: 'Productor', created_at: '2026-05-12' },
    { id: 'p-003', full_name: 'Restaurante El Molino', email: 'compras@elmolino.local', document_number: '900112233', phone: '70700033', city: 'Cochabamba', address: 'Av. America 240', person_type: 'Comprador', created_at: '2026-05-13' }
  ];

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of([...this.products]);
  }

  login(email = 'admin@agroconecta.local', password = '123456'): Observable<LoginResponse> {
    const response: LoginResponse = {
      token: `mock-token-${Date.now()}`,
      user: {
        id: 'u-001',
        full_name: email.split('@')[0] || 'Administrador Demo',
        email,
        role: 'admin'
      }
    };

    this.token = response.token;
    localStorage.setItem('agro_token', response.token);
    localStorage.setItem('agro_user', JSON.stringify(response.user));
    return of(response);
  }

  createProduct(payload: CreateProductPayload): Observable<Product> {
    const categoryMap: Record<number, string> = {
      1: 'Hortalizas',
      2: 'Frutas',
      3: 'Granos',
      4: 'Insumos'
    };
    const product: Product = {
      id: `prod-${Date.now()}`,
      name: payload.name,
      category: categoryMap[payload.categoryId || 1] || 'Hortalizas',
      description: payload.description,
      imageUrl: payload.imageUrl,
      price: Number(payload.price),
      unit: payload.unit,
      producer: 'Productor demo',
      origin: payload.originCity || 'Cochabamba',
      harvestDate: new Date().toISOString().slice(0, 10),
      stock: Number(payload.stock),
      qualityStatus: 'Fresco',
      cropType: 'Tradicional',
      logisticStatus: payload.isAvailable ? 'Listo para Entrega' : 'En Centro de Acopio',
      qrCodeSimulated: `AGRO-${payload.name.substring(0, 3).toUpperCase()}-MOCK-${String(this.products.length + 1).padStart(3, '0')}`,
      batchCode: `LOTE-${Date.now()}`
    };

    this.products = [product, ...this.products];
    return of(product);
  }

  getUsers(): Observable<ApiUser[]> {
    return of([...this.users]);
  }

  getPeople(): Observable<ApiPerson[]> {
    return of([...this.people]);
  }

  getStoredUser(): LoginResponse['user'] | null {
    const rawUser = localStorage.getItem('agro_user');
    return rawUser ? JSON.parse(rawUser) : null;
  }

  getToken(): string | null {
    return this.token;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('agro_token');
    localStorage.removeItem('agro_user');
  }
}
