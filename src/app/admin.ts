export class Admin {
  constructor(
    public _id:any=null,
    public adminname:string="",
    public password:string="",
    public Phone_Number:string="",
    public Email:string="",
    public Gender:string="",
    public Date_of_Birth:string="",
    public Account_Name:string="",
    public Permission:number=4,
    public Created_Date:string="",
    public Modified_Date:string="",
    public Image:string[]=[],
    public cDate: Date = new Date(),
    public AdminStatus:boolean=true,

    ){}
}
export class AdminFix {
  constructor(
    public _id: any = null,
    public adminname: string = "",
    public password: string = "",
    public Phone: string = "",
    public Email: string = "",
    public Gender: string = "",
    public DOB: string = "",
    public AccountName: string = "",
    public Permission: string = "",
    public IsActive: string = "",
    public CreatedDate: string = "",
    public ModifiedDate: string = "",
    public Image: string[] = [],
    public AdminStatus: boolean = true,

  ) { }
}

export interface IAdmin {
  _id: any,
  adminname: string,
  password: string,
  Phone: string,
  Email: string,
  Gender: string,
  DOB: string,
  AccountName: string,
  Permission: string,
  IsActive: string,
  CreatedDate: string,
  ModifiedDate: string,
  Image: any,
  AdminStatus: any,

}

