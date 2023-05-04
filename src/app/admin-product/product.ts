
export class Product {
  constructor(
  public _id:any=null,
  public MaSP: number=0,
  public TenSP: string="",
  public LoaiSP: string="",
  public Hang: string="",
  public Discount: number=0,
  public Price: number=0,
  public Hinhanh: string[] =[],
  public Mota: string[]=[],
  public Soluong: number=0,
  public Size: string="",
  public cDate:Date=new Date()){}
}

