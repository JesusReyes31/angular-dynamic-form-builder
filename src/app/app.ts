import { Component } from '@angular/core';
import { FormBuilderComponent, FormConfig } from '@jesusreyes31/angular-dynamic-form-builder';

@Component({
  selector: 'app-root',
  imports: [FormBuilderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  /**
   * Configuración del formulario de contacto
   */
  formConfig: FormConfig = {
    title: "Formulario de Pruebas Completas",
    description: "Este formulario está diseñado para verificar todos los tipos de campos del Form Builder.",
    cssClass: "form-test-suite",

    fields: [

      /* ---- TEXT ---- */
      {
        name: "nombre",
        type: "text",
        label: "Nombre Completo",
        placeholder: "Ingresa tu nombre",
        validations: { required: true, minLength: 3 },
        hint: "Debe contener al menos 3 caracteres."
      },

      /* ---- EMAIL ---- */
      {
        name: "email",
        type: "email",
        label: "Correo Electrónico",
        placeholder: "ejemplo@correo.com",
        validations: { required: true, email: true }
      },

      /* ---- PASSWORD ---- */
      {
        name: "password",
        type: "password",
        label: "Contraseña",
        placeholder: "Contraseña segura",
        validations: { required: true, custom: "strongPassword" },
        hint: "Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial"
      },
      {
        name: "confirmPassword",
        type: "password",
        label: "Confirmar Contraseña",
        placeholder: "Repita su contraseña",
        validations: {
          required: true,
          custom: "matchField",
          customParams: "password"
        }
      },

      /* ---- NUMBER ---- */
      {
        name: "edad",
        type: "number",
        label: "Edad",
        step: 1,
        validations: { required: true, min: 1, max: 120 }
      },

      /* ---- TEL ---- */
      {
        name: "telefono",
        type: "tel",
        label: "Teléfono",
        placeholder: "Ej: 6641234567",
        validations: { pattern: "^[0-9]{10}$" }
      },

      /* ---- URL ---- */
      {
        name: "pagina",
        type: "url",
        label: "Página Web Personal",
        placeholder: "https://tusitio.com"
      },

      /* ---- TEXTAREA ---- */
      {
        name: "descripcion",
        type: "textarea",
        label: "Descripción Personal",
        placeholder: "Escribe acerca de ti...",
        validations: { maxLength: 200 }
      },

      /* ---- SELECT SIMPLE ---- */
      {
        name: "genero",
        type: "select",
        label: "Género",
        placeholder: "Seleccione una opción",
        validations: { required: true },
        options: [
          { label: "Masculino", value: "M" },
          { label: "Femenino", value: "F" },
          { label: "Otro", value: "O" }
        ]
      },

      /* ---- SELECT MULTIPLE ---- */
      {
        name: "hobbies",
        type: "select",
        label: "Hobbies",
        multiple: true,
        options: [
          { label: "Leer", value: "leer" },
          { label: "Correr", value: "correr" },
          { label: "Videojuegos", value: "gaming" },
          { label: "Cocinar", value: "cocinar" }
        ]
      },

      /* ---- COLOR ---- */
      {
        name: "colorFavorito",
        type: "color",
        label: "Color Favorito",
        validations: { required: true }
      },

      /* ---- DATE / TIME / DATETIME ---- */
      {
        name: "fechaNacimiento",
        type: "date",
        label: "Fecha de Nacimiento"
      },
      {
        name: "horaConsulta",
        type: "time",
        label: "Hora de Consulta"
      },
      {
        name: "citaCompleta",
        type: "datetime-local",
        label: "Fecha y Hora Completa"
      },

      /* ---- FILE ---- */
      {
        name: "archivo",
        type: "file",
        label: "Subir Archivo",
        accept: ".pdf,.jpg,.png",
        multiple: true
      },

      /* ---- RANGE ---- */
      {
        name: "nivelSatisfaccion",
        type: "range",
        label: "Nivel de Satisfacción",
        validations: { min: 0, max: 10 },
        step: 1
      },

      /* ---- CHECKBOX ---- */
      {
        name: "notificaciones",
        type: "checkbox",
        label: "Recibir Notificaciones",
        validations: { required: true }
      },
      {
        name: "terminos",
        type: "checkbox",
        label: "Acepto los términos y condiciones",
        validations: { required: true }
      },

      /* ---- RADIO ---- */
      {
        name: "preferencia",
        type: "radio",
        label: "Método de Contacto Preferido",
        options: [
          { label: "Correo", value: "email" },
          { label: "Teléfono", value: "telefono" },
          { label: "WhatsApp", value: "whatsapp" }
        ]
      }

    ],

    submitButtonText: "Enviar Formulario",
    resetButtonText: "Reiniciar Formulario",
    showResetButton: true
  };



  /**
   * Formulario activo
   */

  /**
   * Maneja el envío del formulario
   */
  onFormSubmit(formData: any): void {
    console.log('Formulario enviado:', formData);
    alert('✅ Formulario enviado con éxito!\nRevise la consola para ver los datos.');
  }

  /**
   * Maneja el reset del formulario
   */
  onFormReset(): void {
    console.log('Formulario reseteado');
  }

  /**
   * Maneja los cambios en el formulario
   */
  onFormValueChange(value: any): void {
    console.log('Valor del formulario:', value);
  }
}
