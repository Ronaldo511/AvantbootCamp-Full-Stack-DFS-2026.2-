import prisma from "../config/prisma.js";

export async function listarJogadores() {
    return await prisma.jogador.findMany({
        orderBy: {
            id: "asc"
        }
    });
}

export async function criarJogador(dados) {
    return await prisma.jogador.create({
        data: dados
    });
}

export async function buscarJogadorPorId(id) {
    return await prisma.jogador.findUnique({
        where: {
            id: Number(id)
        }
    });
}

export async function atualizarJogador(id, dados) {
    return await prisma.jogador.update({
        where: {
            id: Number(id)
        },
        data: dados
    });
}

export async function excluirJogador(id) {
    return await prisma.jogador.delete({
        where: {
            id: Number(id)
        }
    });
}

