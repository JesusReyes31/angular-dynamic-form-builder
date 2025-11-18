import { Component } from '@angular/core';
import { FormBuilderComponent, FormConfig } from '../../projects/form-builder/src/public-api';

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
    title: 'Iniciar Sesión',
    fields: [
      {
        name: 'email',
        type: 'email',
        label: 'Correo Electrónico',
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
    submitButtonText: 'Iniciar Sesión'
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
