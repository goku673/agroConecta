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
    { id: 'u-004', full_name: 'Operador Calatayud', email: 'calatayud@demo.local', role: 'operador', is_active: false, created_at: '2026-05-20' },
    { id: 'u-005', full_name: 'María Gómez', email: 'maria.gomez@demo.local', role: 'productor', is_active: true, created_at: '2026-05-12' },
    { id: 'u-006', full_name: 'Elena Torres', email: 'elena.torres@demo.local', role: 'productor', is_active: true, created_at: '2026-05-15' },
    { id: 'u-007', full_name: 'Carlos Ruiz', email: 'carlos.ruiz@demo.local', role: 'productor', is_active: true, created_at: '2026-05-18' },
    { id: 'u-008', full_name: 'Roberto Silva', email: 'roberto.silva@demo.local', role: 'productor', is_active: true, created_at: '2026-05-22' },
    { id: 'u-009', full_name: 'Luisa Mora', email: 'luisa.mora@demo.local', role: 'productor', is_active: true, created_at: '2026-05-25' },
    { id: 'u-010', full_name: 'Supermercado Hipermaxi', email: 'compras@hipermaxi.local', role: 'comprador', is_active: true, created_at: '2026-05-30' },
    { id: 'u-011', full_name: 'Hotel Presidente', email: 'compras@hotelpreidente.local', role: 'comprador', is_active: true, created_at: '2026-06-02' },
    { id: 'u-012', full_name: 'Tienda Natural Vida', email: 'info@naturalvida.local', role: 'comprador', is_active: true, created_at: '2026-06-05' },
    { id: 'u-013', full_name: 'Mercado Saludable', email: 'admin@mercadosaludable.local', role: 'comprador', is_active: true, created_at: '2026-06-08' },
    { id: 'u-014', full_name: 'Juguería Tropical', email: 'info@jugueriatropical.local', role: 'comprador', is_active: true, created_at: '2026-06-11' },
    { id: 'u-015', full_name: 'Operador Plaza Central', email: 'plaza.central@demo.local', role: 'operador', is_active: true, created_at: '2026-06-14' },
    { id: 'u-016', full_name: 'Operador Mercado Abastos', email: 'abastos@demo.local', role: 'operador', is_active: true, created_at: '2026-06-17' },
    { id: 'u-017', full_name: 'Administrador Regional Sur', email: 'admin.sur@agroconecta.local', role: 'admin', is_active: true, created_at: '2026-06-01' },
    { id: 'u-018', full_name: 'Café Literario', email: 'info@cafeliterario.local', role: 'comprador', is_active: true, created_at: '2026-06-20' },
    { id: 'u-019', full_name: 'Panadería Artesanal El Horno', email: 'ventas@elhorno.local', role: 'comprador', is_active: true, created_at: '2026-06-23' }
  ];
  private people: ApiPerson[] = [
    { id: 'p-001', full_name: 'Juan Pérez', email: 'juan.productor@demo.local', document_number: '7894561', phone: '70700011', city: 'Villa de Leyva', address: 'Vereda Centro', person_type: 'Productor', created_at: '2026-05-08' },
    { id: 'p-002', full_name: 'María Gómez', email: 'maria@demo.local', document_number: '4512789', phone: '70700022', city: 'Pasto', address: 'Zona rural norte', person_type: 'Productor', created_at: '2026-05-12' },
    { id: 'p-003', full_name: 'Restaurante El Molino', email: 'compras@elmolino.local', document_number: '900112233', phone: '70700033', city: 'Cochabamba', address: 'Av. América 240', person_type: 'Comprador', created_at: '2026-05-13' },
    { id: 'p-004', full_name: 'Elena Torres', email: 'elena.torres@demo.local', document_number: '9876543', phone: '70700044', city: 'Pamplona', address: 'Finca La Esperanza', person_type: 'Productor', created_at: '2026-05-15' },
    { id: 'p-005', full_name: 'Carlos Ruiz', email: 'carlos.ruiz@demo.local', document_number: '5432109', phone: '70700055', city: 'Sopó', address: 'Cultivos Hidropónicos CR', person_type: 'Productor', created_at: '2026-05-18' },
    { id: 'p-006', full_name: 'Roberto Silva', email: 'roberto.silva@demo.local', document_number: '8765432', phone: '70700066', city: 'Duitama', address: 'Granja Familiar Silva', person_type: 'Productor', created_at: '2026-05-22' },
    { id: 'p-007', full_name: 'Luisa Mora', email: 'luisa.mora@demo.local', document_number: '3456789', phone: '70700077', city: 'Guasca', address: 'Bosque de Fresas', person_type: 'Productor', created_at: '2026-05-25' },
    { id: 'p-008', full_name: 'Supermercado Hipermaxi', email: 'compras@hipermaxi.local', document_number: '890001234', phone: '70700088', city: 'Cochabamba', address: 'Av. Costanera 1500', person_type: 'Comprador', created_at: '2026-05-30' },
    { id: 'p-009', full_name: 'Hotel Presidente', email: 'compras@hotelpreidente.local', document_number: '890005678', phone: '70700099', city: 'Cochabamba', address: 'Calle Comercial 800', person_type: 'Comprador', created_at: '2026-06-02' },
    { id: 'p-010', full_name: 'Tienda Natural Vida', email: 'info@naturalvida.local', document_number: '890009012', phone: '70700100', city: 'Cochabamba', address: 'Centro Naturista', person_type: 'Comprador', created_at: '2026-06-05' },
    { id: 'p-011', full_name: 'Mercado Saludable', email: 'admin@mercadosaludable.local', document_number: '890003456', phone: '70700111', city: 'Cochabamba', address: 'Sector Este', person_type: 'Comprador', created_at: '2026-06-08' },
    { id: 'p-012', full_name: 'Juguería Tropical', email: 'info@jugueriatropical.local', document_number: '890007890', phone: '70700122', city: 'Cochabamba', address: 'Zona Centro', person_type: 'Comprador', created_at: '2026-06-11' },
    { id: 'p-013', full_name: 'Café Literario', email: 'info@cafeliterario.local', document_number: '890011234', phone: '70700133', city: 'Cochabamba', address: 'Plazoleta Artística', person_type: 'Comprador', created_at: '2026-06-20' },
    { id: 'p-014', full_name: 'Panadería Artesanal El Horno', email: 'ventas@elhorno.local', document_number: '890015678', phone: '70700144', city: 'Cochabamba', address: 'Zona tradicional', person_type: 'Comprador', created_at: '2026-06-23' },
    { id: 'p-015', full_name: 'Camila Duarte', email: 'admin@agroconecta.local', document_number: '9234567', phone: '70700010', city: 'Cochabamba', address: 'Av. Circunvalación 1000', person_type: 'Administrador', created_at: '2026-05-01' },
    { id: 'p-016', full_name: 'Familia Rojas', email: 'familia.rojas@demo.local', document_number: '7123456', phone: '70700145', city: 'Cochabamba', address: 'Sector Residencial', person_type: 'Consumidor', created_at: '2026-06-15' },
    { id: 'p-017', full_name: 'Restaurant Vegetariano Zen', email: 'info@zenveg.local', document_number: '890019012', phone: '70700156', city: 'Cochabamba', address: 'Centro Cultural', person_type: 'Comprador', created_at: '2026-06-25' },
    { id: 'p-018', full_name: 'Restaurante Fusión', email: 'info@restaurantefusion.local', document_number: '890023456', phone: '70700167', city: 'Cochabamba', address: 'Zona Gastronómica', person_type: 'Comprador', created_at: '2026-06-24' },
    { id: 'p-019', full_name: 'Ensaladas Frescas Express', email: 'info@ensaladasepress.local', document_number: '890027890', phone: '70700178', city: 'Cochabamba', address: 'Mall Central', person_type: 'Comprador', created_at: '2026-06-22' }
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
