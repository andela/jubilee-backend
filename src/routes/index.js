import apiRoutes from './api';

const router = (app) => app.use('/api', apiRoutes);

export default router; 
