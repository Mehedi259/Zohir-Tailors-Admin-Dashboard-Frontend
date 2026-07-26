import { create } from "zustand";
import { persist } from "zustand/middleware";
import { customersData, ordersData, measurementsData } from "@/lib/mock-data";

export type Customer = typeof customersData[0];
export type Order = typeof ordersData[0];
export interface Measurement {
  id: string;
  customer: string;
  customerId: string;
  type: string;
  measurements: Record<string, string>;
  date: string;
  notes?: string;
  photoUrl?: string;
}

export interface OrderTrackingEvent {
  status: string;
  timestamp: string;
  description: string;
}

export interface EnhancedOrder extends Order {
  trackingEvents: OrderTrackingEvent[];
}

const mapOrdersWithEvents = (orders: Order[]): EnhancedOrder[] => {
  return orders.map(order => ({
    ...order,
    trackingEvents: [
      {
        status: "Accepted",
        timestamp: order.orderDate,
        description: "আপনার অর্ডার গ্রহণ সম্পন্ন হয়েছে",
      }
    ]
  }));
};

interface AppState {
  customers: Customer[];
  orders: EnhancedOrder[];
  measurements: Measurement[];
  
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, data: Partial<Customer>) => void;
  
  addOrder: (order: EnhancedOrder) => void;
  updateOrderStatus: (id: string, newStatus: string, eventDesc: string) => void;
  addOrderPayment: (id: string, amount: number) => void;
  
  addMeasurement: (measurement: Measurement) => void;
  updateMeasurement: (id: string, data: Partial<Measurement>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      customers: customersData,
      orders: mapOrdersWithEvents(ordersData),
      measurements: measurementsData as unknown as Measurement[],

      addCustomer: (customer) => 
        set((state) => ({ customers: [...state.customers, customer] })),
      
      updateCustomer: (id, data) =>
        set((state) => ({
          customers: state.customers.map(c => c.id === id ? { ...c, ...data } : c)
        })),

      addOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),
      
      updateOrderStatus: (id, newStatus, eventDesc) =>
        set((state) => ({
          orders: state.orders.map(o => {
            if (o.id === id) {
              const now = new Date();
              const dateString = now.toLocaleDateString("en-US", { day: '2-digit', month: 'short', year: 'numeric' });
              const timeString = now.toLocaleTimeString("en-US", { hour: '2-digit', minute:'2-digit', hour12: true });
              const timestamp = `${dateString} ${timeString}`;
              
              return {
                ...o,
                status: newStatus,
                trackingEvents: [
                  ...o.trackingEvents,
                  { status: newStatus, timestamp, description: eventDesc }
                ]
              };
            }
            return o;
          })
        })),

      addOrderPayment: (id, amount) =>
        set((state) => ({
          orders: state.orders.map(o => {
            if (o.id === id) {
              return {
                ...o,
                advancePayment: o.advancePayment + amount,
                dueAmount: Math.max(0, o.dueAmount - amount)
              };
            }
            return o;
          })
        })),

      addMeasurement: (measurement) =>
        set((state) => ({ measurements: [...state.measurements, measurement] })),
        
      updateMeasurement: (id, data) =>
        set((state) => ({
          measurements: state.measurements.map(m => m.id === id ? { ...m, ...data } : m)
        })),
    }),
    {
      name: "zohir-tailors-storage",
    }
  )
);
