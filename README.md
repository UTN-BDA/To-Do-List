# To-Do-List
Esta es una aplicacion sencilla desarrollada para crear tareas para ser ordenado, tambien tiene la posibilidad de eliminar tareas y marcarlas como realizadas.

## Tecnologías

- **Entorno de ejecución:** Node.js  
- **Lenguaje:** TypeScript  
- **Framework:** Express  
- **ORM:** Sequelize  
- **Base de datos:** PostgreSQL  
- **Frontend:** React  
- **Contenedores:** Docker  


# El backend de la app está estructurada de la siguiente forma: 

├── config/ – configuración de Sequelize y variables de entorno
├── controllers/ – lógica de negocio enlazada a los routers
├── models/ – definición de modelos User y Task
├── routers/ – rutas Express que mapean endpoints a controladores
├── server.ts – instancia de Express y conexión a la BD
└── index.ts – arranque de la aplicación y selección de puerto

### Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST   | /api/lista/register | Registra un usuario |
| POST   | /api/lista/login    | Devuelve token JWT |
| GET    | /api/lista/tasks    | Lista tareas del usuario |
| POST   | /api/lista/tasks    | Crea tarea |
| PUT    | /api/lista/tasks/:id| Actualiza tarea |
| DELETE | /api/lista/tasks/:id| Elimina tarea |

# En el Frontend que está ubicada en ./src/client se encuentra los siguientes archivos significativos:

### `components/`
Contiene componentes reutilizables de la interfaz, como formularios, listas o botones. Se utilizan en distintas páginas para mostrar o gestionar tareas.

---

### `pages/`
Incluye las páginas principales de la aplicación:
- **Login**: formulario para iniciar sesión.
- **Register**: formulario para registrar nuevos usuarios.
- **Página principal (Home)**: muestra las tareas del usuario logueado, permite crear nuevas, actualizarlas o eliminarlas.

---

### `services/`
Define funciones que conectan con el backend usando Axios. Cada función representa una acción (GET, POST, PUT, DELETE) con una URL correspondiente, por ejemplo:
- Crear tarea → `POST http://localhost:5000/api/lista/tasks`
- Obtener tareas → `GET http://localhost:5000/api/lista/tasks`
- Eliminar tarea → `DELETE http://localhost:5000/api/lista/tasks/:id`
- Registrar o loguear usuario → `POST` a las rutas correspondientes.

---

### `styles/`
Contiene estilos CSS utilizados en las páginas de login y registro para mejorar su presentación.

---

### `types/`
Define los tipos TypeScript usados en la aplicación:
- `Task`: estructura de una tarea (id, título, descripción, estado, userId).
- `User`: estructura de un usuario (id, email, contraseña, etc.).

Esto mejora la organización del código y permite trabajar con tipado estático.

---

### `index.tsx`
Archivo principal de entrada. Renderiza el componente `<App />` dentro del HTML. También puede incluir configuraciones globales como rutas o contextos.

---

### `App.tsx`
Define el sistema de rutas de la app. Gestiona qué componente/página se muestra según la URL, por ejemplo:
- `/login`
- `/register`
- `/tasks` (home)

Controla el flujo general de navegación de la aplicación.

---

## ✅ Funcionalidades
- Registro e inicio de sesión de usuarios.
- Autenticación con tokens.
- CRUD de tareas (crear, leer, actualizar, eliminar).
- Cada usuario solo ve sus propias tareas.
- Integración entre frontend y backend con control de roles y permisos.

---

## 🧪 Herramientas
- React, TypeScript
- Node.js, Express, Sequelize
- PostgreSQL
- Axios
- JWT (para autenticación)


---

## 3 🔐 Variables de entorno
Añade una mini tabla para que quede claro qué debe contener `.env`. Ejemplo:

| Variable | Ejemplo | Descripción |
|----------|---------|-------------|
| `DATABASE_URL` | `postgres://user:pass@db:5432/todo` | Cadena de conexión a PostgreSQL |
| `JWT_SECRET` | `super-secret` | Clave para firmar tokens JWT |

---

## 4 🚀 Sección _“Puesta en marcha”_ paso a paso
Incluye los comandos en bloque de código para copiar y pegar:

```Node
#Instalacion de Node.js
https://nodejs.org/

```bash
# 2. Instalar dependencias
npm install

# 3. Levantar backend en modo desarrollo
npm run dev    # http://localhost:5000

# 4. Levantar frontend
cd src/client
npm install
npm start      # http://localhost:3000

# 5. Con Docker (todo en un comando)
docker-compose up --build
