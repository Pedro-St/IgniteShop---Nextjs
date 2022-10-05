import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, ProductsContainer} from "../styles/Pages/success";
import { SuccessContainer } from "../styles/Pages/success";


export const getServerSideProps: GetServerSideProps = async ({ query, params}) => {
    if(!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    
    const sessionId = String(query.session_id);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    });

    const costumerName = session.customer_details.name;
    const product = session.line_items.data[0].price.product as Stripe.Product;

    return{
        props: {
            costumerName,
            product: {
                name: product.name,
                imageUrl: product.images[0]
            }
        }
    }
}



type SuccessProps = InferGetServerSidePropsType<typeof getServerSideProps>

export default function success({customer, products} : SuccessProps) {
    return(
        <>
        
    <Head>
      <title>Compra Efetuada | Ignite Shop</title>
      <meta name="robots" content="noindex" />
    </Head>
        
        <SuccessContainer>
            <h1>Compra Efetuada!</h1>

            <ProductsContainer>
				  {products.map((product:any) => (
					  <ImageContainer key={product.id}>
						  <Image
							  src={product.imageURL}
                width={120}
                height={110}
                alt=""
              />
            </ImageContainer>
          ))}
        </ProductsContainer>

        <p>Uhhull, <strong>{customer}</strong>, your{products.length > 1 ? 's' : ''} <strong>{products.length} T Shirt{products.length > 1 ? 's' : ''}</strong> {products.length > 1 ? 'are' : 'is'} comming to you, stay tunned!</p>
            
            <Link href="/">
                Voltar ao catálogo
            </Link>
        </SuccessContainer>
        </>
    )
}

