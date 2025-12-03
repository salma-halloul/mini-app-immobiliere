export class Item {
    id: string;
    title: string;
    city: string;
    price: number;
    surface: number;
    image: string;

    constructor(id: string, title: string, city: string, price: number, surface: number, image: string) {
        this.id = id;
        this.title = title;
        this.city = city;
        this.price = price;
        this.surface = surface;
        this.image = image;
    }
}
