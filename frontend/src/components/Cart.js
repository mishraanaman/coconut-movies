import { useSelector } from "react-redux";

const Cart =()=>{

    const cartItems = useSelector((store) => store.cart.items);

    return(
        <>
        <h1>Cart</h1>
        <h1>{cartItems}</h1>
        </>
    )
}

export default Cart