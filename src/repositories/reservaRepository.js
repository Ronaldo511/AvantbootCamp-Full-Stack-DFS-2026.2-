import prisma from "../config/prisma.js";

export async function listarReservas() {
    return prisma.reserva.findMany({
        orderBy: {
            dataHoraInicio: "asc"
        },
        include: {
            jogador: true,
            quadra: true
        }
    });
}

export async function buscarReservaPorId(id) {
    return prisma.reserva.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            jogador: true,
            quadra: true
        }
    });
}

export async function criarReserva(dados) {
    return prisma.reserva.create({
        data: dados,
        include: {
            jogador: true,
            quadra: true
        }
    });
}

export async function atualizarReserva(id, dados) {
    return prisma.reserva.update({
        where: {
            id: Number(id)
        },
        data: dados,
        include: {
            jogador: true,
            quadra: true
        }
    });
}

export async function excluirReserva(id) {
    return prisma.reserva.delete({
        where: {
            id: Number(id)
        },
        include: {
            jogador: true,
            quadra: true
        }
    });
}

export async function buscarJogadorPorId(id) {
    return prisma.jogador.findUnique({
        where: {
            id: Number(id)
        }
    });
}

export async function buscarQuadraPorId(id) {
    return prisma.quadra.findUnique({
        where: {
            id: Number(id)
        }
    });
}

export async function buscarConflitoDeHorario(
    quadraId,
    dataHoraInicio,
    dataHoraFim,
    reservaIdIgnorada = null
) {
    return prisma.reserva.findFirst({
        where: {
            quadraId: Number(quadraId),

            dataHoraInicio: {
                lt: dataHoraFim
            },

            dataHoraFim: {
                gt: dataHoraInicio
            },

            ...(reservaIdIgnorada && {
                id: {
                    not: Number(reservaIdIgnorada)
                }
            })
        }
    });
}
    

    
