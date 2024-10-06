import Badge from "@/components/Badge";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function Cart() {
    const [productInCart, setProductInCart] = useState([])

    useEffect(() => {
        setProductInCart([1,2,3])
    }, [])

    return (
        <Badge
            to="/weather"
            content={productInCart}
            icon={<FontAwesomeIcon icon={faBasketShopping} />}
            iconColor={"icon-badge-color-black"}
            badgeColor={"badge-color-primary"}
            small
            textColor={"badge-color-success"}
        >
        </Badge>
    )
}
export default Cart;