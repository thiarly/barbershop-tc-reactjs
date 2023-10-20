import { Router, Request, Response } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';

const router = Router();

// router.get('/teste', (req: Request, res: Response) => {
    
//     return res.send('Hello World! True 2');
// });

// --- ROTAS DE USUÁRIO ---
router.post('/users', new CreateUserController().handle);



export { router };