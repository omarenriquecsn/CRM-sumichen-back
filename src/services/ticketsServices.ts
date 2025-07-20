import { Ticket } from '../entities/Tickets';
import {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from '../repositories/ticketsRepository';
import { getUsuarioById } from '../repositories/usuariosRepository';
import { ApiError } from '../utils/ApiError';

export const getTicketsService = async () => {
  const tickets = await getTickets();
  return tickets;
};

export const getTicketsByVendedorService = async (id: string) => {
  const tickets = await getTickets();
  return tickets.filter((ticket) => ticket.vendedor_id === id);
}

export const getTicketsByIdService = async (id: string) => {
  const ticket = await getTicketById(id);
  return ticket;
};

export const createTicketsService = async (ticketData: Partial<Ticket>) => {
  if (!ticketData.vendedor_id)
    throw new ApiError('El ticket debe tener el id del vendedor');

  const vendedor = await getUsuarioById(ticketData.vendedor_id);
  if (!vendedor) throw new ApiError('El vendedor no existe');

  const newTicket = await createTicket(ticketData);
  return {
    message: 'Ticket creado',
    data: newTicket,
  };
};

export const updateTicketsService = async (
  id: string,
  ticketData: Partial<Ticket>,
) => {
  const ticketActualizado = await updateTicket(id, ticketData);
  return {
    message: 'Ticket actualizado',
    data: ticketActualizado,
  };
};

export const deleteTicketsService = async (id: string) => {
  await deleteTicket(id);
  return {
    message: 'Ticket cerrado',
  };
};
