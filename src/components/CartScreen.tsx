import { useShoppingCart } from "@/context/ShoppingCartContext"
import { Button } from "./ui/button"
import StoreItems from "../data/items.json"
import CartItem from "./CartItem"
import { formarCurrency } from "@/utilities/formatCurrency"

type ShoppingCartProps = {
  isOpen: boolean
}

const CartScreen = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart()

  const total = cartItems.reduce((total, cItem) => {
    const item = StoreItems.find((i) => i.id === cItem.id)
    return total + Number(item?.price || 0) * cItem.quantity
  }, 0)

  return (
    <div
      className={`fixed bg-slate-100 h-full top-0 right-0 w-full md:w-1/2 z-10 shadow-md px-8 duration-500 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } px-12`}
    >
      <div className="flex items-center justify-between">
        <h2>Your Cart</h2>
        <Button size={"icon"} variant={"ghost"} onClick={closeCart}>
          x
        </Button>
      </div>
      <div className="space-y-10 ">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className="flex justify-end">Total: {formarCurrency(total)}</div>
    </div>
  )
}

export default CartScreen
