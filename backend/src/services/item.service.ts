import { Item } from "../models/item.entity";

export class ItemService {
    private static data: Item[] = [];
    private static nextId: number = 1;

    static create(title: string, city: string, price: number, surface: number, image: string): Item {
        const newItem = new Item(this.nextId.toString(), title, city, price, surface, image);
        this.nextId++;
        this.data.push(newItem);
        return newItem;
    }

    static findAll(): Item[] {
        return this.data;
    }

    static findById(id: string): Item | undefined {
        return this.data.find(item => item.id === id);
    }

    static update(id: string, updatedItem: Partial<Item>): boolean {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data[index] = { ...this.data[index], ...updatedItem };
            return true;
        }
        return false;
    }

    static delete(id: string): boolean {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
            return true;
        }
        return false;
    }
}