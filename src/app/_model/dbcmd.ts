export interface MyCommand {
    commandName: string;
    connectionName: string;
    commandType: number;
    commandText: string;
    parameters: MyPara[] | null;
    paraValues: { [key: string]: string; }[] | null;
  }
  
  export interface MyPara {
    parameterName: string;
    dbDataType: number;
    direction: number;
    headerCommandName?: string;
    headerParameter?: string;
  }
  
// var cmd = {
//     "commandName": "MST",
//     "connectionName": "HUIZHOU",
//     "commandType": 1,
//     "commandText": "EXECUTE ZBBS2..[USP_BCOST_0010_T2_SEL] '202212','', '' ",
//     "parameters": [
//       {
//         "parameterName": "",
//         "dbDataType": 0,
//         "direction": 0,
//         "headerCommandName": "string",
//         "headerParameter": "string"
//       }
//     ]