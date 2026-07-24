import express from "express";
import cors from "cors";

import jogadorRoutes from "./routes/jogadorRoutes.js";
import quadraRoutes from "./routes/quadraRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req, res) => {
    return res.status(200).json({ message: "API de agendamento de Quadras Funcionando!" 

    });

});

app.use("/jogadores", jogadorRoutes);
app.use("/quadras", quadraRoutes);
app.use("/reservas", reservaRoutes);
export default app;

