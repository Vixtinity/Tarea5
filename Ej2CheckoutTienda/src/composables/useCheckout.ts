import { ref, reactive, computed } from 'vue'

export interface BillingData {
  fullName: string
  nif: string
  email: string
  phone: string
  address: string
  postalCode: string
  city: string
  province: string
  country: string
}

export interface ShippingData {
  sameAsBilling: boolean
  fullName: string
  address: string
  postalCode: string
  city: string
  province: string
  country: string
  phone: string
  instructions: string
}

const currentStep = ref(1)
const steps = ref([
  { id: 1, title: 'Datos de Facturación' },
  { id: 2, title: 'Dirección de Envío' },
  { id: 3, title: 'Método de Pago' }, // Placeholder
  { id: 4, title: 'Confirmación' },   // Placeholder
])

const billingData = reactive<BillingData>({
  fullName: '',
  nif: '',
  email: '',
  phone: '',
  address: '',
  postalCode: '',
  city: '',
  province: '',
  country: 'España',
})

const shippingData = reactive<ShippingData>({
  sameAsBilling: true,
  fullName: '',
  address: '',
  postalCode: '',
  city: '',
  province: '',
  country: 'España',
  phone: '',
  instructions: '',
})

export function useCheckout() {
  const errors = reactive({
    billing: {} as Record<string, string>,
    shipping: {} as Record<string, string>,
  })

  const validateBilling = () => {
    errors.billing = {}
    let isValid = true

    if (billingData.fullName.length < 3) {
      errors.billing.fullName = 'El nombre debe tener al menos 3 caracteres.'
      isValid = false
    }

    // Simplified regex for easier testing
    const nifRegex = /^[0-9]{8}[A-Z]$/i
    if (!nifRegex.test(billingData.nif)) {
      errors.billing.nif = 'NIF/CIF inválido (Ej: 12345678A).'
      isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(billingData.email)) {
      errors.billing.email = 'Email inválido.'
      isValid = false
    }
    
    // Simplified phone regex
    const phoneRegex = /^[0-9]{9}$/
    if (!phoneRegex.test(billingData.phone)) {
      errors.billing.phone = 'Teléfono inválido (9 dígitos).'
      isValid = false
    }

    if (!billingData.address) {
      errors.billing.address = 'La dirección es obligatoria.'
      isValid = false
    }
    
    if (!/^\d{5}$/.test(billingData.postalCode)) {
      errors.billing.postalCode = 'El código postal debe tener 5 dígitos.'
      isValid = false
    }

    if (!billingData.city) {
      errors.billing.city = 'La ciudad es obligatoria.'
      isValid = false
    }

    return isValid
  }

  const validateShipping = () => {
    errors.shipping = {}
    let isValid = true

    if (shippingData.sameAsBilling) {
      return true
    }

    if (shippingData.fullName.length < 3) {
      errors.shipping.fullName = 'El nombre destinatario debe tener al menos 3 caracteres.'
      isValid = false
    }

    if (!shippingData.address) {
      errors.shipping.address = 'La dirección es obligatoria.'
      isValid = false
    }

    if (!/^\d{5}$/.test(shippingData.postalCode)) {
      errors.shipping.postalCode = 'El código postal debe tener 5 dígitos.'
      isValid = false
    }

    if (!shippingData.city) {
      errors.shipping.city = 'La ciudad es obligatoria.'
      isValid = false
    }

    const phoneRegex = /^(\+34|0034|34)?[6789]\d{8}$/
    if (!phoneRegex.test(shippingData.phone)) {
      errors.shipping.phone = 'Teléfono de contacto inválido.'
      isValid = false
    }
    
    if (shippingData.instructions && shippingData.instructions.length > 200) {
        errors.shipping.instructions = 'Máximo 200 caracteres.'
        isValid = false
    }

    return isValid
  }

  // Mock async validation
  const validatePostalCodeAsync = async (zip: string) => {
      return new Promise<boolean>((resolve) => {
          setTimeout(() => {
              resolve(zip === '28001' || zip === '08001') // Example valid zips
          }, 500)
      })
  }

  const nextStep = async () => {
    console.log('Current Step:', currentStep.value)
    if (currentStep.value === 1) {
        console.log('Validating Billing...')
        const isValid = validateBilling()
        console.log('Billing Valid:', isValid)
        console.log('Errors:', errors.billing)
        if (!isValid) {
            const errorMessages = Object.values(errors.billing).join('\n')
            alert('Por favor corrija los siguientes errores:\n' + errorMessages)
            return
        }
    } else if (currentStep.value === 2) {
        if (!validateShipping()) return
    }
    
    if (currentStep.value < steps.value.length) {
      currentStep.value++
    }
  }

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  return {
    currentStep,
    steps,
    billingData,
    shippingData,
    errors, 
    validatePostalCodeAsync,
    nextStep,
    prevStep,
  }
}
