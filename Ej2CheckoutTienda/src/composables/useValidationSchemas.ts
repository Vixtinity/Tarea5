import * as yup from 'yup';
import { validateLuhn } from '../utils/creditCard';

export const useValidationSchemas = () => {
  const step3Schema = yup.object({
    paymentMethod: yup.string().required('Selecciona un método de pago'),
    
    // Tarjeta
    cardNumber: yup.string().when('paymentMethod', {
      is: 'card',
      then: (schema) => schema.required('Obligatorio').test('luhn', 'Tarjeta no válida', val => validateLuhn(val || ''))
    }),
    cardExpiry: yup.string().when('paymentMethod', {
      is: 'card',
      then: (schema) => schema.required('MM/YY obligatorio').matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Formato MM/YY')
    }),
    cvv: yup.string().when('paymentMethod', {
      is: 'card',
      then: (schema) => schema.required().matches(/^[0-9]{3,4}$/, '3 o 4 dígitos')
    }),

    // PayPal
    paypalEmail: yup.string().when('paymentMethod', {
      is: 'paypal',
      then: (schema) => schema.email('Email no válido').required('Email de PayPal obligatorio')
    }),

    // Bizum
    bizumPhone: yup.string().when('paymentMethod', {
      is: 'bizum',
      then: (schema) => schema.required().matches(/^[67]\d{8}$/, 'Móvil español no válido')
    }),

    // Transferencia
    transferReference: yup.string().when('paymentMethod', {
      is: 'transfer',
      then: (schema) => schema.required('La referencia es obligatoria')
    })
  });

  const step4Schema = yup.object({
    terms: yup.boolean().oneOf([true], 'Debes aceptar los términos'),
    privacy: yup.boolean().oneOf([true], 'Debes aceptar la política de privacidad')
  });

  return { step3Schema, step4Schema };
};