  export class User {
    constructor(
      public _id:any=null,
      public username:string="",
      public password:string="",
      public name: string="",
      public email:string="",
      public dob:Date=new Date(),
      public phoneNumber: number=0,
      public gender:string="",
      public Img:string="",
      public cDate:Date=new Date(),
      public order:string[] =[],
      public discount:string[] =[],
      public Address:string []=[]
    ){}
  }
