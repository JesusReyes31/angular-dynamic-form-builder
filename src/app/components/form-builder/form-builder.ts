import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { FormConfig, FieldConfig } from '../../models/form-config';
import { FormValidator } from '../../services/form-validator';
import { Subject, takeUntil } from 'rxjs';

/**
 * Componente Form Builder Inteligente
 * Genera formularios dinámicos a partir de configuración JSON
 */
@Component({
  selector: 'app-form-builder',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-builder.html',
  styleUrl: './form-builder.scss',
})
export class FormBuilder implements OnInit, OnDestroy {

  /**
   * Configuración del formulario en formato JSON
   */
  @Input() config!: FormConfig;

  /**
   * Evento emitido al enviar el formulario
   */
  @Output() formSubmit = new EventEmitter<any>();

  /**
   * Evento emitido al resetear el formulario
   */
  @Output() formReset = new EventEmitter<void>();

  /**
   * Evento emitido cuando cambia el valor del formulario
   */
  @Output() formValueChange = new EventEmitter<any>();

  /**
   * FormGroup dinámico generado
   */
  form!: FormGroup;

  /**
   * Campos ordenados para renderizar
   */
  sortedFields: FieldConfig[] = [];

  /**
   * Subject para manejar la destrucción del componente
   */
  private destroy$ = new Subject<void>();

  constructor(private formValidatorService: FormValidator) { }

  ngOnInit(): void {
    this.initializeForm();
    this.setupValueChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Inicializa el formulario dinámico
   */
  private initializeForm(): void {
    const group: any = {};

    // Ordenar campos por el campo 'order' si existe
    this.sortedFields = [...this.config.fields].sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      return orderA - orderB;
    });

    // Crear controles para cada campo
    this.sortedFields.forEach(field => {
      const validators = this.buildValidators(field);
      const value = field.value ?? this.getDefaultValue(field);

      group[field.name] = new FormControl(
        { value, disabled: field.disabled ?? false },
        validators
      );
    });

    this.form = new FormGroup(group);
  }

  /**
   * Configura la escucha de cambios en el formulario
   */
  private setupValueChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.formValueChange.emit(value);
        this.handleDependentFields();
      });
  }

  /**
   * Maneja campos dependientes (visibilidad condicional)
   */
  private handleDependentFields(): void {
    this.sortedFields.forEach(field => {
      if (field.dependsOn) {
        const dependentControl = this.form.get(field.dependsOn.field);
        const currentControl = this.form.get(field.name);

        if (dependentControl && currentControl) {
          const shouldShow = dependentControl.value === field.dependsOn.value;

          if (!shouldShow) {
            currentControl.disable();
            currentControl.reset();
          } else {
            currentControl.enable();
          }
        }
      }
    });
  }

  /**
   * Construye los validadores para un campo
   */
  private buildValidators(field: FieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (!field.validations) {
      return validators;
    }

    const v = field.validations;

    if (v.required) {
      validators.push(Validators.required);
    }

    if (v.minLength !== undefined) {
      validators.push(Validators.minLength(v.minLength));
    }

    if (v.maxLength !== undefined) {
      validators.push(Validators.maxLength(v.maxLength));
    }

    if (v.min !== undefined) {
      validators.push(Validators.min(v.min));
    }

    if (v.max !== undefined) {
      validators.push(Validators.max(v.max));
    }

    if (v.pattern) {
      validators.push(Validators.pattern(v.pattern));
    }

    if (v.email) {
      validators.push(Validators.email);
    }

    // Validador personalizado
    if (v.custom) {
      const customValidator = this.formValidatorService.getValidator(v.custom, v.customParams);
      if (customValidator) {
        validators.push(customValidator);
      }
    }

    return validators;
  }

  /**
   * Obtiene el valor por defecto según el tipo de campo
   */
  private getDefaultValue(field: FieldConfig): any {
    switch (field.type) {
      case 'checkbox':
        return false;
      case 'number':
      case 'range':
        return 0;
      case 'select':
        return field.multiple ? [] : '';
      default:
        return '';
    }
  }

  /**
   * Verifica si un campo debe ser visible
   */
  isFieldVisible(field: FieldConfig): boolean {
    if (field.visible === false) {
      return false;
    }

    if (field.dependsOn) {
      const dependentControl = this.form.get(field.dependsOn.field);
      return dependentControl?.value === field.dependsOn.value;
    }

    return true;
  }

  /**
   * Obtiene el mensaje de error para un campo
   */
  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    const field = this.sortedFields.find(f => f.name === fieldName);

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    const errors = control.errors;
    const messages = field?.validationMessages;

    // Buscar el primer error y retornar su mensaje
    for (const errorKey in errors) {
      if (errors.hasOwnProperty(errorKey)) {
        // Mensaje personalizado
        if (messages && messages[errorKey]) {
          return messages[errorKey]!;
        }

        // Mensajes por defecto
        return this.getDefaultErrorMessage(errorKey, errors[errorKey]);
      }
    }

    return '';
  }

  /**
   * Obtiene mensajes de error por defecto
   */
  private getDefaultErrorMessage(errorKey: string, errorValue: any): string {
    const messages: { [key: string]: string } = {
      required: 'Este campo es obligatorio',
      email: 'Ingrese un email válido',
      minLength: `Mínimo ${errorValue.requiredLength} caracteres`,
      maxLength: `Máximo ${errorValue.requiredLength} caracteres`,
      min: `El valor mínimo es ${errorValue.min}`,
      max: `El valor máximo es ${errorValue.max}`,
      pattern: 'Formato inválido',
      alphanumeric: 'Solo se permiten letras y números',
      noSpaces: 'No se permiten espacios',
      strongPassword: 'La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial',
      dni: 'DNI inválido (8 dígitos y 1 letra)',
      phone: 'Teléfono inválido',
      url: 'URL inválida',
      futureDate: 'La fecha debe ser futura',
      pastDate: 'La fecha debe ser pasada',
      matchField: `El valor no coincide con ${errorValue.fieldName}`,
    };

    return messages[errorKey] || 'Campo inválido';
  }

  /**
   * Verifica si un campo tiene errores
   */
  hasError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    if (this.form.invalid) {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    this.formSubmit.emit(this.form.value);
  }

  /**
   * Resetea el formulario
   */
  onReset(): void {
    this.form.reset();
    this.sortedFields.forEach(field => {
      const control = this.form.get(field.name);
      if (control) {
        control.setValue(field.value ?? this.getDefaultValue(field));
      }
    });
    this.formReset.emit();
  }

  /**
   * Obtiene la clase CSS del layout
   */
  getLayoutClass(): string {
    return `form-layout-${this.config.layout ?? 'vertical'}`;
  }

  /**
   * Obtiene el texto del botón de envío
   */
  getSubmitButtonText(): string {
    return this.config.submitButtonText ?? 'Enviar';
  }

  /**
   * Obtiene el texto del botón de reset
   */
  getResetButtonText(): string {
    return this.config.resetButtonText ?? 'Resetear';
  }

  /**
   * Verifica si debe mostrar el botón de reset
   */
  shouldShowResetButton(): boolean {
    return this.config.showResetButton ?? true;
  }

  /**
   * Maneja el cambio de archivos en campos de tipo file
   */
  onFileChange(event: Event, fieldName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const control = this.form.get(fieldName);
      if (control) {
        // Para archivos múltiples, guardar array de archivos
        // Para archivo único, guardar el primer archivo
        const files = input.files.length > 1
          ? Array.from(input.files)
          : input.files[0];
        control.setValue(files);
      }
    }
  }
}
