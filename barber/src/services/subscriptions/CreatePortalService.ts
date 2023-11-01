import prismaClient from "../../prisma";
import Stripe from 'stripe';

interface CreatePortalRequest {
    user_id: string;
}


class CreatePortalService{
    async execute({user_id}: CreatePortalRequest){
        
        const stripe = new Stripe(
            process.env.STRIPE_API_KEY,
            {
                apiVersion: '2023-10-16',
                appInfo:{
                    name: 'BarberTC',
                    version: '14.2.0'
                }
            }
        )
        
        const findUser = await prismaClient.user.findFirst({
            where:{
                id: user_id
            }
        })
        let customerId = findUser.stripe_customer_id;

        if (!customerId){
            console.log('Não existe o customer id')
            return{ message: 'Não existe o customer id'}
        }

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: process.env.STRIPE_SUCCESS_URL
        })
        return { sessionId: portalSession.url }
    }
}

export { CreatePortalService }
