import { Request, Response } from 'express';
import Stripe from 'stripe';
import { stripe } from '../../utils/stripe';

import { saveSubscription } from '../../utils/manageSubscription';

class WebhooksController {
    async handle(request: Request, response: Response) {
        let event: Stripe.Event = request.body;
        
        let endpointSecret: 'whsec_adc62db3ecf74431c80bea72ff659bc169cf22aa0d27a6be2a40daa30eed940c'

        if(endpointSecret){
            const signature = request.headers['stripe-signature']
        //console.log("Valor da variável de ambiente STRIPE_WEBHOOK_SECRET:", process.env.STRIPE_WEBHOOK_SECRET);
        try {
            event = stripe.webhooks.constructEvent(
                request.body, 
                signature, 
                endpointSecret
            );
        } catch (err) {
            console.log("Webhook signature failed", err.message);
            return response.sendStatus(400);
        }
    }
        switch (event.type) {
            case 'customer.subscription.deleted':
                const payment = event.data.object as Stripe.Subscription;
                await saveSubscription(
                    payment.id,
                    payment.customer.toString(),
                    false,
                    true
                );
                break;
            case 'customer.subscription.updated':
                const paymentIntent = event.data.object as Stripe.Subscription;
                await saveSubscription(
                    paymentIntent.id,
                    paymentIntent.customer.toString(),
                    false
                );
                break;
            case 'checkout.session.completed':
                const checkoutSession = event.data.object as Stripe.Checkout.Session;
                await saveSubscription(
                    checkoutSession.subscription.toString(),
                    checkoutSession.customer.toString(),
                    true
                );
                break;
            default:
                console.log(`Evento não tratado: ${event.type}`);
        }

        response.send();
    }
}

export { WebhooksController };
