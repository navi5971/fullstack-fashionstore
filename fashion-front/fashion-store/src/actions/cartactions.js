
export const addToCart = (item, quantity, variant) => (dispatch, getState) => {

    var cartItems = {
        name: item.name,
        _id: item._id,
        image: item.image,
        variant: variant,
        quantity: Number(quantity),
        prices: item.prices,
        price: item.prices[variant] * quantity,
        rating: item.rating
    }


    if (cartItems.quantity > 10) {
        alert('you cannot add more than 10 items')
    }
    else {



        if (cartItems.quantity < 1) {
            dispatch({ type: 'DELETE_FROM_CART', payload: item })
        }
        else {
            dispatch({ type: 'ADD_TO_CART', payload: cartItems });
        }
    }

    const cartItem = getState().cartReducer.cartItems;

    localStorage.setItem('cartItems', JSON.stringify(cartItem));
}

export const deleteFromCart = (item) => (dispatch, getState) => {
    dispatch({ type: 'DELETE_FROM_CART', payload: item })
    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems', JSON.stringify(cartItems))


};