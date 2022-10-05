import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"

import { Container } from "../styles/Pages/app";

import { useState } from "react";
import { CartProvider } from "../contexts/cart";
import {Cart} from "../components/cart-modal/cart";

import {Header} from '../components/header/index'

globalStyles();

function MyApp({ Component, pageProps }: AppProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  return(
    <CartProvider>
        {isCartOpen && ( 
          <Cart onClose={() => setIsCartOpen(false)} />
        )}
   <Container>
      <Header onModalOpen={() => setIsCartOpen(true)} />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
export default MyApp
