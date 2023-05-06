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
    public Permission:string="",
    public Is_Active:string="",
    public Created_Date:string="",
    public Modified_Date:string="",
    public Image:string[]=[],
    public cDate: Date = new Date()
    ){}
}
