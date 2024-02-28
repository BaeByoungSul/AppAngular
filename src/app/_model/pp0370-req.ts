export class Pp0370Req {
    header?: {
        zInterfaceId: string;
        zConSysId: string ;
        zProSysId: string ;
        zUserId: string ;
        zPiUser: string ;
        zTimeId: string ;
        zLang: string ;
    } 
    body?: {
        twerks?:{werks? : string}[];
        tmatnr?:{matnr? : string}[];
        tdispo?:{dispo? : string}[];
        tcharg?:{charg? : string}[];
        tlgort?:{lgort? : string}[];
    } 
    constructor(){}
}
