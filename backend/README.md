# 🧩 TechTestSolution – .NET 9 Clean Architecture

Prueba técnica basada en **.NET 9** utilizando principios de **Clean Architecture**, **Entity Framework Core (InMemory)** y **Swagger**.

---

## 🚀 Características principales

- API REST con ASP.NET Core 9
- Arquitectura por capas (Domain, Application, Infrastructure, Api)
- Persistencia **en memoria** (EF Core InMemory)
- Swagger UI para pruebas
- AutoMapper para mapeo DTOs ⇄ Entidades
- Seeder con datos iniciales (3 productos)
- Preparado para migrar a SQL Server o SQLite si se requiere

---

## 📁 Estructura del proyecto

```
src/
 ├── Api/               # Capa de presentación (Controllers, Program.cs)
 ├── Application/       # Lógica de negocio, servicios, DTOs, contratos
 ├── Domain/            # Entidades del dominio (sin dependencias)
 └── Infrastructure/    # Persistencia, DbContext, Repositorios, Seeder
```

---

## 🧰 Requisitos

- .NET 9 SDK  
- Visual Studio 2022 o VS Code  
- (Opcional) Docker Desktop, si deseas probar con SQL Server real

---

## ⚙️ Ejecución (modo InMemory)

1. **Instalar dependencias**
   ```powershell
   dotnet restore
   ```

2. **Ejecutar la API**
   ```powershell
   $env:DB_PROVIDER = "InMemory"
   dotnet run --project src/Api/Api.csproj
   ```

3. **Abrir Swagger**
   - URL: [http://localhost:5132/swagger](http://localhost:5132/swagger)
   - Endpoints disponibles:
     - `GET /api/products`
     - `GET /api/products/{id}`
     - `POST /api/products`
     - `PUT /api/products/{id}`
     - `DELETE /api/products/{id}`

4. **Datos iniciales**
   Al iniciar, se crean automáticamente tres productos de ejemplo:
   ```json
   [
     { "id": 1, "name": "Keyboard", "price": 99.99 },
     { "id": 2, "name": "Mouse", "price": 49.99 },
     { "id": 3, "name": "Monitor", "price": 229.9 }
   ]
   ```

---

## 🧪 Cambiar a SQL Server (opcional)

Si deseas usar SQL Server en lugar de InMemory:
1. Instala el contenedor:
   ```powershell
   docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Your_password123" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
   ```
2. Ajusta `appsettings.Development.json`:
   ```json
   {
     "DbProvider": "SqlServer",
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost,1433;Database=TechTestDb;User=sa;Password=Your_password123;TrustServerCertificate=True;"
     }
   }
   ```
3. Ejecuta migraciones y arranca normalmente.

---

## 🧱 Arquitectura

```
Api → Application → Domain
  ↘︎ Infrastructure → Domain
```

- **Domain**: Entidades puras (no dependen de nada externo).  
- **Application**: Reglas de negocio, contratos y servicios.  
- **Infrastructure**: Implementa persistencia (DbContext, repositorios).  
- **Api**: Controladores, DI, configuración y Swagger.

---

## 🧩 Tecnologías usadas

| Componente | Descripción |
|-------------|--------------|
| .NET 9 | Framework principal |
| EF Core InMemory | Persistencia rápida para pruebas |
| Swagger | Documentación interactiva |
| AutoMapper | Mapeo de entidades y DTOs |
| xUnit + FluentAssertions | Pruebas unitarias (opcional) |

---

## ✅ Checklist de entrega

- [x] API funcional
- [x] Swagger habilitado
- [x] Datos iniciales sembrados
- [x] Clean Architecture aplicada
- [x] Configuración para InMemory y SQL Server
- [x] Código comentado y legible

---

## 👨‍💻 Autor

**Juan David Lozada Trujillo**  
Software Developer — .NET / Azure / AI Integration  
📧 juandavid@example.com  
🌐 [GitHub](https://github.com/JuanLozada97)
