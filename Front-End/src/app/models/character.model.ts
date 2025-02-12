export class Character {
    id!:number;
    name:string = "";
    image:string = "";
    realms?: { name: string };
    power!:number;
    elements?: { name: string };
    description:string = "";
    //EXTRA
    realmId?:number;
    realm?: string;
    elementId?: number;
    element?: string;
}