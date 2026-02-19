# Ejercicio-3: Sistema de Reservas

Proyecto Vue 3 + TypeScript + Pinia para gestión de reservas de restaurante.

## Requisitos Previos

- Node.js (v16+)
- npm

## Instalación

```bash
# Instalar dependencias
npm install
```

## Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

## Testing

```bash
# Ejecutar tests unitarios (Vitest)
npm test
```

## Documentación

La documentación está construida con VuePress.

```bash
# Iniciar servidor de documentación
npm run docs:dev

# Construir documentación estática
npm run docs:build
```

## Estructura del Proyecto

- `src/stores`: Lógica de negocio (Pinia).
- `src/components`: Componentes UI (Table, Map, Form).
- `src/types`: Definiciones TypeScript.
- `tests`: Pruebas Vitest.

## Notas de Implementación

- Se ha puesto foco en la accesibilidad (A11y) en el componente `Table`.
- Validaciones robustas en el formulario de reserva.
- Gestión de estado global centralizada en `useRestaurantStore`.
