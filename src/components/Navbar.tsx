import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import img from "../assets/shopping-cart-outline-svgrepo-com.svg"
import navlogo from "../assets/shop-svgrepo-com.svg"
import { useShoppingCart } from "@/context/ShoppingCartContext"

const Navbar = () => {
  const {openCart, cartQuantity} = useShoppingCart()

  const handleOpenCart = () => {
    console.log("Opening cart...");
    openCart();
  };

  return (
    <nav
      className={`sticky z-5 backdrop-blur-[10px] top-0 right-0 left-0 border-b-[1px]  `}
    >
      <div className="py-[12px] px-2 md:px-6 flex justify-between items-center">
        <div className="flex justify-between items-center gap-5">
             <Link to={"/"}>
          <img src={navlogo} alt="" className="w-fit " />
        </Link>

        <ul className="flex gap-5 font-worksans text-[16px] font-medium hover:cursor-pointer">
          <li>
            <Link to={"/store"}>Store</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
        </ul> 
        </div>
        <Button variant={"outline"} size={"icon"} className="relative rounded-full" onClick={handleOpenCart}>
          <img src={img} alt="..." className="w-5" />
          <div className="bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs absolute right-0 bottom-0" style={{transform: "translate(25%, 25%)"}}>{cartQuantity}</div>
        </Button>
        

      
      </div>
     
    </nav>
  )
}

export default Navbar
