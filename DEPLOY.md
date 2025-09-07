# 🚀 GOGA - Deploy Instructions

## Pasos para Deploy en Vercel + Farcaster

### 1. ⚙️ Configurar Variables de Entorno en Vercel

Ve a tu proyecto en Vercel → Settings → Environment Variables y agrega:

```bash
# OnChainKit (CRÍTICO)
NEXT_PUBLIC_ONCHAINKIT_API_KEY=tu-api-key-de-coinbase
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=GOGA
NEXT_PUBLIC_URL=https://tu-app.vercel.app
NEXT_PUBLIC_ICON_URL=https://tu-icono.jpg

# Frame metadata para Farcaster
NEXT_PUBLIC_APP_HERO_IMAGE=https://tu-hero-image.jpg
NEXT_PUBLIC_SPLASH_IMAGE=https://tu-splash-image.jpg
NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR=#000000
NEXT_PUBLIC_APP_ICON=https://tu-app-icon.jpg
NEXT_PUBLIC_APP_SUBTITLE=Mini-app de clases de inglés
NEXT_PUBLIC_APP_DESCRIPTION=Aprende inglés con profesores nativos certificados
NEXT_PUBLIC_APP_PRIMARY_CATEGORY=education
NEXT_PUBLIC_APP_TAGLINE=Domina el inglés desde Farcaster
NEXT_PUBLIC_APP_OG_TITLE=GOGA - Clases de Inglés
NEXT_PUBLIC_APP_OG_DESCRIPTION=Aprende inglés con GOGA desde Farcaster
NEXT_PUBLIC_APP_OG_IMAGE=https://tu-og-image.jpg

# Redis (opcional - para notificaciones)
REDIS_URL=https://exact-kid-37632.upstash.io
REDIS_TOKEN=AZMAAAIncDE2ZTA3ZDRkZmYyZjM0NmFmYWYxYzBlZmM5ODZkNzNlNHAxMzc2MzI

# Farcaster Account Association (generar después del deploy)
FARCASTER_HEADER=se-genera-automaticamente
FARCASTER_PAYLOAD=se-genera-automaticamente
FARCASTER_SIGNATURE=se-genera-automaticamente
```

### 2. 🎯 Generar Farcaster Manifest (DESPUÉS del deploy)

Una vez desplegada la app, ejecuta:

```bash
npx create-onchain --manifest
```

Esto generará las variables FARCASTER_* que debes agregar a Vercel.

### 3. ✅ Verificar Endpoints

Tu app debe tener estos endpoints funcionando:
- `https://tu-app.vercel.app/.well-known/farcaster.json`
- `https://tu-app.vercel.app/api/notify`
- `https://tu-app.vercel.app/api/webhook`

### 4. 📱 Probar en Farcaster

1. Cast tu URL en Farcaster
2. Deberías ver el Frame con tu mini-app
3. Los usuarios pueden agregar tu app con "Add to account"

## 🔧 Contract Info

- **Address**: `0x3586Fe06206C1bea0BFb8D34cDf499f0d6173E7F`
- **Network**: Base Sepolia (testnet)
- **Plans**: Starter (0.001 ETH), Standard (0.002 ETH), Premium (0.003 ETH)

## 🚨 Checklist Pre-Deploy

- [ ] API Key de Coinbase OnChainKit obtenido
- [ ] Variables de entorno configuradas en Vercel
- [ ] Imágenes subidas y URLs actualizadas
- [ ] Contract desplegado y verificado
- [ ] Redis configurado (opcional)

## 🎉 Post-Deploy

- [ ] Generar manifest de Farcaster
- [ ] Actualizar variables FARCASTER_* en Vercel
- [ ] Probar en Farcaster
- [ ] Verificar notificaciones (si Redis está configurado)