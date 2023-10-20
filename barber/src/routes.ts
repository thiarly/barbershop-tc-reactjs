import { Router, Request, Response } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { UpdateUserController } from './controllers/user/UpdateUserController';

import { CreateHaircutController } from './controllers/haircut/CreateHaircutController';
import { ListHaircutController } from './controllers/haircut/ListHaircutController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

// router.get('/teste', (req: Request, res: Response) => {
    
//     return res.send('Hello World! True 2');
// });

// --- ROTAS DE USUÁRIO ---
router.post('/users', new CreateUserController().handle);
router.post('/login', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.put('/users', isAuthenticated, new UpdateUserController().handle);

// --- ROTAS DE HAIRCUTS ---
router.post('/haircut', isAuthenticated, new CreateHaircutController().handle);
router.get('/haircuts', isAuthenticated, new ListHaircutController().handle);



export { router };