import { Router } from "express";

import {
  listarReservas,
  buscarReservaPorId,
  criarReserva,
  atualizarReserva,
  excluirReserva
} from "../controllers/reservaController.js";

const router = Router();

router.get("/", listarReservas);

router.get("/:id", buscarReservaPorId);

router.post("/", criarReserva);

router.put("/:id", atualizarReserva);

router.delete("/:id", excluirReserva);

export default router;
