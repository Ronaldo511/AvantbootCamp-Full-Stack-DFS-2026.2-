import * as reservaService from "../services/reservaService.js";
import { reservaSchema } from "../schemas/reservaSchema.js";

function tratarErro(res, erro) {
  console.error("Erro no módulo de reservas:", erro);

  if (erro.statusCode) {
    return res.status(erro.statusCode).json({
      erro: erro.message
    });
  }

  return res.status(500).json({
    erro: "Erro interno do servidor."
  });
}

export async function listarReservas(req, res) {
  try {
    const reservas = await reservaService.listarReservas();

    return res.status(200).json(reservas);
  } catch (erro) {
    return tratarErro(res, erro);
  }
}

export async function buscarReservaPorId(req, res) {
  try {
    const reserva = await reservaService.buscarReservaPorId(req.params.id);

    if (!reserva) {
      return res.status(404).json({
        erro: "Reserva não encontrada."
      });
    }

    return res.status(200).json(reserva);
  } catch (erro) {
    return tratarErro(res, erro);
  }
}

export async function criarReserva(req, res) {
  try {
    const validacao = reservaSchema.safeParse(req.body);

    if (!validacao.success) {
      return res.status(400).json({
        erro: "Dados inválidos.",
        detalhes: validacao.error.flatten().fieldErrors
      });
    }

    const reserva = await reservaService.criarReserva(validacao.data);

    return res.status(201).json(reserva);
  } catch (erro) {
    return tratarErro(res, erro);
  }
}

export async function atualizarReserva(req, res) {
  try {
    const validacao = reservaSchema.safeParse(req.body);

    if (!validacao.success) {
      return res.status(400).json({
        erro: "Dados inválidos.",
        detalhes: validacao.error.flatten().fieldErrors
      });
    }

    const reserva = await reservaService.atualizarReserva(
      req.params.id,
      validacao.data
    );

    return res.status(200).json(reserva);
  } catch (erro) {
    return tratarErro(res, erro);
  }
}

export async function excluirReserva(req, res) {
  try {
    await reservaService.excluirReserva(req.params.id);

    return res.status(204).send();
  } catch (erro) {
    return tratarErro(res, erro);
  }
}