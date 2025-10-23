import { Component, Input, signal, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { OrderService } from '../services/order-service';
import { Order } from '../models/order';

//DataPipe and CurrencyPipe are imported to format dates and currency values in the template
@Component({
  selector: 'app-customer-orders',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './customer-orders.html',
  styleUrl: './customer-orders.css',
})

// CustomerOrders component to display a list of orders for a specific customer
export class CustomerOrders implements OnInit {
  // Input property to receive the customer ID 
  @Input() customerId!: number;

  // Signals to manage orders and loading state
  orders = signal<Order[]>([]);
  loading = signal(false);
  // Set to track expanded orders
  expandedOrders = new Set<number>();

  constructor(private ordersService: OrderService) {}

  // OnInit lifecycle hook to fetch orders when component initializes
  ngOnInit() {
    if (this.customerId) {
      this.fetchOrders();
    }
  }

  // Method to fetch orders for the given customer ID
  fetchOrders() {
    // Set loading state to true
    this.loading.set(true);
    // Call the order service to get orders by customer ID
    this.ordersService.getByCustomer(this.customerId).subscribe({
      next: (data) => {
        this.orders.set(data.slice(0, 5)); // Limit to first 5 orders
        this.loading.set(false); // Set loading state to false
      },
      error: () => this.loading.set(false) // Handle error by setting loading to false
    });
  }

  // Method to calculate the total amount of an order based on the order line data
  calculateOrderTotal(order: Order): number {
    // Sum up the total from order lines
    return order.orderLines?.reduce(
      (sum, l) => sum + (l.unitPrice ?? 0) * l.quantity,
      0
    ) ?? 0; // Default to 0 if orderLines is undefined
  }

  // Method to toggle the expanded state of an order
  toggleExpand(order: Order) {
    // Check if the order is already expanded
    if (this.expandedOrders.has(order.orderId)) {
      // If yes, remove it from the expanded set
      this.expandedOrders.delete(order.orderId);
    } else {
      // If not, add it to the expanded set
      this.expandedOrders.add(order.orderId);
    }
  }
}