import { Router, Request, Response } from 'express';
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketsByVendedor,
} from '../controllers/ticketsControllers';
import { asyncHandler } from '../middlewares/asyncHandler';

const router: Router = Router();

router.get('/tickets', asyncHandler(getTickets));

router.get('/tickets/:id', asyncHandler(getTicketsByVendedor));

router.post('/tickets', asyncHandler(createTicket));

router.put('/tickets/:id', asyncHandler(updateTicket));

router.delete('/tickets/:id', asyncHandler(deleteTicket));

export default router;
