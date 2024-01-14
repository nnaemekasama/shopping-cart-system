import { useShoppingCart } from "@/context/ShoppingCartContext"
import React from "react"
import StoreItems from "../data/items.json"
import { formarCurrency } from "@/utilities/formatCurrency"
import { Button } from "./ui/button"

type CartItemProps = {
  id: number
  quantity: number
}

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart()
  const item = StoreItems.find((i) => i.id === id)
  if (item == null) return null
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={item.imgUrl}
          alt={item.name}
          className="w-[125px] object-cover h-[75px]"
        />
        <div>
          <div>
            {item.name}{" "}
            {quantity > 1 && (
              <span className="font-thin text-xs">x{quantity}</span>
            )}
          </div>
          <div>{formarCurrency(Number(item.price))}</div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <p>{formarCurrency(quantity * Number(item.price))}</p>
        <Button size={"icon"} variant={"ghost"} onClick={() => removeFromCart(item.id)}>
          -
        </Button>
      </div>
    </div>
  )
}

export default CartItem
