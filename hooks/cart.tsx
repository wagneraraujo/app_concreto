import React, { createContext, useEffect, useContext, useState } from 'react'

const CartContext = createContext<any>('' as any)

export default function CartProvider({ children }: any) {
  const [cart, setCart] = useState([] as any)
  const [totalValue, setTotalValue] = useState<any>('' as any)

  function add(item: any) {
    const newCart = cart
    newCart.push(item)
    setCart([...newCart])
  }

  function remove(index: any) {
    let newCart = cart.filter((item: any, i: any) => i !== index)

    setCart([...newCart])
  }

  const store = {
    add,
    cart,
    totalValue,
    remove,
  }

  useEffect(() => {
    let value = 0
    cart.map((item) => {
      value = value + item.item.attributes.Preco
    })

    setTotalValue(value)
  }, [cart])

  return <CartContext.Provider value={store}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  const { cart, add, totalValue, remove } = context

  return {
    cart,
    add,
    totalValue,
    remove,
  }
}
