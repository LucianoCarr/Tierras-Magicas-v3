export class Realm {
    id!:number; //|null = null;
    name:string = "";
    image:string = "";
    characters?: Character[]
}

export class Character {
    id!:number;
    name:string = "";
    image:string = "";
    realmId?:number;
    elementId?: number;
    power!:number;
    description:string = "";
    //EXTRA: NOMBRES DE ID
    realmName?: string;  // Esta de mas porque se entiende a que reino pertenece
    elementName?: string;  // Agregar el nombre del elemento
    elements?: { name: string }; // Define la relación con el elemento como un objeto opcional
}

export class CharacterPerRealm {
    id!: number;
    name:string = "";
    image:string = "";
    characters: Character[] | null = null;  
  }


//Interface, cómo si fuese una clase simplificada. 
// Indica las propiedades que tiene un objeto de tipo "Realm_interface" y sus tipos.

export interface Realm_interface {
    id?:number, // ? significa que puede estar o no. 
    name:string,
    image:string
}