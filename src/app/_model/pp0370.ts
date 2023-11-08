export class PP0370_REQ {
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


// export class PP0370_REQ_HEADER{
//     zInterfaceId: string;
//     zConSysId: string;
//     zProSysId: string  ;
//     zUserId: string ;
//     zPiUser: string ;
//     zTimeId: string ;
//     zLang: string ;
//     public constructor(
//         zInterfaceId: string,
//         zConSysId: string,
//         zProSysId: string,  
//         zUserId: string, 
//         zPiUser: string, 
//         zTimeId: string, 
//         zLang: string, 
//     ) {
//        this.zInterfaceId = zInterfaceId;
//        this.zConSysId = zConSysId;
//        this.zProSysId = zProSysId;
//        this.zUserId = zUserId;
//        this.zPiUser = zPiUser;
//        this.zTimeId = zTimeId;
//        this.zLang = zLang;
//     }
// }
// export class TWERKS {
//     werks : string
//     constructor(werks: string){
//         this.werks=werks;
//     }
// }
// export class PP0370_REQ_BODY{
//     twerks:{werks? : string}[];
//     tmatnr?:{matnr? : string}[];
//     tdispo?:{dispo? : string}[];
//     tcharg?:{charg? : string}[];
//     tlgort?:{lgort? : string}[];

//     constructor (twerks : {werks? : string}[]){
//         this.twerks = twerks
//     }
//     // pushwerk(werk: string) {
//     //     this.twerks?.push({werks:werk});
//     // }

//     // pushlgort(lgort: string) {
//     //     this.tlgort?.push({lgort:lgort});
//     // }      
//     // pushmatnr(matnr: string) {
//     //     this.tmatnr?.push({matnr:matnr});
//     // }      
     
// }

// export class PP0370_REQ {
//     header?:PP0370_REQ_HEADER;
//     body?: PP0370_REQ_BODY;
//     constructor(
//         reqHeader:PP0370_REQ_HEADER,
//         reqBody: PP0370_REQ_BODY
//     ){
//         this.header = reqHeader;
//         this.body = reqBody
//     }
// }  



// var req = {
//     "header": {
//       "zInterfaceId": "GRP_PP0370",
//       "zConSysId": "KII_CHA",
//       "zProSysId": "GRP_ECC_PP",
//       "zUserId": "bbs",
//       "zPiUser": "IF_KIICHA",
//       "zTimeId": "20230126103011",
//       "zLang": ""
//     },
//     "body": {
//       "twerks": [
//         {
//           "werks": "5131"
//         }
//       ],
//       "tmatnr": [
//         {
//           "matnr": ""
//         }
//       ],
//       "tdispo": [
//         {
//           "dispo": ""
//         }
//       ],
//       "tcharg": [
//         {
//           "charg": ""
//         }
//       ],
//       "tlgort": [
//         {
//           "lgort": "5701"
//         }
//       ]
//     }
//   }