export class Character {
    id!:number;
    name:string = "";
    image:string = "";
    realmId?:number;
    realms?: { name: string };
    power!:number;
    elementId?: number;
    elements?: { name: string };
    description:string = "";
    //EXTRA
    realm?: string;
    element?: string;
}