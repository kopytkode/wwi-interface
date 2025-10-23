export interface OrderLine {
  orderLineId: number;
  orderId: number;
  description: string;
  quantity: number;
  unitPrice?: number;
}