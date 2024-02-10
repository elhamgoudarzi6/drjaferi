import { Router } from 'express';
const router = Router();
import apiAuth from './middleware/apiAuthUser.js';
import { uploadFile, uploadFiles } from './middleware/uploader.js';

import UserController from '../controllers/user/UserController.js';
import UploadController from '../controllers/user/UploadController.js';
import ContentController from '../controllers/user/ContentController.js';
import ReserveController from '../controllers/user/ReserveController.js';
import PaymentController from '../controllers/user/PaymentController.js';

router.post('/upload', uploadFile, UploadController.uploadFile.bind(UploadController));
router.post('/multiUpload', uploadFiles, UploadController.uploadFiles.bind(UploadController));
router.post('/deleteFile', UploadController.deleteFile.bind(UploadController));

router.post('/authUser', UserController.authUser.bind(UserController));
router.put('/editUser/:id', apiAuth, UserController.editUser.bind(UserController));

router.get('/getGallery', ContentController.getGallery.bind(ContentController));
router.get('/getFaqs', ContentController.getFaqs.bind(ContentController));
router.get('/getPlans', ContentController.getPlans.bind(ContentController));
router.post('/addContactMessage', ContentController.addContactMessage.bind(ContentController));
router.get('/getPrices',ContentController.getPrices.bind(ContentController));

router.post('/addReserve', ReserveController.addReserve.bind(ReserveController));
router.put('/editReserve/:id', apiAuth, ReserveController.editReserve.bind(ReserveController));
router.delete('/deleteReserve/:id', apiAuth, ReserveController.deleteReserve.bind(ReserveController));
router.get('/getReservesByUser/:id', apiAuth, ReserveController.getReservesByUser.bind(ReserveController));

router.post('/payment',apiAuth,PaymentController.payment.bind(PaymentController));
router.post('/verifyPayment',apiAuth, PaymentController.verifyPayment.bind(PaymentController));
router.get('/getPaymentsByUser/:id', apiAuth, PaymentController.getPaymentsByUser.bind(PaymentController));

export default router;