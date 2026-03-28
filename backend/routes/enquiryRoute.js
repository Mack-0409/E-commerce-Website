import express from 'express';
import { createEnquiry, getEnquiries, updateEnquiry, deleteEnquiry } from '../controllers/enquiryController.js';

const enquiryRouter = express.Router();

enquiryRouter.post('/', createEnquiry);
enquiryRouter.get('/', getEnquiries);
enquiryRouter.put('/:id', updateEnquiry);
enquiryRouter.delete('/:id', deleteEnquiry);

export default enquiryRouter;
