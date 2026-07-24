import * as jogadorRepository from "../repositories/jogadorRepository.js";

export async function listarJogadores() {
    return await jogadorRepository.listarJogadores();
}

export async function criarJogador(dados) {
    return await jogadorRepository.criarJogador(dados);
}

export async function buscarJogadorPorId(id) {
    const idNumerico = validarId(id);

    return await jogadorRepository.buscarJogadorPorId(idNumerico);
}

export async function atualizarJogador(id, dados) {
    const idNumerico = validarId(id);

    return await jogadorRepository.atualizarJogador(
        idNumerico,
        dados
    );
}

export async function excluirJogador(id) {
    const idNumerico = validarId(id);

    return await jogadorRepository.excluirJogador(idNumerico);
}

function validarId(id) {
    const idNumerico = Number(id);

    if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
        const error = new Error("ID do jogador inválido.");
        error.statusCode = 400;
        throw error;
    }

    return idNumerico;
}