// customers.ts
import { Component, signal } from '@angular/core';
import { CustomerService } from '../services/customer-service';
import { CustomerOrders } from '../customer-orders/customer-orders';

// Customer interface, representing the structure of a customer object
export interface Customer {
  customerId: number;
  customerName: string;
  phoneNumber: string;
  websiteUrl: string;
  deliveryAddressLine1: string;
  deliveryAddressLine2: string;
  primaryContact: string;
  alternateContact: string;
  deliveryCity: string;
  deliveryMethod: string;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CustomerOrders],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers {
  // reactive customer list (initially empty)
  customers = signal<Customer[]>([]); 

  // Signals for search term, loading state, and expanded customer ID
  searchTerm = signal(''); 
  loading = signal(false);
  expandedCustomerId = signal<number | null>(null);

  constructor(private customerService: CustomerService) {}

  // On component initialization, fetch all customers
  ngOnInit() {
    // Set loading state to true while fetching data
    this.loading.set(true);
    this.customerService.getAll().subscribe({
      next: (data) => { 
        this.customers.set(data);
        this.loading.set(false); // Set loading state to false after data is fetched
      },
      error: (err) => {
        this.loading.set(false); // Set loading state to false in case of error
        console.error('Error fetching customers', err)
      }
    });
  }

  // Toggle the expanded state of customer orders
   toggleOrders(customerId: number) {
    this.expandedCustomerId.set(
      this.expandedCustomerId() === customerId ? null : customerId
    );
  }
//  Get filtered customers based on the search term
 filteredCustomers() {
  const filter = this.searchTerm().trim().toLowerCase();
  const filteredCustomers = this.customers().filter(c => c.customerName?.toLowerCase().includes(filter) || c.customerId.toString().includes(filter));
  return filteredCustomers;
 }
}
