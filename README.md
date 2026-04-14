# DentalCare Pro - Clínica Dental

Sistema profesional de gestión de clínica dental con landing page y portal de administración.

## 🦀 Características

### Landing Page Pública
- Hero con diseño moderno y gradientes
- Sección de servicios con precios
- Estadísticas de la clínica
- Equipo médico
- Testimonios de pacientes
- Formulario de contacto
- Footer completo

### Portal de Gestión (Dashboard)
- **Autenticación** - Login con roles (admin, doctor, recepcionista)
- **Panel Principal** - Métricas, citas del día, actividad reciente, acciones rápidas
- **Pacientes** - CRUD completo con búsqueda y filtros
- **Citas** - Calendario, crear, editar, cambiar estado
- **Historiales Médicos** - Registros clínicos por paciente con diagnóstico, tratamiento, prescripción
- **Tratamientos** - Catálogo con precios, categorías, toggle activo/inactivo
- **Facturación** - Facturas, estados de pago, resumen financiero

## 🚀 Tech Stack

- **Next.js 15** - App Router, React Server Components
- **TypeScript** - Tipado completo
- **Tailwind CSS v4** - Estilos modernos
- **Context API** - Estado global (auth + datos)
- **Mock Data** - Datos de ejemplo completos

## 📦 Instalación

```bash
npm install
npm run dev
```

## 🔑 Cuentas de prueba

| Email | Contraseña | Rol |
|-------|-----------|-----|
| admin@dental.com | admin123 | Administrador |
| doctor@dental.com | doctor123 | Doctor |
| recepcion@dental.com | recepcion123 | Recepción |

## 🌐 Deploy

Desplegado en Vercel: https://dentalcare-pro.vercel.app

## 📁 Estructura

```
src/
├── app/
│   ├── (landing)/          # Landing page pública
│   │   └── page.tsx
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── login/      # Página de login
│   │       ├── overview/   # Panel principal
│   │       ├── patients/   # Gestión pacientes
│   │       ├── appointments/ # Gestión citas
│   │       ├── records/    # Historiales médicos
│   │       ├── treatments/ # Catálogo tratamientos
│   │       └── billing/    # Facturación
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx            # Landing
├── components/
│   ├── landing/            # Componentes landing page
│   └── dashboard/          # Componentes dashboard
├── context/
│   ├── AuthContext.tsx     # Autenticación
│   └── DataContext.tsx     # Datos globales
└── lib/
```

## 📄 License

MIT
