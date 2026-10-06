export type ICart = {
    id: string | number;
    name:string;
    price:number;
    image:string;
    quantity:number;
    totalPrice:number;
}
export type ICartStore = {
    data:ICart[];
    totalPrice:number;
}