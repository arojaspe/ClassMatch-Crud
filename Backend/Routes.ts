import { Router } from "express";
import * as Conts from "./Controllers";

const router= Router();

//User Management
router.get("/personas", Conts.getPersonas);
router.get("/persona/:id", Conts.getPersona);
router.post("/persona", Conts.postPersona);
router.put("/persona/:id", Conts.putPersona)
router.delete("/persona/:id", Conts.deletePersona);

export default router;