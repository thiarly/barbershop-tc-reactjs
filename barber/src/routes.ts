import { Router, Request, Response } from 'express';

const router = Router();

router.get('/teste', (req: Request, res: Response) => {
    
    return res.send('Hello World! True 2');
});

export { router };