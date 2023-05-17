import { createContext, useState, React } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { }
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const value = { isCartOpen, setIsCartOpen }

    return <CartContext.Provider>{children}</CartContext.Provider>;
}

export default CartContext 