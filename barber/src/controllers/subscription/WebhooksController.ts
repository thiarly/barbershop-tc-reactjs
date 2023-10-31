import { Request, Response } from 'express';
import Stripe from 'stripe';
import { stripe } from '../../utils/stripe';

import { saveSubscription } from '../../utils/manageSubscription';

class WebhooksController {
    async handle(request: Request, response: Response) {
        let event: Stripe.Event = request.body;

        const endpointSecret ='whsec_adc62db3ecf74431c80bea72ff659bc169cf22aa0d27a6be2a40daa30eed940c'

        if (endpointSecret) {
            const signature = request.headers['stripe-signature'];
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
                // Caso ele tenha cancelado a assinatura, eu preciso atualizar o banco de dados

                const payment = event.data.object as Stripe.Subscription;

                await saveSubscription(
                    payment.id,
                    payment.customer.toString(),
                    false,
                    true
                );

                break;
            case 'customer.subscription.updated':
                // Caso ele tenha atualizado a assinatura, eu preciso atualizar o banco de dados

                const paymentUpdated = event.data.object as Stripe.Subscription;
                
                await saveSubscription(
                    paymentUpdated.id,
                    paymentUpdated.customer.toString(),
                    false
                );

                break;
            case 'checkout.session.completed':
                // Caso ele tenha finalizado o checkout, eu preciso atualizar o banco de dados

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
