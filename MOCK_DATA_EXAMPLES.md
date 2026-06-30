# Ejemplos de Uso - Datos Mock Expandidos

## Productos Destacados

### Productos Orgánicos Premium
```typescript
// Productos con certificación Orgánico + Premium
const organicProducts = MOCK_PRODUCTS.filter(p => 
  p.cropType === 'Orgánico' && p.qualityStatus === 'Premium'
);

// Resultado: Tomate Chonto, Lechuga Crespa, Espinaca, Cilantro, etc.
```

### Frutas en Excelente Estado
```typescript
const premiumFruits = MOCK_PRODUCTS.filter(p => 
  p.category === 'Frutas' && p.qualityStatus === 'Excelente'
);

// Resultado: Fresas del Bosque, Manzana Fuji, Camote Naranja
```

### Productos Listos para Entrega
```typescript
const readyForDelivery = MOCK_PRODUCTS.filter(p => 
  p.logisticStatus === 'Listo para Entrega'
);

// Resultado: 9 productos disponibles inmediatamente
```

### Productos con Bajo Stock (<40 unidades)
```typescript
const lowStock = MOCK_PRODUCTS.filter(p => p.stock < 40);

// Resultado: Productos que necesitan reabastecimiento urgente
```

---

## Puntos de Entrega

### Puntos Abiertos Este Fin de Semana
```typescript
const weekendPoints = MOCK_DELIVERY_POINTS.filter(p => 
  p.status === 'Activo' && 
  (p.schedule.includes('Sábado') || p.schedule.includes('Domingo'))
);

// Resultado: 3-4 puntos abiertos (Feria Dominical, Centro Comercial, etc.)
```

### Puntos en Crisis
```typescript
const problematicPoints = MOCK_DELIVERY_POINTS.filter(p => 
  p.status !== 'Activo'
);

// Hub Logístico Centro Acopio (SATURADO) - Necesita redistribución
// Oficina Central (CERRADO) - Requiere atención
```

### Mapeo de Localización
```typescript
// Los puntos incluyen coordenadas lat/lng para mapeo
const punto = MOCK_DELIVERY_POINTS[0];
console.log(`${punto.name}: ${punto.lat}, ${punto.lng}`);
// Plaza 14 de Septiembre: -17.3936, -66.1570
```

---

## Trazas de Pago

### Transacciones Completadas Hoy
```typescript
const todayCompleted = MOCK_PAYMENT_TRACES.filter(t => 
  t.currentStatus === 'Liquidado'
);

console.log(`Ingresos liquidados: ${todayCompleted.reduce((s, t) => s + t.amount, 0)}`);
// Ingresos liquidados: ~1,200,000+
```

### Pagos en Validación
```typescript
const underReview = MOCK_PAYMENT_TRACES.filter(t => 
  t.currentStatus === 'En conciliacion'
);

const totalPending = underReview.reduce((s, t) => s + t.amount, 0);
console.log(`En espera de validación: ${totalPending}`);
```

### Órdenes por Método de Pago
```typescript
const byMethod = {
  qr: MOCK_PAYMENT_TRACES.filter(t => t.method.includes('QR')),
  transfer: MOCK_PAYMENT_TRACES.filter(t => t.method.includes('Transferencia')),
  cash: MOCK_PAYMENT_TRACES.filter(t => t.method.includes('Efectivo'))
};

console.log(`QR: ${byMethod.qr.length} | Transferencia: ${byMethod.transfer.length} | Efectivo: ${byMethod.cash.length}`);
// QR: 10 | Transferencia: 8 | Efectivo: 6
```

### Top Productores por Ingresos
```typescript
const producerRevenue = {};
MOCK_PAYMENT_TRACES.forEach(trace => {
  if (!producerRevenue[trace.producer]) producerRevenue[trace.producer] = 0;
  producerRevenue[trace.producer] += trace.amount;
});

const sorted = Object.entries(producerRevenue)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);

// Juan Pérez: ~430,000
// Elena Torres: ~350,000
// María Gómez: ~450,000
// etc.
```

### Pasos de Transacción Desagregados
```typescript
// Ver progresión de una transacción
const trace = MOCK_PAYMENT_TRACES[0];
trace.steps.forEach(step => {
  console.log(`[${step.status}] ${step.title} - ${step.date}`);
  console.log(`  ${step.description}`);
});
```

---

## Usuarios y Personas

### Productores Activos
```typescript
const activeProducers = users.filter(u => 
  u.role === 'productor' && u.is_active
);

// Resultado: 7 productores registrados y activos
```

### Datos de Contacto para Comprador
```typescript
const buyer = people.find(p => p.full_name.includes('Supermercado'));
console.log(`
  Negocio: ${buyer.full_name}
  Tel: ${buyer.phone}
  Ciudad: ${buyer.city}
  Dirección: ${buyer.address}
  Email: ${buyer.email}
`);
```

### Distribución Geográfica
```typescript
const byCity = {};
people.forEach(p => {
  if (!byCity[p.city]) byCity[p.city] = [];
  byCity[p.city].push(p.full_name);
});

// Cochabamba: 12 registros
// Nariño (Pasto): 2 registros
// Boyacá: 3 registros
// etc.
```

---

## Análisis de Datos

### Dashboard KPIs
```typescript
const stats = {
  totalProducts: MOCK_PRODUCTS.length,           // 24
  totalProducers: new Set(MOCK_PRODUCTS.map(p => p.producer)).size, // 7
  averagePrice: MOCK_PRODUCTS.reduce((s, p) => s + p.price, 0) / MOCK_PRODUCTS.length,
  totalStock: MOCK_PRODUCTS.reduce((s, p) => s + p.stock, 0), // 1,700+
  deliveryPoints: MOCK_DELIVERY_POINTS.length,  // 10
  totalTransactions: MOCK_PAYMENT_TRACES.length, // 24
  totalRevenue: MOCK_PAYMENT_TRACES.reduce((s, t) => s + t.amount, 0) // 3M+
};
```

### Productos por Punto de Entrega Simulado
```typescript
// Análisis de productos listos para cada punto
const pointAnalysis = MOCK_DELIVERY_POINTS
  .filter(pt => pt.status === 'Activo')
  .map(pt => ({
    punto: pt.name,
    productoDisponible: MOCK_PRODUCTS.filter(p => 
      p.logisticStatus === 'Listo para Entrega'
    ).length
  }));

// Cada punto podría tener acceso a productos listos
```

### Rendimiento de Métodos de Pago
```typescript
const methodPerformance = {
  qr: {
    count: MOCK_PAYMENT_TRACES.filter(t => t.method.includes('QR')).length,
    avgTime: 'Inmediato',
    status: 'Más rápido'
  },
  transfer: {
    count: MOCK_PAYMENT_TRACES.filter(t => t.method.includes('Transferencia')).length,
    avgTime: '1-2 horas',
    status: 'Requiere validación'
  },
  cash: {
    count: MOCK_PAYMENT_TRACES.filter(t => t.method.includes('Efectivo')).length,
    avgTime: 'Al retiro',
    status: 'En punto de entrega'
  }
};
```

---

## Casos de Uso Realistas

### Caso 1: Buscar Productos Orgánicos en Stock
```typescript
const organicInStock = MOCK_PRODUCTS.filter(p => 
  p.cropType === 'Orgánico' && 
  p.stock > 0 && 
  (p.logisticStatus === 'Listo para Entrega' || p.logisticStatus === 'En Ruta')
);

// Resultado: Tomate Chonto, Lechuga, Brócoli, Espinaca, Cilantro
```

### Caso 2: Ordenar por Disponibilidad Inmediata
```typescript
const immediate = MOCK_PRODUCTS
  .filter(p => p.logisticStatus === 'Listo para Entrega' && p.stock > 10)
  .sort((a, b) => b.stock - a.stock);

// Los primero 5 productos más disponibles ahora
```

### Caso 3: Análisis de Trazabilidad de Pedido
```typescript
const orderTrace = MOCK_PAYMENT_TRACES.find(t => t.orderCode === 'ORD-2606-1842');

// Ver progresión completa desde orden hasta liquidación
orderTrace.steps.forEach((step, i) => {
  console.log(`${i + 1}. ${step.title}: ${step.status}`);
});
```

### Caso 4: Encontrar Puntos de Retiro Disponibles
```typescript
const availablePoints = MOCK_DELIVERY_POINTS.filter(p => 
  p.status === 'Activo' && p.schedule.includes('Hoy')
);

// Mostrar puntos donde comprador puede retirar hoy
```

### Caso 5: Validar Transferencia Bancaria
```typescript
const transfer = MOCK_PAYMENT_TRACES.find(t => t.method.includes('Transferencia'));

// Buscar paso de validación
const validationStep = transfer.steps.find(s => s.title.includes('Validación'));
console.log(`Estado: ${validationStep.status}`);
console.log(`Actor: ${validationStep.actor}`);
```

---

## Tips de Testing

### Test 1: Filtrado de Productos
```typescript
// Verificar que los filtros funcionen con 24 productos
it('should filter organic vegetables', () => {
  const filtered = MOCK_PRODUCTS.filter(p => 
    p.cropType === 'Orgánico' && p.category === 'Verduras'
  );
  expect(filtered.length).toBeGreaterThan(0);
});
```

### Test 2: Estados de Puntos de Entrega
```typescript
// Verificar manejo de puntos saturados/cerrados
it('should handle inactive delivery points', () => {
  const inactive = MOCK_DELIVERY_POINTS.filter(p => p.status !== 'Activo');
  expect(inactive.length).toBe(2);
});
```

### Test 3: Consistencia de Referencias
```typescript
// Validar que productosmencionados en trazas existan
it('should have valid product references in traces', () => {
  MOCK_PAYMENT_TRACES.forEach(trace => {
    const productExists = MOCK_PRODUCTS.some(p => 
      p.name.includes(trace.product.split(' ')[0])
    );
    expect(productExists).toBeTruthy();
  });
});
```

---

## Notas Importantes

- ✅ Todos los datos están diseñados para ser realistas
- ✅ Las fechas son consistentes (2026-06-20 a 2026-06-28)
- ✅ Los IDs siguen patrones consistentes (prod-01, pt-01, pay-001, etc.)
- ✅ Los montos de pago incluyen comisiones administrativas (5% típico)
- ✅ Los productores aparecen múltiples veces en trazas (como en realidad)
- ✅ Hay variedad de estados para testing exhaustivo

---

**Última actualización:** 2026-06-28  
**Versión de Datos:** 2.0
