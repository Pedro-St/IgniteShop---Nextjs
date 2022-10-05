import axios from "axios";
import Image from "next/future/image";
import { Handbag, X } from "phosphor-react";
import { useMemo, useState } from "react";
import { Loader } from "../loader/index";
import { useCart } from "../../contexts/cart";

import { formatPrice } from "../../utils/priceFormat";

import { 
    CartItem, 
    CartList, 
    CheckoutButton, 
    CloseButton, 
    ImageContainer, 
    ModalBody, 
    ModalOverlay, 
    Summary } 
    from "../../styles/Pages/cart";


interface ModalProps {
    onClose: () => void;
}


export function Cart({onClose}:ModalProps){
    const {cart, removeProductFromCart} = useCart()
    const [isPerfomingCheckout, setIsPerfomingCheckout] = useState(false)

    const totalAmount = useMemo(() => {
        return cart.reduce((acc, curr) => {
            const normalized = Number(
                curr.price.replace('$', '')
            )

            return acc + normalized
        }, 0)
    }, [cart])

    async function handleBuyManyProducts() {
        try {
            setIsPerfomingCheckout(true)
  
        const response = await axios.post(
                '/api/checkout',{
                    lineItems: cart.map((product) => {
                        const {priceId: price, quantity} = product
  
                        return { price, quantity }
            })
          }
        )
  
        const { checkoutUrl } = response.data
  
        window.location.href = checkoutUrl
      } catch {
            alert('Falied to perform operation: BUY_OPERATION')
            setIsPerfomingCheckout(false)
      }
    }
    return(
        <ModalOverlay>
            <ModalBody> 
                <CloseButton onClick={onClose}>
                <X 
                size={32} 
                weight="bold" />
                </CloseButton>

                {!cart.length ? (
                    <CartList>
                        <Handbag
                        size={128}
                        color="#4e4e4e"
                        weight="duotone"
                        />
                    </CartList>
                ) : (
                    <CartList>
                        {cart.map(product => (
                            <CartItem key={product.id}>
                                <ImageContainer>
                                    <Image
                                        src={product.imageURL}
                                        width={64}
                                        height={67}
                                        alt=""
                                    />
                                </ImageContainer>

                                <div>
                                    <p>{product.name}</p>

                                        <strong>{product.price}</strong>

                                        <button
                                            onClick={
                                                () => removeProductFromCart(product.id)
                                            }
                                            >
                                            Remover
                                        </button>
                                </div>
                            </CartItem>
                        ))}
                    </CartList>
                )}

                <Summary>
                    <p>
                        quantidade
                        <span>{cart.length}</span>
                    </p>

                    <strong>
                        total
                        <span>{formatPrice(totalAmount*100)}</span>
                    </strong>

                    <CheckoutButton
                        disabled={!cart.length || isPerfomingCheckout}
                        onClick={handleBuyManyProducts}
                        >
                            {isPerfomingCheckout ? (
                                <Loader small />
                            ): (
                                !cart.length ? (
                                    <span>ir a loja</span>
                                ) : ( 
                                    <span>Comprar</span>
                                )
                            )}
                    </CheckoutButton>
                </Summary>
            </ModalBody>
        </ModalOverlay>
    )
}

