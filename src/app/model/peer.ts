/**
 * Created by KeLe on 28/04/2017.
 */
export class Peer{
  ID:Object;
  address:string;
  pkiID:string;
  type:number;
  constructor(adress:string,pkiID:string,type:number){this.address = adress;this.pkiID = pkiID;this.type=type;}
}
