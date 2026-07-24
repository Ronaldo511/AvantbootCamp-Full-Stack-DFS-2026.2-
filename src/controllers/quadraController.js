import * as quadraService from "../services/quadraService.js";
import { quadraSchema } from "../schemas/quadraSchema.js";

function tratarErroDoService(res, error) {
  if (error.statusCode) {
    return res.status(error.statusCode).json({
      erro: error.message
    });
  }

  return null;
}

export async function listar(req, res) {
  try {
    const quadras = await quadraService.listarQuadras();

    return res.status(200).json(quadras);
  } catch (error) {
    console.error("Erro ao listar quadras:", error);

    return res.status(500).json({
      erro: "Erro interno do servidor."
    });
  }
}

export async function buscarPorId(req, res) {
  try {
    const quadra = await quadraService.buscarQuadraPorId(
      req.params.id
    );

    if (!quadra) {
      return res.status(404).json({
        erro: "Quadra não encontrada."
      });
    }

    return res.status(200).json(quadra);
  } catch (error) {
    console.error("Erro ao buscar quadra:", error);

    const respostaTratada = tratarErroDoService(
      res,
      error
    );

    if (respostaTratada) {
      return respostaTratada;
    }

    return res.status(500).json({
      erro: "Erro interno do servidor."
    });
  }
}

export async function criar(req, res) {
  try {
    const dados = quadraSchema.parse(req.body);

    const quadra = await quadraService.criarQuadra(
      dados
    );

    return res.status(201).json(quadra);
  } catch (error) {
    console.error("Erro ao criar quadra:", error);

    if (error.name === "ZodError") {
      return res.status(400).json({
        erro: "Dados inválidos.",
        detalhes: error.issues
      });
    }

    return res.status(500).json({
      erro: "Erro interno do servidor."
    });
  }
}

export async function atualizar(req, res) {
  try {
    const dados = quadraSchema.parse(req.body);

    const quadra =
      await quadraService.atualizarQuadra(
        req.params.id,
        dados
      );

    return res.status(200).json(quadra);
  } catch (error) {
    console.error("Erro ao atualizar quadra:", error);

    if (error.name === "ZodError") {
      return res.status(400).json({
        erro: "Dados inválidos.",
        detalhes: error.issues
      });
    }

    const respostaTratada = tratarErroDoService(
      res,
      error
    );

    if (respostaTratada) {
      return respostaTratada;
    }

    if (error.code === "P2025") {
      return res.status(404).json({
        erro: "Quadra não encontrada."
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

        await quadraService.excluirQuadra(id);

        return res.status(200).json({
            mensagem: "Quadra excluída com sucesso."
        });

    } catch (error) {
        console.error("Erro ao excluir quadra:", error);

        if (error?.statusCode) {
            return res.status(error.statusCode).json({
                erro: error.message
            });
        }

        if (error?.code === "P2025") {
            return res.status(404).json({
                erro: "Quadra não encontrada."
            });
        }

        if (error?.code === "P2003") {
            return res.status(409).json({
                erro: "Não é possível excluir a quadra porque existem reservas vinculadas."
            });
        }

        const mensagemErro = error?.message || "";

        const possuiReservasVinculadas =
            error?.name === "PrismaClientUnknownRequestError" &&
            (
                mensagemErro.includes("violates RESTRICT setting") ||
                mensagemErro.includes("foreign key constraint") ||
                mensagemErro.includes("is referenced from table") ||
                mensagemErro.includes("Reserva_quadraId_fkey")
            );

        if (possuiReservasVinculadas) {
            return res.status(409).json({
                erro: "Não é possível excluir a quadra porque existem reservas vinculadas."
            });
        }

        return res.status(500).json({
            erro: "Erro interno do servidor."
        });
    }
}

export async function buscarAgenda(req, res) {
  try {
    const { id } = req.params;
    const { data } = req.query;

    const agenda =
      await quadraService.buscarAgendaPorQuadra(
        id,
        data
      );

    return res.status(200).json(agenda);
  } catch (error) {
    console.error(
      "Erro ao buscar agenda da quadra:",
      error
    );

    const respostaTratada = tratarErroDoService(
      res,
      error
    );

    if (respostaTratada) {
      return respostaTratada;
    }

    return res.status(500).json({
      erro: "Erro interno do servidor."
    });
  }
}