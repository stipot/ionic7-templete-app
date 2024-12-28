import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkOrder } from './calendar.interface';

@Injectable({
  providedIn: 'root'
})
export class BusinessCalendarService {
  private orders = new BehaviorSubject<WorkOrder[]>([]);

  constructor() {
    // Загрузка тестовых данных
    const sampleOrders: WorkOrder[] = [
      {
        id: '1',
        workType: 'Ремонт сантехники',
        dateTime: new Date(2024, 12, 15, 10, 0),
        clientName: 'Иванов Иван Иванович',
        address: 'ул. Ленина, 1, кв. 15',
        cost: 2500,
        status: 'completed'
      },
      {
        id: '2',
        workType: 'Электромонтаж',
        dateTime: new Date(2024, 0, 16, 14, 30),
        clientName: 'Петров Петр Петрович',
        address: 'ул. Пушкина, 10, кв. 78',
        cost: 3500,
        status: 'pending'
      }
    ];
    this.orders.next(sampleOrders);
  }

  public getOrders(): Observable<WorkOrder[]> {
    return this.orders.asObservable();
  }

  public addOrder(order: WorkOrder): void {
    const currentOrders = this.orders.getValue();
    this.orders.next([...currentOrders, order]);
  }

  public updateOrder(updatedOrder: WorkOrder): void {
    const currentOrders = this.orders.getValue();
    const index = currentOrders.findIndex(order => order.id === updatedOrder.id);
    if (index !== -1) {
      currentOrders[index] = updatedOrder;
      this.orders.next([...currentOrders]);
    }
  }

  public getOrdersByDate(date: Date): WorkOrder[] {
    return this.orders.getValue().filter(order => 
      order.dateTime.getDate() === date.getDate() &&
      order.dateTime.getMonth() === date.getMonth() &&
      order.dateTime.getFullYear() === date.getFullYear()
    );
  }

  public getTotalEarnings(startDate?: Date, endDate?: Date): number {
    const orders = this.orders.getValue();
    return orders
      .filter(order => order.status === 'completed')
      .filter(order => {
        if (!startDate || !endDate) return true;
        return order.dateTime >= startDate && order.dateTime <= endDate;
      })
      .reduce((sum, order) => sum + order.cost, 0);
  }
}
