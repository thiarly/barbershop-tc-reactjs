import prismaClient from "../../prisma";

interface NewScheduleRequest{
    user_id: string;
    haircut_id: string;
    customerId: string;
}

class NewScheduleService{
    async execute({ user_id, haircut_id, customerId }: NewScheduleRequest){

        if (customerId === ''|| haircut_id === ''){
            throw new Error("Erro ao criar agendamento");
        };

        const schedule = await prismaClient.service.create({
            data: {
                customerId,
                haircut_id,
                user_id,
            }
        });

        return schedule;
    }
}

export { NewScheduleService };