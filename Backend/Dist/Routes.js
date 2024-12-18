"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Conts = __importStar(require("./Controllers"));
const router = (0, express_1.Router)();
//User Management
router.get("/personas", Conts.getPersonas);
router.get("/persona/:id", Conts.getPersona);
router.post("/persona", Conts.postPersona);
router.put("/persona/:id", Conts.putPersona);
router.delete("/persona/:id", Conts.deletePersona);
// Viviendas
router.get("/viviendas", Conts.getViviendas);
router.get("/vivienda/:id", Conts.getPersona);
//router.post("/vivienda", Conts.postPersona);
//router.put("/vivienda/:id", Conts.putPersona);
//router.delete("/vivienda/:id", Conts.deletePersona);
//User Management
router.get("/gobernadores", Conts.getGobernadores);
exports.default = router;
