import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import * as homeController from '@/controllers/home';
import * as chatbotController from '@/controllers/chatbot'; 
import swaggerDocument from '../../swagger.json';
import chatbotRoute from './chatbotRoute';

const router = Router();

router.get('/', homeController.index);

router.get('/health', homeController.healthCheck);
router.post('/chat', chatbotController.chat);
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));
router.use('/api', chatbotRoute);

export default router;
