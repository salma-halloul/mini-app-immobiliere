"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const item_entity_1 = require("../models/item.entity");
class ItemService {
    static create(title, city, price, surface, image) {
        const newItem = new item_entity_1.Item(this.nextId.toString(), title, city, price, surface, image);
        this.nextId++;
        this.data.push(newItem);
        return newItem;
    }
    static findAll() {
        return this.data;
    }
    static findById(id) {
        return this.data.find(item => item.id === id);
    }
    static update(id, updatedItem) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data[index] = Object.assign(Object.assign({}, this.data[index]), updatedItem);
            return true;
        }
        return false;
    }
    static delete(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.ItemService = ItemService;
ItemService.data = [];
ItemService.nextId = 1;
