import * as quadraRepository from "../repositories/quadraRepository.js";

const HORA_ABERTURA = 8;
const HORA_FECHAMENTO = 22;
const DURACAO_INTERVALO_MINUTOS = 60;

function criarErro(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;

  return error;
}

function validarId(id) {
  const idNumerico = Number(id);

  if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
    throw criarErro("ID da quadra inválido.", 400);
  }

  return idNumerico;
}

function validarData(data) {
  if (!data) {
    throw criarErro(
      "A data é obrigatória. Utilize o formato AAAA-MM-DD.",
      400
    );
  }

  const formatoValido = /^\d{4}-\d{2}-\d{2}$/;

  if (!formatoValido.test(data)) {
    throw criarErro(
      "Data inválida. Utilize o formato AAAA-MM-DD.",
      400
    );
  }

  const [ano, mes, dia] = data.split("-").map(Number);

  const dataValidada = new Date(
    Date.UTC(ano, mes - 1, dia)
  );

  const anoValidado = dataValidada.getUTCFullYear();
  const mesValidado = dataValidada.getUTCMonth() + 1;
  const diaValidado = dataValidada.getUTCDate();

  if (
    anoValidado !== ano ||
    mesValidado !== mes ||
    diaValidado !== dia
  ) {
    throw criarErro(
      "Data inexistente. Informe uma data válida.",
      400
    );
  }

  return {
    ano,
    mes,
    dia
  };
}

function criarDataUtc(ano, mes, dia, hora, minuto = 0) {
  return new Date(
    Date.UTC(
      ano,
      mes - 1,
      dia,
      hora,
      minuto,
      0,
      0
    )
  );
}

function existeConflito(
  inicioIntervalo,
  fimIntervalo,
  reserva
) {
  const inicioReserva = new Date(reserva.dataHoraInicio);
  const fimReserva = new Date(reserva.dataHoraFim);

  return (
    inicioReserva < fimIntervalo &&
    fimReserva > inicioIntervalo
  );
}

function gerarIntervalos(ano, mes, dia, reservas) {
  const intervalos = [];

  let inicioIntervalo = criarDataUtc(
    ano,
    mes,
    dia,
    HORA_ABERTURA
  );

  const fimFuncionamento = criarDataUtc(
    ano,
    mes,
    dia,
    HORA_FECHAMENTO
  );

  while (inicioIntervalo < fimFuncionamento) {
    const fimIntervalo = new Date(
      inicioIntervalo.getTime() +
        DURACAO_INTERVALO_MINUTOS * 60 * 1000
    );

    const reservaEncontrada = reservas.find((reserva) =>
      existeConflito(
        inicioIntervalo,
        fimIntervalo,
        reserva
      )
    );

    intervalos.push({
      inicio: inicioIntervalo.toISOString(),
      fim: fimIntervalo.toISOString(),
      status: reservaEncontrada
        ? "OCUPADO"
        : "DISPONIVEL",

      reserva: reservaEncontrada
        ? {
            id: reservaEncontrada.id,

            jogador: {
              id: reservaEncontrada.jogador.id,
              nome: reservaEncontrada.jogador.nome
            },

            dataHoraInicio:
              reservaEncontrada.dataHoraInicio,

            dataHoraFim:
              reservaEncontrada.dataHoraFim
          }
        : null
    });

    inicioIntervalo = fimIntervalo;
  }

  return intervalos;
}

export async function listarQuadras() {
  return quadraRepository.listarQuadras();
}

export async function buscarQuadraPorId(id) {
  const idNumerico = validarId(id);

  return quadraRepository.buscarQuadraPorId(idNumerico);
}

export async function criarQuadra(dados) {
  return quadraRepository.criarQuadra(dados);
}

export async function atualizarQuadra(id, dados) {
  const idNumerico = validarId(id);

  return quadraRepository.atualizarQuadra(
    idNumerico,
    dados
  );
}

export async function excluirQuadra(id) {
  const idNumerico = validarId(id);

  return quadraRepository.excluirQuadra(idNumerico);
}

export async function buscarAgendaPorQuadra(id, data) {
  const quadraId = validarId(id);

  const { ano, mes, dia } = validarData(data);

  const quadra =
    await quadraRepository.buscarQuadraPorId(quadraId);

  if (!quadra) {
    throw criarErro("Quadra não encontrada.", 404);
  }

  const inicioDoDia = criarDataUtc(
    ano,
    mes,
    dia,
    0
  );

  const inicioDoDiaSeguinte = new Date(
    inicioDoDia.getTime() + 24 * 60 * 60 * 1000
  );

  const reservas =
    await quadraRepository.buscarReservasPorQuadraEPeriodo(
      quadraId,
      inicioDoDia,
      inicioDoDiaSeguinte
    );

  const intervalos = gerarIntervalos(
    ano,
    mes,
    dia,
    reservas
  );

  const totalOcupados = intervalos.filter(
    (intervalo) => intervalo.status === "OCUPADO"
  ).length;

  const totalDisponiveis = intervalos.filter(
    (intervalo) =>
      intervalo.status === "DISPONIVEL"
  ).length;

  return {
    quadra: {
      id: quadra.id,
      nome: quadra.nome,
      modalidade: quadra.modalidade,
      localizacao: quadra.localizacao
    },

    data,

    funcionamento: {
      abertura: `${String(HORA_ABERTURA).padStart(
        2,
        "0"
      )}:00`,

      fechamento: `${String(
        HORA_FECHAMENTO
      ).padStart(2, "0")}:00`,

      duracaoIntervaloMinutos:
        DURACAO_INTERVALO_MINUTOS
    },

    resumo: {
      totalIntervalos: intervalos.length,
      ocupados: totalOcupados,
      disponiveis: totalDisponiveis
    },

    intervalos
  };
}
