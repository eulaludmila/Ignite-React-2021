import { NextApiRequest, NextApiResponse } from "next";
import {getSession} from 'next-auth/client'
import { stripe } from "../../services/stripe";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('ENTROU');
  
  if(req.method === 'POST'){ //verificar se a req é POST - Na doc do stripe é preciso ser POST
    const session = await getSession({req}); //Só consigo pegar no back-end o usuário que está logado dessa forma 
    //O customer é quem está comprando esse pacote/assinatura aqui dentro
		//Aqui vou criar o customer no stripe
		const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
      //metadata
    })
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      //depois de criado, eu vou passar o id do customer
			customer: stripeCustomer.id, //é o id do customer do stripe e não do faunadb
      payment_method_types: ['card'], //método de pagamento - no caso é o cartão
      billing_address_collection: 'required', //deixar obrigatório o endereço
      line_items: [//irens do carrinho
        { price: 'price_1JUAjWHzEWGa9YyBPthBIjli', quantity: 1}
				//id do preço e quantidade, como é só um produto, colocado de forma estática o id
      ],
      mode: 'subscription', //modo de assinatura mensal
      allow_promotion_codes: true, //Permite código promocional
      success_url: process.env.STRIPE_SUCCESS_URL, //Redireciona para essa url quando finalizar
      cancel_url: process.env.STRIPE_CANCEL_URL, //Redireciona para essa url caso cancelado
    })

		//depois de criado a sessão de checkout, eu retorno o id dessa sessão de checkout
    return res.status(200).json({sessionId: stripeCheckoutSession.id})
  }else{
    res.setHeader('Allow', 'POST'); //Retornar no HEADER que é permitido só POST
    res.status(405).end('Method not allowed');
  }
}