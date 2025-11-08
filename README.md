# 🧩 TechTest Products CRUD

Proyecto completo de **prueba técnica** con arquitectura profesional:
- 🖥️ **Backend:** .NET 9 + Clean Architecture (API REST)
- 💻 **Frontend:** React + Vite + Tailwind CSS (CRUD de productos)
- ☁️ Comunicación por API REST entre ambos proyectos

---

## 🚀 Tecnologías utilizadas

| Componente | Stack |
|-------------|--------|
| Backend | .NET 9, Entity Framework Core (InMemory), AutoMapper, Swagger |
| Frontend | React + TypeScript, Vite, TailwindCSS, Fetch API |
| Infraestructura | CORS habilitado, Arquitectura por capas, Sembrado inicial de datos |

---

## 📁 Estructura del repositorio

```
techtest/
 ├── backend/              → API .NET (TechSolution)
 │    ├── src/
 │    ├── README.md
 │    └── TechTestSolution.sln
 ├── frontend/             → Aplicación React + Vite (techtest-front)
 │    ├── src/
 │    ├── README.md
 │    └── vite.config.ts
 └── README.md             → Este archivo
```

---

## 🧩 Backend (.NET 9)

**Ubicación:** `/backend`

### 🔧 Ejecución
```bash
cd backend
dotnet restore
dotnet run --project src/Api/Api.csproj
```

### 📍 Endpoints disponibles
Swagger UI: [http://localhost:5132/swagger](http://localhost:5132/swagger)

```
GET    /api/products
GET    /api/products/{id}
POST   /api/products
PUT    /api/products/{id}
DELETE /api/products/{id}
```

La API usa **EF Core InMemory** (sin base de datos real) y siembra datos automáticamente.

---

## 💻 Frontend (React + Vite + Tailwind)

**Ubicación:** `/frontend`

### 🔧 Ejecución
```bash
cd frontend
npm install
npm run dev
```
Interfaz: [http://localhost:5173](http://localhost:5173)

El frontend permite:
- Listar productos
- Crear nuevos
- Editar existentes
- Eliminar productos

Y se comunica con la API del backend (`http://localhost:5132`).

---

## ⚙️ Configuración de CORS

El backend permite solicitudes desde el frontend (`http://localhost:5173`).  
Configuración incluida en `Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", p =>
        p.WithOrigins("http://localhost:5173")
         .AllowAnyHeader()
         .AllowAnyMethod());
});
...
app.UseCors("AllowFrontend");
```

---

## 🧰 Scripts útiles

| Acción | Comando |
|--------|----------|
| Restaurar dependencias | `dotnet restore` / `npm install` |
| Ejecutar backend | `dotnet run --project src/Api/Api.csproj` |
| Ejecutar frontend | `npm run dev` |
| Compilar frontend | `npm run build` |
| Ver Swagger | `http://localhost:5132/swagger` |

---

## 🧱 Arquitectura general

```
Frontend (React/Vite/Tailwind)
      ↓ API REST (Fetch)
Backend (.NET 9 / Clean Architecture / EF InMemory)
```

**Capas backend:**
```
Api → Application → Domain
  ↘︎ Infrastructure → Domain
```

---

## 👨‍💻 Autor

**Juan David Lozada Trujillo**  
Software Developer — .NET / Azure / AI Integration  
📧 juandlozadat@gmail.com.com  
🌐 [GitHub](https://github.com/JuanLozada97)

---

## 📄 Licencia
Este proyecto se distribuye con fines educativos y de evaluación técnica.
