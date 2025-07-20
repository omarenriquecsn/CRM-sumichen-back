import { AppDataSource } from '../config/dataBaseConfig';
import { Ticket } from '../entities/Tickets';
import { EstadoTicketEnum } from '../enums/EstadoTicketEnum';

export const getTickets = async () => {
  const ticketRepository = AppDataSource.getRepository(Ticket);
  return await ticketRepository.find();
};

export const getTicketById = async (id: string) => {
  const ticketRepository = AppDataSource.getRepository(Ticket);
  return await ticketRepository.find({ where: { vendedor_id: id } });
};

export const createTicket = async (ticketData: Partial<Ticket>) => {
  const ticketRepository = AppDataSource.getRepository(Ticket);
  const newTicket = ticketRepository.create(ticketData);
  return await ticketRepository.save(newTicket);
};

export const updateTicket = async (id: string, ticketData: Partial<Ticket>) => {
  const ticketRepository = AppDataSource.getRepository(Ticket);
  await ticketRepository.update(id, ticketData);
  return await ticketRepository.findOneBy({ id });
};

export const deleteTicket = async (id: string) => {
  const ticketRepository = AppDataSource.getRepository(Ticket);
  return await ticketRepository.update(id, {
    estado: EstadoTicketEnum.CERRADO,
  });
};
