import express from "express";
import { ItemService } from "../services/item.service";
import { ItemBodySchema, ItemBodyDTO, ItemParamsSchema, ItemParamsDTO } from "../schemas/item.schema";

const router = express.Router();

router.get("/items", (req, res) => {
    const items = ItemService.findAll();
    res.json(items);
});

router.get("/items/:id", (req, res) => {
    const parseResult = ItemParamsSchema.safeParse(req.params);

    if (!parseResult.success) {
        return res.status(400).json(parseResult.error.issues);
    }

    const params: ItemParamsDTO = parseResult.data;
    const item = ItemService.findById(params.id);

    if (item) {
        res.json(item);
    } else {
        res.status(404).send("Item not found");
    }
});

router.post("/items", (req, res) => {
    const parseResult = ItemBodySchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json(parseResult.error.issues);
    }

    const dto: ItemBodyDTO = parseResult.data;
    const newItem = ItemService.create(dto.title, dto.city, dto.price, dto.surface, dto.image);
    res.status(201).json(newItem);
});

router.put("/items/:id", (req, res) => {
    const paramsResult = ItemParamsSchema.safeParse(req.params);
    const bodyResult = ItemBodySchema.partial().safeParse(req.body);

    if (!paramsResult.success) {
        return res.status(400).json(paramsResult.error.issues);
    }

    if (!bodyResult.success) {
        return res.status(400).json(bodyResult.error.issues);
    }

    const params: ItemParamsDTO = paramsResult.data;
    const updated = ItemService.update(params.id, bodyResult.data);

    if (updated) {
        res.json(updated);
    } else {
        res.status(404).send("Item not found");
    }
});

router.delete("/items/:id", (req, res) => {
    const parseResult = ItemParamsSchema.safeParse(req.params);

    if (!parseResult.success) {
        return res.status(400).json(parseResult.error.issues);
    }

    const params: ItemParamsDTO = parseResult.data;
    const deleted = ItemService.delete(params.id);

    if (deleted) {
        res.send("Item deleted successfully");
    } else {
        res.status(404).send("Item not found");
    }
});

export default router;