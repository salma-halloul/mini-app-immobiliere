"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_service_1 = require("../services/item.service");
const item_schema_1 = require("../schemas/item.schema");
const router = express_1.default.Router();
router.get("/items", (req, res) => {
    const items = item_service_1.ItemService.findAll();
    res.json(items);
});
router.get("/items/:id", (req, res) => {
    const parseResult = item_schema_1.ItemParamsSchema.safeParse(req.params);
    if (!parseResult.success) {
        return res.status(400).json(parseResult.error.issues);
    }
    const params = parseResult.data;
    const item = item_service_1.ItemService.findById(params.id);
    if (item) {
        res.json(item);
    }
    else {
        res.status(404).send("Item not found");
    }
});
router.post("/items", (req, res) => {
    const parseResult = item_schema_1.ItemBodySchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json(parseResult.error.issues);
    }
    const dto = parseResult.data;
    const newItem = item_service_1.ItemService.create(dto.title, dto.city, dto.price, dto.surface, dto.image);
    res.status(201).json(newItem);
});
router.put("/items/:id", (req, res) => {
    const paramsResult = item_schema_1.ItemParamsSchema.safeParse(req.params);
    const bodyResult = item_schema_1.ItemBodySchema.partial().safeParse(req.body);
    if (!paramsResult.success) {
        return res.status(400).json(paramsResult.error.issues);
    }
    if (!bodyResult.success) {
        return res.status(400).json(bodyResult.error.issues);
    }
    const params = paramsResult.data;
    const updated = item_service_1.ItemService.update(params.id, bodyResult.data);
    if (updated) {
        res.send("Item updated successfully");
    }
    else {
        res.status(404).send("Item not found");
    }
});
router.delete("/items/:id", (req, res) => {
    const parseResult = item_schema_1.ItemParamsSchema.safeParse(req.params);
    if (!parseResult.success) {
        return res.status(400).json(parseResult.error.issues);
    }
    const params = parseResult.data;
    const deleted = item_service_1.ItemService.delete(params.id);
    if (deleted) {
        res.send("Item deleted successfully");
    }
    else {
        res.status(404).send("Item not found");
    }
});
exports.default = router;
