export class Order {
  constructor(
    public _id: any = null,
    public SalesOrder:string="",
    public userId:string="",
    public orderItems: OrderItem[] = [],
    public discountID: string ="",
    public total: number = 0,
    public addressID:number =0,
    public previousStatus:number=0,
    public status:number=0,
    public cDate: Date = new Date(),
    public ShipByDate:Date=new Date(),
    public DueDate:Date=new Date()
  ) {}
}
export class OrderItem {
  constructor(
    public productID: string='',
    public qty: number=0,
    public discount:number=0,
  ) {}
}
