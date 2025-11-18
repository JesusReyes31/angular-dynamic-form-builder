# Angular Dynamic Form Builder 🚀

[![Angular](https://img.shields.io/badge/Angular-20+-red.svg)](https://angular.io/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@your-scope/angular-dynamic-form-builder.svg)](https://www.npmjs.com/package/@your-scope/angular-dynamic-form-builder)

Generador de formularios dinámicos para Angular 20+ con validaciones personalizadas, diseño moderno y soporte completo para formularios reactivos.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz elegante con gradientes y animaciones
- 📝 **20+ Tipos de Campos**: text, email, password, select, radio, checkbox, file, range, color y más
- ✅ **Validaciones Integradas**: Validaciones estándar y personalizadas (email, teléfono, DNI, contraseña fuerte, etc.)
- 🎯 **Formularios Reactivos**: Basado en Angular Reactive Forms
- 🔄 **Campos Dependientes**: Muestra/oculta campos según valores de otros campos
- 📱 **Responsive**: Adaptado a dispositivos móviles, tablets y desktop
- 🌍 **i18n**: Mensajes de error personalizables
- ⚡ **Performance**: Optimizado con ChangeDetectionStrategy.OnPush
- 🎭 **3 Layouts**: Vertical, Horizontal e Inline
- 🛠️ **TypeScript**: Totalmente tipado con interfaces y types

## 📦 Instalación

```bash
npm install @your-scope/angular-dynamic-form-builder
```

O con yarn:

```bash
yarn add @your-scope/angular-dynamic-form-builder
```

## 🚀 Uso Básico

### 1. Importar el Componente

```typescript
import { Component } from '@angular/core';
import { FormBuilderComponent, FormConfig } from '@your-scope/angular-dynamic-form-builder';

@Component({
  selector: 'app-root',
  imports: [FormBuilderComponent],
  template: `
    <lib-form-builder
      [config]="formConfig"
      (formSubmit)="onFormSubmit($event)"
      (formReset)="onFormReset()"
      (formValueChange)="onFormValueChange($event)">
    </lib-form-builder>
  `
})
export class AppComponent {
  formConfig: FormConfig = {
    title: 'Formulario de Registro',
    description: 'Complete el formulario para crear su cuenta',
    fields: [
      {
        name: 'email',
        type: 'email',
        label: 'Correo Electrónico',
        placeholder: 'usuario@ejemplo.com',
        validations: {
          required: true,
          email: true
        }
      },
      {
        name: 'password',
        type: 'password',
        label: 'Contraseña',
        validations: {
          required: true,
          custom: 'strongPassword'
        }
      }
    ],
    submitButtonText: 'Registrarse',
    showResetButton: true
  };

  onFormSubmit(formData: any): void {
    console.log('Datos del formulario:', formData);
  }

  onFormReset(): void {
    console.log('Formulario reseteado');
  }

  onFormValueChange(value: any): void {
    console.log('Valor actualizado:', value);
  }
}
```

## 📚 Tipos de Campos Soportados

| Tipo | Descripción |
|------|-------------|
| `text` | Campo de texto simple |
| `email` | Campo de email con validación |
| `password` | Campo de contraseña |
| `number` | Campo numérico |
| `tel` | Campo de teléfono |
| `url` | Campo de URL |
| `textarea` | Área de texto multilínea |
| `select` | Lista desplegable (simple o múltiple) |
| `radio` | Botones de opción |
| `checkbox` | Casilla de verificación |
| `date` | Selector de fecha |
| `time` | Selector de hora |
| `datetime-local` | Selector de fecha y hora |
| `file` | Selector de archivos (simple o múltiple) |
| `range` | Control deslizante |
| `color` | Selector de color |

## ✅ Validaciones Disponibles

### Validaciones Estándar
- `required`: Campo obligatorio
- `email`: Validación de email
- `minLength`: Longitud mínima
- `maxLength`: Longitud máxima
- `min`: Valor mínimo (numérico)
- `max`: Valor máximo (numérico)
- `pattern`: Expresión regular personalizada

### Validaciones Personalizadas
- `alphanumeric`: Solo letras y números
- `noSpaces`: Sin espacios
- `strongPassword`: Contraseña fuerte (8 chars, mayúscula, minúscula, número, carácter especial)
- `dni`: DNI español (8 dígitos + 1 letra)
- `phone`: Teléfono (formato flexible)
- `url`: URL válida
- `futureDate`: Fecha futura
- `pastDate`: Fecha pasada
- `matchField`: Comparar con otro campo

## 🎨 Ejemplos de Configuración

### Formulario de Login

```typescript
const loginConfig: FormConfig = {
  title: 'Iniciar Sesión',
  description: 'Ingrese sus credenciales',
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      validations: { required: true, email: true }
    },
    {
      name: 'password',
      type: 'password',
      label: 'Contraseña',
      validations: { required: true }
    },
    {
      name: 'remember',
      type: 'checkbox',
      label: 'Recordarme'
    }
  ],
  submitButtonText: 'Entrar',
  showResetButton: false
};
```

### Formulario de Registro con Campos Dependientes

```typescript
const registerConfig: FormConfig = {
  title: 'Crear Cuenta',
  fields: [
    {
      name: 'accountType',
      type: 'radio',
      label: 'Tipo de Cuenta',
      options: [
        { label: 'Personal', value: 'personal' },
        { label: 'Empresa', value: 'business' }
      ],
      validations: { required: true }
    },
    {
      name: 'companyName',
      type: 'text',
      label: 'Nombre de la Empresa',
      dependsOn: { field: 'accountType', value: 'business' },
      validations: { required: true }
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      validations: { required: true, email: true }
    }
  ]
};
```

### Formulario con Múltiples Layouts

```typescript
// Vertical (default)
const verticalConfig: FormConfig = {
  title: 'Formulario Vertical',
  layout: 'vertical',
  fields: [...]
};

// Horizontal
const horizontalConfig: FormConfig = {
  title: 'Formulario Horizontal',
  layout: 'horizontal',
  fields: [...]
};

// Inline
const inlineConfig: FormConfig = {
  title: 'Formulario en Línea',
  layout: 'inline',
  fields: [...]
};
```

## 🎯 API Reference

### FormConfig

```typescript
interface FormConfig {
  title: string;                    // Título del formulario (obligatorio)
  description?: string;             // Descripción opcional
  fields: FieldConfig[];            // Array de campos
  submitButtonText?: string;        // Texto del botón enviar
  resetButtonText?: string;         // Texto del botón resetear
  showResetButton?: boolean;        // Mostrar botón resetear
  layout?: 'vertical' | 'horizontal' | 'inline';
  cssClass?: string;                // Clase CSS personalizada
}
```

### FieldConfig

```typescript
interface FieldConfig {
  name: string;                     // Nombre único del campo
  type: FieldType;                  // Tipo de campo
  label: string;                    // Etiqueta del campo
  placeholder?: string;             // Placeholder
  value?: any;                      // Valor inicial
  validations?: FieldValidation;    // Validaciones
  validationMessages?: ValidationMessages;
  options?: FieldOption[];          // Para select, radio
  disabled?: boolean;
  readonly?: boolean;
  cssClass?: string;
  hint?: string;                    // Texto de ayuda
  order?: number;                   // Orden de aparición
  visible?: boolean;
  dependsOn?: { field: string; value: any };
  multiple?: boolean;               // Para select, file
  accept?: string;                  // Para file
  step?: number;                    // Para number, range
}
```

## 🎨 Personalización de Estilos

La librería viene con estilos modernos predefinidos, pero puedes personalizarlos:

```scss
// Sobrescribir variables SCSS
$primary-color: #your-color;
$secondary-color: #your-color;
```

O agregar clases CSS personalizadas:

```typescript
formConfig: FormConfig = {
  cssClass: 'my-custom-form',
  fields: [
    {
      name: 'email',
      cssClass: 'my-custom-field',
      // ...
    }
  ]
};
```

## 🛠️ Validadores Personalizados

Registra tus propios validadores:

```typescript
import { FormValidator } from '@your-scope/angular-dynamic-form-builder';

constructor(private formValidator: FormValidator) {
  this.formValidator.registerValidator('customValidator', 
    this.myCustomValidator()
  );
}

myCustomValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Tu lógica de validación
    return valid ? null : { customValidator: { value: control.value } };
  };
}
```

## 📱 Responsive Design

El formulario es completamente responsive:
- **Desktop** (>768px): Layout completo con todos los efectos
- **Tablet** (768px): Ajustes de padding y espaciado
- **Mobile** (<480px): Layout optimizado para móviles

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your.email@example.com

## 🙏 Agradecimientos

- Angular Team por el increíble framework
- Comunidad de Angular por el feedback y contribuciones

---

⭐️ Si te gusta este proyecto, dale una estrella en GitHub!
