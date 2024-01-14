import { Route, Routes } from "react-router-dom"
import "./App.css"
import Store from "./pages/Store"
import Home from "./pages/Home"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

const App = () => {
  return (
    <ShoppingCartProvider>
      <div className="">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </ShoppingCartProvider>
  )
}

export default App
