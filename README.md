# 🚀 CRIPTO LOS ANDES - Dashboard Bitcoin

Dashboard profesional de análisis de Bitcoin en tiempo real con diseño cyberpunk y tema oscuro.

![Bitcoin Dashboard](https://img.shields.io/badge/Bitcoin-Dashboard-F7931A?style=for-the-badge&logo=bitcoin)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)

## ✨ Características

### 📊 Dashboard Principal
- **Precio en tiempo real** de Bitcoin desde CoinGecko API
- **Métricas clave**: Dominancia BTC/USDT, capitalización de mercado
- **Indicador de Fear & Greed** con animaciones
- **Gráfico de precio histórico** con Chart.js
- **Hashrate y dificultad de minería** en tiempo real

### 📚 Sección Educativa "Aprender Más"
11 temas explicados de forma sencilla (para niños de 10 años):
- ¿Qué es Bitcoin?
- ¿Qué es la Blockchain?
- ¿Qué es el Halving? (con tabla histórica)
- ¿Qué son las Altcoins? (y por qué Bitcoin es el Rey)
- ¿Es buen momento para comprar Bitcoin?
- ¿Es Bitcoin seguro o me lo pueden hackear?
- ¿Cómo se determina el precio de Bitcoin?
- ¿Qué es Lightning Network?
- ¿Qué es HODL?
- ¿Cómo explicar Bitcoin a tus padres/abuelos?
- ¿Por qué todas las monedas fiat desaparecen? (Historia del dinero)

### 📈 Análisis Técnico
- **Análisis de precio** con recomendaciones automáticas
- **Simulador DCA** (Dollar Cost Averaging)
- **Indicadores técnicos**: RSI, MACD, Bandas de Bollinger
- **Historial de transacciones** Bitcoin

### 🔐 Sección de Wallets
- Comparación de wallets (Hardware, Software, Exchanges)
- Recomendaciones de seguridad
- Enlaces a wallets populares

## 🛠️ Tecnologías

- **React 18.3** - Framework de UI
- **Vite 6.0** - Build tool ultrarrápido
- **Lucide React** - Iconos modernos
- **Chart.js** - Gráficos interactivos
- **CoinGecko API** - Datos de Bitcoin en tiempo real
- **Blockchain.info API** - Datos de hashrate y transacciones

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/criptolosandes-dash.git

# Entrar al directorio
cd criptolosandes-dash

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa del build de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
a1pro/
├── src/
│   ├── assets/          # Imágenes y recursos
│   ├── components/      # Componentes React
│   │   ├── BitcoinDashboard.jsx
│   │   ├── LearnMore.jsx
│   │   ├── WalletsSection.jsx
│   │   ├── NavigationMenu.jsx
│   │   └── ...
│   ├── App.jsx          # Componente principal
│   ├── index.css        # Estilos globales
│   └── main.jsx         # Punto de entrada
├── public/              # Archivos estáticos
├── index.html           # HTML base
└── package.json         # Dependencias
```

## 🎨 Diseño

- **Tema**: Cyberpunk oscuro con neones azules y dorados
- **Estética**: Glassmorphism con efectos de blur
- **Paleta**: 
  - Fondo: `#0b0e14`
  - Accent Bitcoin: `#F7931A`
  - Accent Blue: `#3b82f6`
  - Accent Cyan: `#06b6d4`
- **Tipografía**: Space Grotesk, JetBrains Mono

## 📱 Responsive

Totalmente optimizado para:
- 💻 Desktop (1400px+)
- 📱 Tablet (768px - 1024px)
- 📲 Mobile (<768px)

## 🔑 APIs Utilizadas

- [CoinGecko API](https://www.coingecko.com/api/documentation) - Precio y datos de mercado
- [Alternative.me Fear & Greed Index](https://alternative.me/crypto/fear-and-greed-index/) - Índice de miedo
- [Blockchain.info](https://www.blockchain.com/explorer/api) - Hashrate y transacciones
- [Mempool.space](https://mempool.space/api) - Datos de mempool

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

**Cripto Los Andes**

## 🙏 Agradecimientos

- Bitcoin Core Developers
- Satoshi Nakamoto
- Comunidad Bitcoin

---

⚡ **Recuerda**: Bitcoin es la salida. HODL con manos de diamante 💎🙌
