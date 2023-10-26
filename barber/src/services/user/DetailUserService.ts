import prismaClient from "../../prisma";

class DetailUserService {
    async execute(user_id: string){

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                endereco: true,
                created_at: true,
                updated_at: true,
                subscriptions: {
                    select: {
                    id: true,
                    priceId: true,
                    status: true,
                    }
                }
            }
        });

        return user;
    }
}


export { DetailUserService };