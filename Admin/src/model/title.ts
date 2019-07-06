export class Title {
    id: number;
    imageTitle: string;
    name: string;
    description: string;
    createdDatetime:string;
    updatedDatetime:string;
    size:string;
    constructor(imageTitle: string,
        name: string,
        description: string,
        createdDatetime:string,
        updatedDatetime:string,
        size:string) {
        this.imageTitle = imageTitle;
        this.name = name;
        this.description = description;
        this.createdDatetime=createdDatetime;
        this.updatedDatetime=updatedDatetime;
        this.size=size;
    }
}