import { createContext, useReducer } from "react";

import { createAction } from '../utils/reducer/reducer.utils';

// takes [cartItems] and a product to add to arr
const addCartItem = (cartItems, productToAdd) => {
    // if the item exists in the arr then we set it to existingCartItem
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    // if existingCartItem then find it in the cartItems and add 1 to the quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    // return all of the cartItems and the productToAdd with a quantity of 1, if it wasn't an existingCartItem
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
    // if the item exists in the arr then we set it to existingCartItem
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );
    // if existingCartItem quantity greater than 0
    if (existingCartItem.quantity > 1) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
    } else {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    }
};

const clearItemFromCart = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0,
});

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const USER_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'SET_CART_ITEMS':
            return {
                ...state,
                ...payload
            }
        case 'SET_IS_CART_OPEN':
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandled type of ${type} in cartRe ducer.`)
    }
}

export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );

        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );

        dispatch(createAction(USER_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal }))
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems)
    };

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems)
    };

    const clearItemFromCartList = (productToRemove) => {
        const newCartItems = clearItemFromCart(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems)
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCartList,
        cartItems,
        cartCount,
        cartTotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
