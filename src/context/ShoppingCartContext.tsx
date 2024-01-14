import CartScreen from "@/components/CartScreen";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";

type ShoppingCartProviderProps = {
    children: ReactNode
}
type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children}: ShoppingCartProviderProps ) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])
    
    const openCart = () => {
        setIsOpen(true);
    }
    const closeCart = () => {
        setIsOpen(false)
        
    }
    const cartQuantity = cartItems.reduce(
        (qty, item) => item.quantity + qty,
        0
        )

    function getItemQuantity (id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        const updatedCartItems = [...cartItems]
        const existingItem = updatedCartItems.find((item) => item.id === id)
    
        if (existingItem) {
          existingItem.quantity += 1
        } else {
          updatedCartItems.push({ id, quantity: 1 })
        }
    
        setCartItems(updatedCartItems)
      }
    
      function decreaseCartQuantity(id: number) {
        const updatedCartItems = [...cartItems]
        const existingItem = updatedCartItems.find((item) => item.id === id)
    
        if (existingItem) {
          if (existingItem.quantity > 1) {
            existingItem.quantity -= 1
          } else {
            // If quantity is 1, remove the item from the cart
            const index = updatedCartItems.findIndex((item) => item.id === id)
            updatedCartItems.splice(index, 1)
          }
    
          setCartItems(updatedCartItems)
        }
      }
    
      function removeFromCart(id: number) {
        const updatedCartItems = cartItems.filter((item) => item.id !== id)
        setCartItems(updatedCartItems)
      }


      return (
        <ShoppingCartContext.Provider
          value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart, cartQuantity, cartItems }}
        >
        {children}
        {isOpen && <CartScreen isOpen={isOpen}/>}
        
    </ShoppingCartContext.Provider>
      )
}