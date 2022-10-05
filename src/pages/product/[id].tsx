import axios from "axios"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import Image from "next/future/image"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import Stripe from "stripe"
import { Loader } from "../../components/loader"
import { stripe } from "../../lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails, Skeleton } from "../../styles/Pages/product"
import { formatPrice } from "../../utils/priceFormat"

export const getStaticPaths: GetStaticPaths = async() => {
    return {
        paths: [
            { params: {id: 'prod_MSh3CfOgk3dggW'}}
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id as string
  const response = await stripe.products.retrieve(id, {
	  expand: ['default_price'],
  })

  const defaultPrice = response.default_price as Stripe.Price

  const product = {
	  id,
    priceId: defaultPrice.id,
    imageUrl: response.images[0],
    price: formatPrice(defaultPrice.unit_amount),
	  name: response.name,
    description: response.description,
    imageURL: response.images[0]
  }

  return {
    props: {
		  product
    },
    revalidate: 60 * 60 * 24 * 7,
  }
}

type ProductProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const [isPerformingCheckout, setIsPerformingCheckout] = useState(false)

  async function handleBuyProduct() {
	  try {
		  setIsPerformingCheckout(true)

		  const response = await axios.post(
			  '/api/checkout',{
				  lineItems: [
					  { price: product.price, quantity: 1}
          ]
			  }
      )

      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    } catch {
		  alert('Falied to perform operation: BUY_OPERATION')
      setIsPerformingCheckout(false)
    }
  }

  if(isFallback) {
	  return (
		<Skeleton>
			  <Loader/>
        </Skeleton>
    )
  }

  return (
    <>
      <Head>
		  <title>{product.name} | IgniteShop</title>
      </Head>
	  <ProductContainer>
		  <ImageContainer>
			  <Image
				  src={product.imageUrl}
  			  width={520}
	   			height={480}
		  		alt=""
		  	/>
        </ImageContainer>

        <ProductDetails>
    		<h1>{product.name}</h1>

          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
				  onClick={handleBuyProduct}
            disabled={isPerformingCheckout}
          >
				  {isPerformingCheckout ? (
					  <Loader small />
            ) : (
  				  <span>Adicionar na Sacola</span>
            )}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}
