import * as jogadorService from "../services/jogadorService.js";
import { jogadorSchema } from "../schemas/jogadorSchema.js";

export async function listar(req, res) {
    try {
        const jogadores = await jogadorService.listarJogadores();

        return res.status(200).json(jogadores);

    } catch (error) {
        console.error("Erro ao listar jogadores:", error);

        return res.status(500).json({
            erro: "Erro ao listar jogadores.",
            detalhes: error.message
        });
    }
}

export async function buscarPorId(req, res) {
    try {
        const { id } = req.params;

        console.log(`Buscando jogador ${id}`);

        const jogador = await jogadorService.buscarJogadorPorId(id);

        if (!jogador) {
            return res.status(404).json({
                erro: "Jogador não encontrado."
            });
        }

        return res.status(200).json(jogador);

    } catch (error) {
        console.error("Erro ao buscar jogador:", error);

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            });
        }

        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}

export async function criar(req, res) {
    try {
        console.log("Recebida a requisição para cadastrar jogador.");

        const dados = jogadorSchema.parse(req.body);

        console.log("Dados validados:", dados);

        const jogador = await jogadorService.criarJogador(dados);

        console.log("Jogador cadastrado:", jogador);

        return res.status(201).json(jogador);

    } catch (error) {
        console.error("Erro ao criar jogador:", error);

        if (error.name === "ZodError") {
            return res.status(400).json({
                erro: "Dados inválidos.",
                detalhes: error.issues
            });
        }

        if (error.code === "P2002") {
            return res.status(409).json({
                erro: "Já existe um jogador cadastrado com este e-mail."
            });
        }

        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}

export async function atualizar(req, res) {
    try {
        const { id } = req.params;

        const dados = jogadorSchema.parse(req.body);

        const jogador = await jogadorService.atualizarJogador(id, dados);

        return res.status(200).json(jogador);

    } catch (error) {
        console.error("Erro ao atualizar jogador:", error);

        if (error.name === "ZodError") {
            return res.status(400).json({
                erro: "Dados inválidos.",
                detalhes: error.issues
            });
        }

        if (error.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            });
        }

        if (error.code === "P2025") {
            return res.status(404).json({
                erro: "Jogador não encontrado."
            });
        }

        if (error.code === "P2002") {
            return res.status(409).json({
                erro: "E-mail já cadastrado."
            });
        }

        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}


export async function excluir(req, res) {
    try {
        const { id } = req.params;

        await jogadorService.excluirJogador(id);

        return res.status(200).json({
            mensagem: "Jogador excluído com sucesso."
        });

    } catch (error) {
        console.error("Erro ao excluir jogador:", error);

        if (error?.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            });
        }

        if (error?.code === "P2025") {
            return res.status(404).json({
                erro: "Jogador não encontrado."
            });
        }

        if (error?.code === "P2003") {
            return res.status(409).json({
                erro: "Não é possível excluir o jogador porque existem reservas vinculadas."
            });
        }

        const mensagemErro = error?.message || "";

        const possuiRestricaoDeRelacionamento =
            error?.name === "PrismaClientUnknownRequestError" &&
            (
                mensagemErro.includes("violates RESTRICT setting") ||
                mensagemErro.includes("foreign key constraint") ||
                mensagemErro.includes("is referenced from table")
            );

        if (possuiRestricaoDeRelacionamento) {
            return res.status(409).json({
                erro: "Não é possível excluir o jogador porque existem reservas vinculadas."
            });
        }

        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}
