export const formatCurrency = (current: number): any => {
  return current.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
}
