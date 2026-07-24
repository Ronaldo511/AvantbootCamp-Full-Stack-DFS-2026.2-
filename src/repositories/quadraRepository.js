import prisma from "../config/prisma.js";

export async function listarQuadras() {
  return prisma.quadra.findMany({
    orderBy: {
      id: "asc"
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

export async function criarQuadra(dados) {
  return prisma.quadra.create({
    data: dados
  });
}

export async function atualizarQuadra(id, dados) {
  return prisma.quadra.update({
    where: {
      id: Number(id)
    },
    data: dados
  });
}

export async function excluirQuadra(id) {
  return prisma.quadra.delete({
    where: {
      id: Number(id)
    }
  });
}

export async function buscarReservasPorQuadraEPeriodo(
  quadraId,
  inicioPeriodo,
  fimPeriodo
) {
  return prisma.reserva.findMany({
    where: {
      quadraId: Number(quadraId),

      dataHoraInicio: {
        lt: fimPeriodo
      },

      dataHoraFim: {
        gt: inicioPeriodo
      }
    },

    orderBy: {
      dataHoraInicio: "asc"
    },

    include: {
      jogador: true
    }
  });
}