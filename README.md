# 🎉 Eventos Colombia

Sistema de gestión de eventos desarrollado con **JavaScript**, **HTML**, **CSS** y **JSON Server** como backend simulado.

Permite gestionar eventos y controlar la participación de los usuarios en un entorno sencillo y funcional.

---

## 📋 Características principales

* Registro de usuarios (con contraseña).
* Inicio de sesión con nombre y contraseña.
* Funciones: 

* **Administrador**: 

* Crear, editar y eliminar eventos. 
* Ver la lista completa de eventos. 
* **Usuario normal**: 

* Unirse a eventos (si hay cupo disponible). 
* Salirse de eventos en los que están registrados.
* Control de cupos para cada evento.
* Almacenamiento de sesión usando `localStorage`.
* Navegación entre vistas usando rutas por hash (`#/login`, `#/register`, `#/dashboard`).

---

## 🛠️ Tecnologías utilizadas

* **HTML5/CSS3**
* **JavaScript Vainilla (modular)**
* **Servidor JSON** (como backend REST falso).
* **localStorage** (para gestión de sesión local).

---

## 🚀 Instalación y ejecución

1. **Clona este repositorio:**

```golpecito
clon de git https://github.com/luixdaniel/JS_performance_testLLL.git
```

4. **Abre el archivo ************`index.html`************ en tu navegador.**

---

## 📂 Estructura del proyecto

```
/eventos-colombia
├── índice.html
├──css/
│ └── estilos.css
├──js/
│ ├── api.js # Funciones para conexión con el backend
│ ├── vistas/
│ │ ├── InicioView.js
│ │ ├── LoginView.js
│ │ ├── RegistroView.js
│ │ └── DashboardView.js
├── db.json # Base de datos JSON Server
└── LÉAME.md
```

---

## 📄 Archivo db.json (ejemplo)

```json
{ 
"usuarios": [], 
"eventos": [], 
"queda": []
}
```

---

## 🎨 Diseño

* Diseño responsivo básico.
* Se usa `window.location.hash` para cambiar vistas sin recargar la página.
* El diseño es simple pero funcional. Puedes personalizarlo en el archivo CSS.

---

## 📚 Autor

Luis Daniel Cera Barros
ceraluis4@gmail.com
1045228184
clan: cienaga
Colombia