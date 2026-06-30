# Resumen de Expansión de Datos Mock - AgroConecta

## Descripción General
Se ha expandido significativamente la batería de datos mock del proyecto AgroConecta para proporcionar una experiencia más realista y completa con datos de prueba. La expansión incluye productos, puntos de entrega, trazas de pago, usuarios y personas.

---

## 📦 Productos (MOCK_PRODUCTS)

### Antes
- 6 productos

### Ahora
- **24 productos** con variedad de categorías

### Productos por Categoría:
| Categoría | Cantidad | Ejemplos |
|-----------|----------|----------|
| Verduras | 6 | Tomate Chonto, Brócoli, Pimiento Rojo, Pepino, etc. |
| Frutas | 5 | Fresas, Moras, Manzana Fuji, Naranja Valencia, Aguacate |
| Tubérculos | 5 | Papa Pastusa, Zanahoria, Remolacha, Camote |
| Hortalizas | 3 | Lechuga Crespa, Espinaca, Lechuga Romana |
| Granos | 1 | Maíz Choclo |
| Condimentos | 1 | Ajo Blanco |
| Hierbas | 2 | Cebollino, Cilantro |
| Proteína | 1 | Huevo Campesino |

### Características Añadidas:
- Descripciones detalladas para cada producto
- Fechas de cosecha realistas (2026-06-20 a 2026-06-27)
- Precios variados (800 - 5000 por unidad)
- Stock realista (28 - 320 unidades)
- Estados de calidad variados (Premium, Fresco, Maduro, Excelente)
- Tipos de cultivo variados (Orgánico, Ecológico, Tradicional)
- Estados logísticos diversos

---

## 🚚 Puntos de Entrega (MOCK_DELIVERY_POINTS)

### Antes
- 3 puntos de entrega

### Ahora
- **10 puntos de entrega** estratégicamente distribuidos

### Puntos Disponibles:

| ID | Nombre | Ubicación | Horario | Estado |
|----|--------|-----------|---------|--------|
| pt-01 | Plaza 14 de Septiembre | Centro histórico | Lun-Vie: 08:00-14:00 | Activo |
| pt-02 | Mercado Campesino Calatayud | Av. República | Mié/Sáb: 09:00-17:00 | Activo |
| pt-03 | UMSS - Punto Universitario | Av. Oquendo | Mar/Jue: 10:00-16:00 | Activo |
| pt-04 | Centro Comercial Avenida | Av. Aroma 2300 | Diario: 10:00-20:00 | Activo |
| pt-05 | Supermercado El Bosque | Quillacollo | Lun-Sáb: 08:00-18:00 | Activo |
| pt-06 | Feria Dominical de Abastos | Parque Municipal | Domingo: 06:00-14:00 | Activo |
| pt-07 | Hub Logístico Centro Acopio | Av. Industrial | Lun-Vie: 07:00-18:00 | **Saturado** |
| pt-08 | Tienda Naturista Verde Vida | Calle Espíritu Santo | Lun-Sáb: 09:00-19:00 | Activo |
| pt-09 | Restaurante La Chakana | Calle Jordán | Mar-Dom: 11:00-22:00 | Activo |
| pt-10 | Oficina Central AgroConecta | Av. Circunvalación | Lun-Vie: 08:00-17:00 | **Cerrado** |

### Estados Incluidos:
- ✅ Activo (8 puntos)
- ⚠️ Saturado (1 punto)
- ❌ Cerrado (1 punto)

---

## 💳 Trazas de Pago (MOCK_PAYMENT_TRACES)

### Antes
- 3 trazas de pago

### Ahora
- **24 trazas de pago** con estados variados

### Distribución por Estado Actual:

| Estado | Cantidad | Descripción |
|--------|----------|-------------|
| Liquidado | 9 | Transacciones completadas y pagadas |
| Pago confirmado | 5 | Pagos recibidos, pendiente entrega |
| En conciliación | 10 | En proceso de validación y liquidación |

### Métodos de Pago Incluidos:
- 🔳 QR Bancario (10 trazas)
- 🏦 Transferencia Bancaria (8 trazas)
- 💵 Efectivo en punto (6 trazas)

### Montos Transaccionales:
- Rango: 41,800 - 475,000 (moneda local)
- Promedio: ~130,000
- Total agregado: >3 millones

### Compradores Incluidos:
- Restaurante El Molino
- Familia Rojas
- Tienda Natural Vida
- Supermercado Hipermaxi
- Hotel Presidente
- Restaurante Vegetariano Zen
- Mercado Saludable
- Juguería Tropical
- Café Literario
- Y más...

### Productores en Trazas:
- Juan Pérez (5 transacciones)
- María Gómez (4 transacciones)
- Elena Torres (4 transacciones)
- Carlos Ruiz (3 transacciones)
- Roberto Silva (3 transacciones)
- Luisa Mora (3 transacciones)

---

## 👥 Usuarios (ApiUser)

### Antes
- 4 usuarios

### Ahora
- **19 usuarios** con roles variados

### Distribución por Rol:

| Rol | Cantidad | Ejemplos |
|-----|----------|----------|
| Productor | 7 | Juan Pérez, María Gómez, Elena Torres, Carlos Ruiz, Roberto Silva, Luisa Mora |
| Comprador | 9 | Restaurantes, supermercados, tiendas naturistas, juquerías |
| Operador | 2 | Operador Plaza Central, Operador Mercado Abastos |
| Admin | 2 | Camila Duarte, Administrador Regional Sur |

### Estados de Usuarios:
- Activos: 18
- Inactivos: 1

---

## 👤 Personas (ApiPerson)

### Antes
- 3 personas

### Ahora
- **19 personas** con información detallada

### Tipos de Personas:
- Productores (7)
- Compradores/Negocios (9)
- Administradores (1)
- Consumidores (2)

### Información Completa por Persona:
- Documento de identidad
- Teléfono de contacto
- Ciudad/Ubicación
- Dirección específica
- Email de contacto
- Tipo de persona
- Fecha de registro

---

## 🎯 Impacto y Beneficios

### Realismo Aumentado
✅ Datos representan escenarios reales de operación
✅ Múltiples variantes de productos agrícolas
✅ Transacciones variadas con estados realistas
✅ Red de compradores y productores diversa

### Mejor Testing
✅ Mayor cobertura de casos de uso
✅ Posibilidad de probar filtros con más opciones
✅ Validar comportamiento con grandes conjuntos de datos
✅ Simular cuellos de botella (punto saturado/cerrado)

### UX Mejorada
✅ Más opciones para explorar
✅ Experiencia más cercana a producción
✅ Dashboards con números significativos
✅ Trazas de pago con narrativas completas

---

## 📊 Estadísticas de Expansión

| Elemento | Incremento |
|----------|-----------|
| Productos | +300% (6 → 24) |
| Puntos de entrega | +233% (3 → 10) |
| Trazas de pago | +700% (3 → 24) |
| Usuarios | +375% (4 → 19) |
| Personas | +533% (3 → 19) |

---

## 📂 Archivos Modificados

1. **src/app/features/home/data/agriculture.data.ts**
   - MOCK_PRODUCTS: 6 → 24 productos
   - MOCK_DELIVERY_POINTS: 3 → 10 puntos
   - MOCK_PAYMENT_TRACES: 3 → 24 trazas

2. **src/app/features/home/services/agro-api.service.ts**
   - ApiUser[]: 4 → 19 usuarios
   - ApiPerson[]: 3 → 19 personas

---

## ✅ Estado del Proyecto

- **Compilación:** ✅ Exitosa
- **Servidor:** ✅ Funcionando (http://localhost:4200)
- **Datos Mock:** ✅ Completamente integrados
- **Compatibilidad:** ✅ Mantiene retrocompatibilidad con código existente

---

## 🚀 Próximos Pasos Sugeridos

1. Explorar el catálogo expandido en la interfaz
2. Probar filtros por categoría con más opciones
3. Verificar comportamiento con puntos saturados/cerrados
4. Revisar trazas de pago con diferentes estados
5. Validar estadísticas del dashboard con nuevos números

---

**Fecha de Actualización:** 2026-06-28  
**Versión de Datos Mock:** 2.0
