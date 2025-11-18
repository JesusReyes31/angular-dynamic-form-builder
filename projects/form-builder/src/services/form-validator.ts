import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Servicio para validaciones personalizadas del formulario
 */
@Injectable({
    providedIn: 'root',
})
export class FormValidator {

    /**
     * Registro de validadores personalizados
     */
    private customValidators: Map<string, ValidatorFn> = new Map();

    constructor() {
        // Registrar validadores por defecto
        this.registerDefaultValidators();
    }

    /**
     * Registrar validadores por defecto
     */
    private registerDefaultValidators(): void {
        this.registerValidator('alphanumeric', this.alphanumericValidator());
        this.registerValidator('noSpaces', this.noSpacesValidator());
        this.registerValidator('strongPassword', this.strongPasswordValidator());
        this.registerValidator('dni', this.dniValidator());
        this.registerValidator('phone', this.phoneValidator());
        this.registerValidator('url', this.urlValidator());
        this.registerValidator('futureDate', this.futureDateValidator());
        this.registerValidator('pastDate', this.pastDateValidator());
        this.registerValidator('matchField', this.matchFieldValidator(''));
    }

    /**
     * Registrar un validador personalizado
     */
    registerValidator(name: string, validator: ValidatorFn): void {
        this.customValidators.set(name, validator);
    }

    /**
     * Obtener un validador personalizado por nombre
     */
    getValidator(name: string, params?: any): ValidatorFn | null {
        const validator = this.customValidators.get(name);
        if (!validator) {
            return null;
        }

        // Si el validador necesita parámetros, aplicarlos
        if (params && name === 'matchField') {
            return this.matchFieldValidator(params);
        }

        return validator;
    }

    /**
     * Validador alfanumérico (solo letras y números)
     */
    alphanumericValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }
            const valid = /^[a-zA-Z0-9]*$/.test(control.value);
            return valid ? null : { alphanumeric: { value: control.value } };
        };
    }

    /**
     * Validador sin espacios
     */
    noSpacesValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }
            const valid = !/\s/.test(control.value);
            return valid ? null : { noSpaces: { value: control.value } };
        };
    }

    /**
     * Validador de contraseña fuerte
     * Requisitos: mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial
     */
    strongPasswordValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }
            const password = control.value;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            const isLengthValid = password.length >= 8;

            const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLengthValid;

            return valid ? null : {
                strongPassword: {
                    hasUpperCase,
                    hasLowerCase,
                    hasNumber,
                    hasSpecialChar,
                    isLengthValid
                }
            };
        };
    }

    /**
     * Validador de DNI español (8 dígitos y 1 letra)
     */
    dniValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }
            const dniPattern = /^\d{8}[A-Za-z]$/;
            const valid = dniPattern.test(control.value);
            return valid ? null : { dni: { value: control.value } };
        };
    }

    /**
     * Validador de teléfono (formato flexible)
     */
    phoneValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }
            const phonePattern = /^[\d\s\+\-\(\)]+$/;
            const valid = phonePattern.test(control.value) && control.value.replace(/\D/g, '').length >= 9;
            return valid ? null : { phone: { value: control.value } };
        };
    }

    /**
     * Validador de URL
     */
    urlValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }
            try {
                new URL(control.value);
                return null;
            } catch {
                return { url: { value: control.value } };
            }
        };
    }

    /**
     * Validador de fecha futura
     */
    futureDateValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }
            const inputDate = new Date(control.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const valid = inputDate > today;
            return valid ? null : { futureDate: { value: control.value } };
        };
    }

    /**
     * Validador de fecha pasada
     */
    pastDateValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }
            const inputDate = new Date(control.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const valid = inputDate < today;
            return valid ? null : { pastDate: { value: control.value } };
        };
    }

    /**
     * Validador para comparar con otro campo (ej: confirmar contraseña)
     */
    matchFieldValidator(fieldName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.parent || !control.value) {
                return null;
            }

            const fieldToMatch = control.parent.get(fieldName);
            if (!fieldToMatch) {
                return null;
            }

            const valid = control.value === fieldToMatch.value;
            return valid ? null : { matchField: { fieldName, value: control.value } };
        };
    }
}

