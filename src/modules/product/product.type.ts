export type IProduct = {
    id?:string;
    name:string;
    price:number;
    ratting:number | string;
    image:string;
    catagory:string;
}
export type ICart = {
    product:{
    id?:string;
    name:string;
    price:number;
    ratting:number | string;
    image:string;
    catagory:string;
    }
    quantity:number;
}