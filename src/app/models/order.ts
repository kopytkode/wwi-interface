import { OrderLine } from "./order-line";
export interface Order {
 orderId: number;
  customerId: number;
  salespersonPersonId: number;
  orderDate: string;                // DateOnly → string (ISO date format)
  expectedDeliveryDate: string;     // DateOnly → string
  customerPurchaseOrderNumber?: string; // nullable → optional
  orderLines: OrderLine[];       // collection of DTOs
}