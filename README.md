# 🌍 GoTrip

**Una red social interactiva para compartir tus viajes en un mapa dinámico**

---

## 📝 Descripción general

**GoTrip** es una aplicación web que permite a los usuarios compartir sus experiencias de viaje a través de una red social interactiva basada en mapas. Diseñada para amantes de los viajes, la plataforma permite subir imágenes con localización geográfica, visualizar en un mapa las publicaciones propias y de amigos, intercambiar opiniones mediante chat, y planificar futuros destinos. Es una herramienta social y visual para descubrir lugares y conectar con otros viajeros de forma intuitiva.

---

## 🎯 Objetivo del proyecto

El objetivo principal es facilitar una forma atractiva y colaborativa de compartir experiencias de viaje, crear una comunidad digital para viajeros y ayudar en la planificación de viajes gracias al conocimiento compartido por otros usuarios.

> **Ámbito:** Social / Tecnológico  
> **Contexto académico:** Trabajo de Fin de Grado (TFG)

---

## ⚙️ Funcionalidades principales

- ✅ Registro y login de usuarios
- ✅ Subida de imágenes con geolocalización
- ✅ Visualización de publicaciones propias y de amigos en un mapa interactivo
- ✅ Comentarios y experiencias personales sobre lugares visitados
- ✅ Chat entre usuarios para compartir consejos de viaje
- ✅ Noticias actualizadas sobre destinos turísticos
- ✅ Planificador de futuros viajes (fechas, lugares, monumentos, restaurantes…)
- ✅ Perfil editable y configuración de privacidad

---

## 🛠️ Tecnologías utilizadas

- **Frontend:** React, JavaScript, HTML5, CSS3, Vite
- **Backend:** Java + Spring Boot
- **Base de datos:** SQL
- **Herramientas y servicios:** Postman, Docker, API de mapas, GitHub, Cookies

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/anmadb/prototipoTFG.git
cd prototipoTFG

2. Base de datos
Ejecuta el script SQL disponible en la carpeta base-de-datos para crear la base de datos local.

3. Backend
bash
Copiar
Editar
cd backend
# Abre el proyecto en tu IDE (IntelliJ, Eclipse…)
# Ejecuta la aplicación Spring Boot desde el archivo principal

4. Frontend
bash
Copiar
Editar
cd frontend
npm install
npm run dev

5. Acceder a la aplicación
Abre tu navegador en:
http://localhost:5173

📁 Estructura del proyecto
csharp
Copiar
Editar
prototipoTFG/
│
├── backend/              # Código del servidor (Spring Boot)
├── frontend/             # Interfaz de usuario (React)
├── base-de-datos/        # Script SQL para la base de datos
├── README.md             # Este documento


🧪 Pruebas y ejecución
El proyecto se ejecuta completamente en local.

Se requiere tener instalados: Node.js, npm, Java JDK, y un entorno SQL.

No se han desplegado entornos en la nube por el momento.

❓ Preguntas frecuentes (FAQ)
🔍 No se carga el mapa:
Verifica tu conexión a Internet y que la API esté correctamente configurada.

💾 El backend no arranca:
Comprueba que el puerto esté libre y que la base de datos esté iniciada.

📂 ¿Dónde están los datos iniciales?
En la carpeta base-de-datos encontrarás el script SQL para crear la estructura de la base
