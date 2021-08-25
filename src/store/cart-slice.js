import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        quantity: 0,
        totalPrice: 0,
    },
    reducers: {
        add(state, action) {
        const newItem = action.payload
        const existingItem = state.items.find(item => item.id === newItem.id)

        if (!existingItem) {
            state.items.push({
                id: newItem.id,
                title: newItem.title,
                description: newItem.description,
                price: newItem.price,
                quantity: 1,
                totalPrice: newItem.price,
            })} else {
                existingItem.quantity++
                existingItem.totalPrice = existingItem.totalPrice + newItem.totalPrice
            }
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice