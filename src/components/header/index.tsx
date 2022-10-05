import Image from "next/future/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Handbag } from "phosphor-react"
import { useCart } from "../../contexts/cart"
import { CartButton, HeaderContainer } from "./styles"
import imageLogo from '../../assets/logo.svg'

interface HeaderProps {
    onModalOpen: () => void
}

export function Header({onModalOpen}: HeaderProps) {
    const {pathname} = useRouter()
    const {cart} = useCart()

    const cartCount = cart.length

    return(
        <HeaderContainer>
            {pathname.includes('product')? (
                <Link href="/">
                    <a>
                        <Image 
                        src={imageLogo}
                        width={120}
                        height={80}
                        alt=""
                        />
                    </a>
                </Link>
            ): (
                <Image
                src={imageLogo}
                width={120}
                height={80}
                alt=""
                />
            )}
                <CartButton onClick={onModalOpen}>
                    {cartCount > 0 && (<div>{cartCount}</div>)}
                    <Handbag
                    weight="bold"
                    size={28}
                    />
                </CartButton>
        </HeaderContainer>
    )
}