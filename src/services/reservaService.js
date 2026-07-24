import * as reservaRepository from "../repositories/reservaRepository.js";

function criarErro(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

function validarId(id, nomeCampo = "ID") {
    const idNumerico = Number(id);

    if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
        throw criarErro(`${nomeCampo} inválido.`, 400);
    }

    return idNumerico;
}

async function validarJogadorEQuadra(jogadorId, quadraId) {
    const jogador = await reservaRepository.buscarJogadorPorId(jogadorId);

    if (!jogador) {
        throw criarErro("Jogador não encontrado.", 404);
    }

    const quadra = await reservaRepository.buscarQuadraPorId(quadraId);

    if (!quadra) {
        throw criarErro("Quadra não encontrada.", 404);
    }
}

async function validarConflitoDeHorario(
    quadraId,
    dataHoraInicio,
    dataHoraFim,
    reservaIdIgnorada = null
) {
    const conflito = await reservaRepository.buscarConflitoDeHorario(
        quadraId,
        dataHoraInicio,
        dataHoraFim,
        reservaIdIgnorada
    );

    if (conflito) {
        throw criarErro(
            "A quadra já possui uma reserva nesse período.",
            409
        );
    }
}

export async function listarReservas() {
    return reservaRepository.listarReservas();
}

export async function buscarReservaPorId(id) {
    const idNumerico = validarId(id, "ID da reserva");

    return reservaRepository.buscarReservaPorId(idNumerico);
}

export async function criarReserva(dados) {
    const jogadorId = validarId(dados.jogadorId, "ID do jogador");
    const quadraId = validarId(dados.quadraId, "ID da quadra");

    await validarJogadorEQuadra(jogadorId, quadraId);

    await validarConflitoDeHorario(
        quadraId,
        dados.dataHoraInicio,
        dados.dataHoraFim
    );

    return reservaRepository.criarReserva({
        ...dados,
        jogadorId,
        quadraId
    });
}

export async function atualizarReserva(id, dados) {
    const idNumerico = validarId(id, "ID da reserva");
    const jogadorId = validarId(dados.jogadorId, "ID do jogador");
    const quadraId = validarId(dados.quadraId, "ID da quadra");

    const reservaExistente =
        await reservaRepository.buscarReservaPorId(idNumerico);

    if (!reservaExistente) {
        throw criarErro("Reserva não encontrada.", 404);
    }

    await validarJogadorEQuadra(jogadorId, quadraId);

    await validarConflitoDeHorario(
        quadraId,
        dados.dataHoraInicio,
        dados.dataHoraFim,
        idNumerico
    );

    return reservaRepository.atualizarReserva(idNumerico, {
        ...dados,
        jogadorId,
        quadraId
    });
}

export async function excluirReserva(id) {
    const idNumerico = validarId(id, "ID da reserva");

    const reserva = await reservaRepository.buscarReservaPorId(idNumerico);

    if (!reserva) {
        throw criarErro("Reserva não encontrada.", 404);
    }

    return reservaRepository.excluirReserva(idNumerico);
}