import prismaClient from "../../prisma";

interface HaircutRequest {
    user_id: string;
    name: string;
    price: number;
}




class CreateHaircutService{
    async execute({ user_id, name, price}: HaircutRequest){
        if (!name || !price){
            throw new Error("Error")
        }

        // Verificar quantos modelos esse usuário tem cadastrado
        const myHaircuts = await prismaClient.haircut.findMany({
            where: {
                user_id: user_id
            }
        });
        // Verificar se ele é premium se não limitar a quantidade de modelos para cadastrar
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            include: {
                subscriptions: true,
            }
        });
        // Criar a validação para verificar se o usuário é premium ou não
        if(myHaircuts.length >= 3 && user?.subscriptions?.status !== "active"){
            throw new Error("Não é possível cadastrar mais de 3 modelos")
        }

        const haircut = await prismaClient.haircut.create({
            data: {
                user_id: user_id,
                name: name,
                price: price
            }
        });

        return haircut;
    }
}

export { CreateHaircutService };