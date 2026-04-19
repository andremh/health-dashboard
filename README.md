# Health Dashboard

Personal Health Dashboard for André — tracking physical metrics, recovery, and daily performance.

**Deploy:** [Vercel](#) | **Mobile:** ✅ Responsive | **Status:** 🟡 In Development

---

## Status Atual

### ✅ Funcional
- Layout bento grid responsivo
- Mobile-first com menu hamburger
- Dark mode
- Global refresh (invalida todas as queries)
- 6 widgets base (UI)

### ⚠️ Em Desenvolvimento
- Google Fit API (OAuth configurado, sem scope fitness)
- Fitbit API (sem dados)
- Widgets com dados reais

### ❌ Pendente
- Deep Work integration
- Supplement tracking backend
- Training volume API
- Mindset Logic metrics

---

## Preview

> 📱 **Mobile-first:** Hamburger menu, header compacto, single column
> 
> 💻 **Desktop:** Sidebar completa, 3 colunas, header expandido

---

## Tech Stack

| Categoria | Tech |
|-----------|------|
| **Framework** | Next.js 14 (App Router) |
| **Linguagem** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI** | Radix UI + componentes custom |
| **Icons** | Lucide React |
| **State** | TanStack Query |
| **Deploy** | Vercel |

---

## Arquitetura

```
health-dashboard/
├── app/
│   ├── page.tsx              # Dashboard principal
│   ├── layout.tsx            # Root layout + providers
│   ├── globals.css           # Tailwind + theme vars
│   └── api/                  # API routes
│       ├── activity/
│       ├── sleep/
│       ├── health/
│       └── supplements/
├── components/
│   ├── dashboard/
│   │   ├── header.tsx        # Desktop header
│   │   ├── mobile-header.tsx # Mobile header + menu
│   │   ├── sidebar.tsx       # Navegação lateral
│   │   └── grid.tsx          # Bento grid layout
│   ├── widgets/
│   │   ├── physical-tracking-card.tsx
│   │   ├── bio-fuel-card.tsx
│   │   ├── deep-work-card.tsx
│   │   ├── mindset-logic-card.tsx
│   │   ├── health-metrics-card.tsx
│   │   └── training-volume-card.tsx
│   └── ui/
│       ├── card.tsx
│       ├── button.tsx
│       └── ...
├── hooks/
│   └── use-*.ts              # React Query hooks
├── services/
│   └── *.ts                  # API service layer
└── types/
    └── *.ts                  # TypeScript types
```

---

## Começar

### Desenvolvimento Local

```bash
# 1. Instalar dependências
npm install

# 2. Copiar environment
cp .env.example .env.local

# 3. Configurar variáveis (ver abaixo)

# 4. Rodar dev server
npm run dev
```

Acessa: `http://localhost:3000`

### Build

```bash
npm run build
npm run start
```

---

## Environment Variables

### Mínimo (UI apenas)

```bash
# Não requerido para demo UI
```

### Produção (dados reais)

```bash
# Google Fit
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=

# Fitbit
FITBIT_CLIENT_ID=
FITBIT_CLIENT_SECRET=
FITBIT_ACCESS_TOKEN=
FITBIT_REFRESH_TOKEN=

# Opcional
STRAVA_CLIENT_ID=
NOTION_API_KEY=
```

Ver `.env.example` para lista completa.

---

## Widgets

| Widget | Dados | Status |
|--------|-------|--------|
| Physical Tracking | Google Fit / Fitbit | ⚠️ UI apenas |
| Bio Fuel | Manual / MyFitnessPal | ⚠️ UI apenas |
| Deep Work | RescueTime / Manual | ❌ Pendente |
| Mindset Logic | Factual insights | ❌ Pendente |
| Health Metrics | HR, temp, sono | ⚠️ UI apenas |
| Training Volume | Strava / Manual | ❌ Pendente |

---

## Mobile

Melhorias mobile implementadas (2026-04-13):

- Menu hamburger com overlay
- Header compacto ("Health" + "André")
- Grid responsivo (1→2→3 colunas)
- Padding/gap otimizados

Ver `MOBILE_IMPROVEMENTS.md` para detalhes.

---

## Deploy (Vercel)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod
```

Ou conecta o repo no [vercel.com](https://vercel.com).

---

## Comandos Úteis

```bash
npm run dev          # Dev server
npm run build        # Build produção
npm run start        # Start produção
npm run lint         # ESLint
```

---

## Próximos Passos

1. **Google Fit** — Adicionar scope fitness ao OAuth
2. **Fitbit** — Configurar tokens
3. **Widgets** — Conectar dados reais
4. **Deep Work** — Integrar RescueTime ou tracking manual
5. **Supplements** — Backend de tracking

---

## Links

- **Mobile Improvements:** `MOBILE_IMPROVEMENTS.md`
- **API Routes:** `/api/*`
- **Vercel Dashboard:** [vercel.com](https://vercel.com)

---

**Última atualização:** 2026-04-14  
**Versão:** 0.1.0
