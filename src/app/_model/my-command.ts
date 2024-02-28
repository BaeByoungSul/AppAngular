import { MyPara } from "./my-para";

export interface MyCommand {
    commandName: string;
    connectionName: string;
    commandType: number;
    commandText: string;
    parameters: MyPara[] | null;
    paraValues: { [key: string]: string; }[] | null;
  }
  