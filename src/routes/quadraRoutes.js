import { Router } from "express";
import * as quadraController from "../controllers/quadraController.js";

const router = Router();

router.get("/", quadraController.listar);

router.get("/:id/agenda", quadraController.buscarAgenda);

router.get("/:id", quadraController.buscarPorId);

router.post("/", quadraController.criar);

router.put("/:id", quadraController.atualizar);

router.delete("/:id", quadraController.excluir);

export default router;