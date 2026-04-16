# Super Seeker 🧠

Una aplicación web moderna que permite buscar, analizar y visualizar noticias en tiempo real. Utiliza Procesamiento de Lenguaje Natural (NLP) para extraer insights profundos como análisis de sentimiento, frecuencia de palabras y tendencias.

## 📋 Descripción

Super Seeker es una herramienta integral de análisis de noticias que combina un backend robusto con una interfaz de usuario intuitiva. La aplicación permite:

- **Búsqueda de noticias** por tema en múltiples fuentes
- **Análisis textual avanzado** con NLP
- **Análisis de sentimiento** de cada artículo
- **Visualización de tendencias** mediante gráficos interactivos
- **Filtrado por categorías** predefinidas
- **Información detallada** de cada artículo con fuente y fecha

## 🛠️ Stack Tecnológico

### Backend
| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **Python** | 3.x | Lenguaje principal |
| **FastAPI** | Latest | Framework web de alto rendimiento |
| **Uvicorn** | Latest | Servidor ASGI |
| **Pandas** | Latest | Manipulación y análisis de datos |
| **NLTK** | Latest | Procesamiento de lenguaje natural |
| **NewsAPI** | v2 | Fuente de datos de noticias |

### Frontend
| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | ^19.2.4 | Librería UI |
| **Tailwind CSS** | ^3.4.19 | Estilos CSS utilitarios |
| **React Scripts** | 5.0.1 | Build tools |

## 🚀 Características Principales

✨ **Búsqueda Inteligente**
- Búsqueda por palabra clave en tiempo real
- Filtrado por categorías predefinidas

📊 **Análisis Avanzado**
- Análisis de sentimiento (Positivo/Negativo/Neutral)
- Frecuencia de palabras (Top 20)
- Análisis de bigramas (pares de palabras)
- Distribución de sentimientos

🎨 **Interfaz Moderna**
- Diseño responsivo y atractivo
- Visualización de datos con gráficos
- Cards personalizadas por artículo
- Indicadores visuales de sentimiento

## 📁 Estructura del Proyecto

```
superSeeker/
├── backend/
│   ├── app.py                 # Aplicación FastAPI principal
│   ├── news_pipeline.py       # Lógica de procesamiento de noticias
│   └── requirements.txt       # Dependencias Python
├── frontend/
│   └── super-seeker-ui/       # Aplicación React
│       ├── src/
│       │   ├── components/    # Componentes React reutilizables
│       │   ├── App.js         # Componente principal
│       │   └── index.js       # Entry point
│       ├── public/            # Archivos estáticos
│       └── package.json       # Dependencias npm
└── README.md                  # Este archivo
```

## 🔌 API Endpoints

### GET `/api/news`

Obtiene noticias y análisis para un tema específico.

**Parámetros:**
- `topic` (string, requerido): Tema de búsqueda

**Respuesta:**
```json
{
  "articles": [
    {
      "title": "string",
      "description": "string",
      "url": "string",
      "imageUrl": "string",
      "source": "string",
      "publishedAt": "string",
      "sentiment": "positive|negative|neutral"
    }
  ],
  "word_freq": [["word", count], ...],
  "bigram_freq": [["bigram", count], ...],
  "sentiment": {
    "positive": number,
    "negative": number,
    "neutral": number
  }
}
```

### GET `/analyze`

Obtiene solo el análisis de un tema sin listar artículos.

**Parámetros:**
- `topic` (string, requerido): Tema de búsqueda

## 🌐 Fuentes de Datos

Actualmente utiliza:
- **NewsAPI** (https://newsapi.org/) - Acceso a miles de fuentes de noticias globales

## ⚙️ Instalación y Despliegue Local

### Requisitos Previos
- Python 3.8+
- Node.js 14+
- npm o yarn
- Clave API de NewsAPI (obtén una gratis en https://newsapi.org)

### Opción 1: Despliegue Completo

#### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/superSeeker.git
cd superSeeker
```

#### 2. Configurar Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En macOS/Linux:
source venv/bin/activate
# En Windows:
venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Crear archivo .env con tu clave de NewsAPI
echo "NEWS_API_KEY=tu_clave_aqui" > .env

# Ejecutar servidor backend
uvicorn app:app --reload
```

El backend estará disponible en: `http://localhost:8000`

#### 3. Configurar Frontend

```bash
cd ../frontend/super-seeker-ui

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

El frontend estará disponible en: `http://localhost:3000`

### Opción 2: Solo Backend

Si prefieres solo testear el backend:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload
```

Prueba la API en: `http://localhost:8000/docs` (Swagger UI)

### Opción 3: Solo Frontend

Si prefieres solo testear el frontend:

```bash
cd frontend/super-seeker-ui
npm install
npm start
```

**Nota:** El frontend requiere que el backend esté ejecutándose en `http://localhost:8000`

## 🔧 Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/`:

```env
NEWS_API_KEY=tu_clave_api_aqui
```

Obtén tu clave gratis en: https://newsapi.org/register

## 📦 Instalación de Dependencias

### Backend
```bash
cd backend
pip install -r requirements.txt
```

### Frontend
```bash
cd frontend/super-seeker-ui
npm install
```

## 🎯 Cómo Usar

1. Inicia el servidor backend
2. Inicia el servidor frontend
3. Abre http://localhost:3000 en tu navegador
4. Busca un tema o selecciona una categoría
5. Visualiza los artículos y el análisis correspondiente

## 🚀 Despliegue a Producción

### Backend
- Usar un servidor ASGI como Gunicorn con Uvicorn
- Deployar en plataformas como Heroku, Railway, Render o AWS
- Asegurar variables de entorno en el servidor

### Frontend
- `npm run build` para crear versión optimizada
- Deployar en Vercel, Netlify, GitHub Pages o AWS S3

## 🔮 Futuras Mejoras

### Diseño UI/UX
- [ ] Rediseño completo de la interfaz con componentes más modernos
- [ ] Modo oscuro/claro configurable
- [ ] Animaciones y transiciones mejoradas
- [ ] Dashboard personalizable
- [ ] Temas de color opcionales

### Nuevas Funcionalidades
- [ ] Guardado de búsquedas favoritas
- [ ] Historial de búsquedas
- [ ] Exportar datos a PDF/CSV
- [ ] Alertas personalizadas por tema
- [ ] Comparación de tendencias entre temas
- [ ] Análisis temporal (gráficos de tendencia en el tiempo)
- [ ] Integración con redes sociales
- [ ] Sistema de recomendaciones
- [ ] Búsqueda avanzada con filtros
- [ ] Clasificación automática de noticias por relevancia

### Nuevas Fuentes de Información
- [ ] BBC News
- [ ] Reuters
- [ ] The Guardian
- [ ] NYTimes (con API)
- [ ] Medium
- [ ] Dev.to
- [ ] Reddit
- [ ] Twitter/X
- [ ] Blogs RSS personalizados
- [ ] Fuentes locales internacionales

### Mejoras Técnicas
- [ ] Caché de resultados
- [ ] Rate limiting mejorado
- [ ] Validación de entrada más robusta
- [ ] Tests unitarios e integración
- [ ] Dockerización
- [ ] CI/CD pipeline
- [ ] Logging y monitoreo
- [ ] Base de datos para persistencia
- [ ] Autenticación de usuarios
- [ ] API versioning

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado por [Tu Nombre/Equipo]

## 📞 Contacto y Soporte

Para reportar bugs o sugerencias, abre un issue en el repositorio.