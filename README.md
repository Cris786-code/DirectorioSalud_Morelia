Aquí tienes la guía de actualización rápida lista para que la copies y la compartas con tu equipo. Todo está dentro del bloque de código como lo pediste:

```markdown
# 🔄 Guía Rápida: Cómo actualizar tu proyecto local

Sigue estos pasos cada vez que un compañero avise por el grupo que subió nuevos cambios a GitHub. Esto asegura que siempre tengas la versión más reciente del código.

### Paso 1: Descargar los cambios
Abre la terminal en Visual Studio Code (asegúrate de no tener el servidor de Expo corriendo) y ejecuta:
```bash
git pull origin main

```

### Paso 2: Actualizar librerías (Muy Importante)

Si tu compañero agregó nuevas herramientas (como cámara, mapas, etc.), necesitas que tu computadora las instale. Ejecuta:

```bash
npm install

```

### Paso 3: Arrancar el proyecto

Una vez que termine de instalar, levanta el servidor limpiando la caché para que tome los cambios frescos:

```bash
npx expo start -c

```

---

## 🚨 Solución a Errores Comunes

### Error de "Aborting" al hacer git pull

Si al hacer `git pull` la terminal te marca un error rojo diciendo que tus cambios locales serán sobreescritos (generalmente por el archivo `package-lock.json`), usa este combo de comandos para forzar la descarga:

```bash
git reset --hard
git pull origin main
npm install

```

*(Nota: `git reset --hard` borrará cualquier cambio que no hayas guardado con un commit, úsalo solo para descartar archivos conflictivos).*

```

```
