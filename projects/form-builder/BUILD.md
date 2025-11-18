# Guía de Compilación y Publicación

## 📦 Compilar la Librería

### 1. Compilar en modo desarrollo

```bash
ng build form-builder
```

### 2. Compilar en modo producción

```bash
ng build form-builder --configuration production
```

Los archivos compilados se generarán en `dist/form-builder/`

## 🧪 Probar Localmente

### Opción 1: Usar npm link

```bash
# En el directorio del proyecto
cd dist/form-builder
npm link

# En otro proyecto Angular
npm link @your-scope/angular-dynamic-form-builder
```

### Opción 2: Instalar desde el directorio local

```bash
# En otro proyecto Angular
npm install /ruta/completa/a/tu/proyecto/dist/form-builder
```

## 📤 Publicar en npm

### 1. Configurar npm (primera vez)

```bash
# Login en npm
npm login
```

### 2. Actualizar el package.json

Edita `projects/form-builder/package.json`:
- Cambia `@your-scope` por tu scope real (ej: `@miusuario`)
- Actualiza `version` siguiendo [Semantic Versioning](https://semver.org/)
- Actualiza `author`, `homepage`, `repository`, etc.

### 3. Compilar y Publicar

```bash
# Compilar
ng build form-builder --configuration production

# Ir al directorio de distribución
cd dist/form-builder

# Publicar en npm
npm publish --access public
```

> **Nota**: Si es un paquete con scope (`@scope/package`), necesitas `--access public` para paquetes gratuitos.

## 🔄 Actualizar Versión

Antes de publicar una nueva versión:

```bash
# Cambio menor (1.0.0 -> 1.0.1)
npm version patch

# Nueva funcionalidad (1.0.0 -> 1.1.0)
npm version minor

# Cambios que rompen compatibilidad (1.0.0 -> 2.0.0)
npm version major
```

## 📝 Checklist Pre-Publicación

- [ ] Actualizar versión en `package.json`
- [ ] Actualizar `README.md` con nuevas features
- [ ] Compilar sin errores
- [ ] Probar localmente
- [ ] Actualizar `CHANGELOG.md` (opcional pero recomendado)
- [ ] Crear tag de git
- [ ] Publicar en npm
- [ ] Verificar en https://www.npmjs.com/

## 🏷️ Crear Tags de Git

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## 📊 Verificar Publicación

```bash
# Ver información del paquete
npm view @your-scope/angular-dynamic-form-builder

# Ver todas las versiones publicadas
npm view @your-scope/angular-dynamic-form-builder versions
```

## 🚫 Despublicar (Solo si es necesario)

```bash
# Despublicar una versión específica
npm unpublish @your-scope/angular-dynamic-form-builder@1.0.0

# Despublicar todo el paquete (solo dentro de 72 horas)
npm unpublish @your-scope/angular-dynamic-form-builder --force
```

> **⚠️ Advertencia**: Solo puedes despublicar dentro de las primeras 72 horas. Después de eso, necesitas deprecar en su lugar.

## 📌 Deprecar una Versión

```bash
npm deprecate @your-scope/angular-dynamic-form-builder@1.0.0 "Versión obsoleta, usar 1.0.1+"
```

## 🔐 Configurar .npmrc (Opcional)

Crea un archivo `.npmrc` en la raíz del proyecto:

```
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

Y usa variables de entorno para CI/CD.

## 📚 Recursos Adicionales

- [npm Documentation](https://docs.npmjs.com/)
- [Angular Library Guide](https://angular.io/guide/creating-libraries)
- [Semantic Versioning](https://semver.org/)

