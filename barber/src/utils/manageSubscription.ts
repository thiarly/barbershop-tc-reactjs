import { stripe } from "./stripe";
import prismaClient from "../prisma";

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction = false,
    deleteAction = false
) {
    const findUser = await prismaClient.user.findFirst({
        where: {
            stripe_customer_id: customerId
        },
        include: {
            subscriptions: true
        }
    });

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
        id: subscription.id,
        userId: findUser.id,
        status: subscription.status,
        priceId: subscription.items.data[0].price.id
    }

    if (createAction) {
        console.log(subscriptionData);

        try {
            await prismaClient.subscription.create({
                data: subscriptionData
            });

        } catch (err) {
            console.log("Erro ao criar a subscription no banco de dados");
            console.log(err);
        }

    } else {
        if (deleteAction) {
            await prismaClient.subscription.delete({
                where: {
                    id: subscriptionId,
                }
            });
            return;
        }
        try {
            await prismaClient.subscription.update({
                where: {
                    id: subscriptionId,
                },
                data: {
                    status: subscriptionData.status,
                    priceId: subscriptionData.priceId
                }
            });
        } catch (err) {
            console.log("Erro ao atualizar a subscription no banco de dados");
            console.log(err);
        }
    }
}
