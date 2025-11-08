# 💻 Frontend – TechTest Products CRUD

Interfaz web desarrollada con **React + Vite + Tailwind CSS** para consumir la API de productos del backend .NET.

---

## 🚀 Tecnologías utilizadas

| Componente | Descripción |
|-------------|--------------|
| React + Vite | Framework de desarrollo rápido y ligero |
| TypeScript | Tipado estático para mayor robustez |
| Tailwind CSS | Framework de estilos utilitario |
| Fetch API | Comunicación con el backend REST |
| Vite Proxy / CORS | Configuración para desarrollo local |

---

## ⚙️ Instalación y ejecución

1️⃣ Clonar el repositorio y entrar al frontend
```bash
cd frontend
npm install
```

2️⃣ Ejecutar el entorno de desarrollo
```bash
npm run dev
```
> La app se ejecutará por defecto en: [http://localhost:5173](http://localhost:5173)

3️⃣ Backend necesario
> Asegúrate de tener el backend .NET ejecutándose en [http://localhost:5132](http://localhost:5132)

---

## 📁 Estructura del proyecto

```
frontend/
 ├── src/
 │    ├── ProductsApp.tsx        # Componente principal (CRUD completo)
 │    ├── main.tsx               # Punto de entrada
 │    ├── index.css              # Estilos globales con Tailwind
 │    └── ...otros archivos
 ├── public/
 ├── vite.config.ts              # Configuración de proxy y build
 ├── package.json
 └── README.md
```

---

## ⚙️ Configuración del Proxy (opcional)

Para evitar problemas de **CORS** durante desarrollo, puedes usar el proxy de Vite.

**vite.config.ts**
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5132', // backend
        changeOrigin: true,
      },
    },
  },
})
```

Con esto, puedes hacer peticiones a `/api/products` sin CORS.

---

## 🧩 Variables de entorno

Archivo `.env` (opcional):
```
VITE_API_BASE=http://localhost:5132
```

El componente `ProductsApp` usa esta variable para formar las URL del API.

---

## 🎨 Tailwind CSS

Tailwind se encuentra configurado con **PostCSS**.

**postcss.config.js**
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // para Tailwind v4
    autoprefixer: {},
  },
};
```

**index.css**
```css
@import "tailwindcss";
```

---

## 📋 Funcionalidades principales

✅ Listado de productos  
✅ Creación de nuevos productos  
✅ Edición de productos existentes  
✅ Eliminación de productos  
✅ Validación básica de formularios  
✅ Diseño responsivo con Tailwind  

---

## 🧪 Scripts útiles

| Acción | Comando |
|--------|----------|
| Ejecutar dev server | `npm run dev` |
| Compilar para producción | `npm run build` |
| Previsualizar build | `npm run preview` |

---

## 📸 Capturas sugeridas

*(Puedes añadir imágenes en `public/` y referenciarlas aquí)*

```
![Listado](public/demo-list.png)
![Formulario](public/demo-create.png)
```

---

## 👨‍💻 Autor

**Juan David Lozada Trujillo**  
Software Developer — .NET / Azure / AI Integration  
📧 juandavid@example.com  
🌐 [GitHub](https://github.com/JuanLozada97)
