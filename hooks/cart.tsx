import React, { createContext, useEffect, useContext, useState } from 'react'
import { formatCurrency } from '../utils/formatCurrency'

const CartContext = createContext<any>('' as any)

export default function CartProvider({ children }: any) {
  const [cart, setCart] = useState([] as any)
  const [totalValue, setTotalValue] = useState<any>('' as any)
  const [textActivo, setTextActivo] = useState(false)

  function add(product: any) {
    const inCart = cart.find(
      (productInCart: any) => productInCart.item.id === product.item.id,
    )

    if (inCart) {
      setCart(
        cart.map((productInCart: any) => {
          if (productInCart.item.id === product.item.id) {
            return { ...inCart }
          } else {
            return productInCart
          }
        }),
      )
    } else {
      setCart([...cart, { ...product }])
    }
  }

  function remove(index: any) {
    let newCart = cart.filter((item: any, i: any) => i !== index)
    setTextActivo(false), setCart([...newCart])
  }

  const store = {
    add,
    cart,
    totalValue,
    remove,
    textActivo,
  }

  useEffect(() => {
    let value = 0
    cart.map((item: any) => {
      value = value + item.item.attributes.Preco
    })

    setTotalValue(formatCurrency(value))
  }, [cart])

  return <CartContext.Provider value={store}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  const { cart, add, totalValue, remove, textActivo } = context

  return {
    cart,
    add,
    totalValue,
    textActivo,
    remove,
  }
}
