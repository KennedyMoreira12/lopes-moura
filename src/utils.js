export function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}

export function calcFinancing({ price, downPayment, months, annualRate }) {
  const financed = Math.max(price - downPayment, 0)
  const monthlyRate = annualRate / 100 / 12

  let installment
  if (monthlyRate === 0) {
    installment = financed > 0 ? financed / months : 0
  } else {
    installment =
      financed *
      (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)))
  }

  const total = installment * months
  const totalInterest = total - financed

  return { financed, installment, total, totalInterest }
}