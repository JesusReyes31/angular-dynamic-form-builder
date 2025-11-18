/**
 * Tipos de campos soportados por el form builder
 */
export type FieldType =
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'url'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'file'
    | 'range'
    | 'color';

/**
 * Opciones para campos select, radio, checkbox
 */
export interface FieldOption {
    label: string;
    value: any;
    disabled?: boolean;
}

/**
 * Configuración de validaciones para un campo
 */
export interface FieldValidation {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    email?: boolean;
    custom?: string; // Nombre del validador personalizado
    customParams?: any; // Parámetros para el validador personalizado
}

/**
 * Mensajes de error personalizados para las validaciones
 */
export interface ValidationMessages {
    required?: string;
    minLength?: string;
    maxLength?: string;
    min?: string;
    max?: string;
    pattern?: string;
    email?: string;
    custom?: string;
    [key: string]: string | undefined;
}

/**
 * Configuración de un campo individual del formulario
 */
export interface FieldConfig {
    name: string;
    type: FieldType;
    label: string;
    placeholder?: string;
    value?: any;
    validations?: FieldValidation;
    validationMessages?: ValidationMessages;
    options?: FieldOption[]; // Para select, radio, checkbox
    disabled?: boolean;
    readonly?: boolean;
    cssClass?: string;
    hint?: string; // Texto de ayuda
    order?: number; // Orden de aparición
    visible?: boolean; // Visibilidad condicional
    dependsOn?: { // Campo dependiente de otro
        field: string;
        value: any;
    };
    multiple?: boolean; // Para select múltiple
    accept?: string; // Para tipo file
    step?: number; // Para tipo number o range
}

/**
 * Configuración completa del formulario
 */
export interface FormConfig {
    title: string; // Título del formulario (obligatorio)
    description?: string; // Descripción del formulario (opcional)
    fields: FieldConfig[];
    submitButtonText?: string;
    resetButtonText?: string;
    showResetButton?: boolean;
    layout?: 'vertical' | 'horizontal' | 'inline';
    cssClass?: string;
}

