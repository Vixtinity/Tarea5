import { ref, reactive, computed } from 'vue'

// Estado persistente
const currentStep = ref(1)
const billingData = reactive({ fullName: '', nif: '', email: '', phone: '', address: '', postalCode: '', city: '', province: '', country: 'España' })
const shippingData = reactive({ sameAsBilling: true, fullName: '', address: '', postalCode: '', city: '', province: '', country: 'España', phone: '', instructions: '' })

// Estado del Paso 3
const paymentData = reactive({
  method: 'card',
  cardNumber: '',
  cardHolder: '',
  cardExpiry: '',
  cardCvv: '',
  paypalEmail: '',
  transferReference: '',
  bizumPhone: '',
  discountCode: '',
  discountApplied: 0
})

const cartItems = ref([{ id: 1, name: 'Producto Tienda', price: 100, qty: 1 }])

export function useCheckout() {
  const errors = reactive({
    billing: {} as Record<string, string>,
    shipping: {} as Record<string, string>,
    payment: {} as Record<string, string>
  })

  // Totales para el Paso 4 (Soluciona el error de cartTotal)
  const totals = computed(() => {
    const subtotal = cartItems.value.reduce((acc, item) => acc + (item.price * item.qty), 0)
    const shipping = 5.95
    return {
      subtotal,
      shipping,
      discount: paymentData.discountApplied,
      total: subtotal + shipping - paymentData.discountApplied
    }
  })

  const applyDiscountAsync = async () => {
    if (paymentData.discountCode === 'VUE20') {
      paymentData.discountApplied = 20
      return { success: true, message: '¡Descuento aplicado!' }
    }
    return { success: false, message: 'Código inválido' }
  }

  const nextStep = () => { if (currentStep.value < 4) currentStep.value++ }
  const prevStep = () => { if (currentStep.value > 1) currentStep.value-- }

  return {
    currentStep, billingData, shippingData, paymentData, 
    cartItems, totals, errors, nextStep, prevStep, applyDiscountAsync,
    steps: ref([{id:1, title:'Facturación'}, {id:2, title:'Envío'}, {id:3, title:'Pago'}, {id:4, title:'Resumen'}])
  }
}