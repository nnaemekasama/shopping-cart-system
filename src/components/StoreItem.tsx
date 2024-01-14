import React from "react"
import { formarCurrency } from "@/utilities/formatCurrency"
import { Button } from "./ui/button"
import { useShoppingCart } from "@/context/ShoppingCartContext"

type StoreItemProps = {
  id: number
  name: string
  price: string
  imgUrl: string
}

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart()
  const qty = getItemQuantity(id)

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col justify-center">
      <img
        src={imgUrl}
        alt={name}
        className="rounded-lg mb-4 object-cover h-[200px] w-full"
      />
      <div className="flex justify-between">
        <h2 className="text-lg font-bold mb-2">{name}</h2>
        <p className="text-base">{formarCurrency(Number(price))}</p>
      </div>
      <div className="mt-auto">
        {qty === 0 ? (
          <Button variant={"default"} size={"lg"} className="w-full" onClick={()=> increaseCartQuantity(id)}>
            Add To Cart
          </Button>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center gap-1">
              <Button variant={"default"} size={"icon"} onClick={()=> decreaseCartQuantity(id)}>
                -
              </Button>
              <span className="text-sm">{qty} in Cart</span>
              <Button variant={"default"} size={"icon"} onClick={()=> increaseCartQuantity(id)}>
                +
              </Button>
            </div>
            <Button variant={"destructive"} size={"sm"} onClick={() => removeFromCart(id)}>
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default StoreItem
