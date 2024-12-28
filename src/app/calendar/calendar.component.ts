import { Component, OnInit } from '@angular/core';
import { BusinessCalendarService } from './calendar.service';
import { WorkOrder } from './calendar.interface';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-business-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  // Основные переменные календаря
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  calendarDays: any[][] = [];
  weekDays: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  
  // Переменные для работы с заказами
  orders: WorkOrder[] = [];
  selectedDateOrders: WorkOrder[] = [];
  
  // Финансовая статистика
  totalMonthEarnings: number = 0;
  totalYearEarnings: number = 0;

  constructor(
    private calendarService: BusinessCalendarService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.initializeCalendar();
    this.subscribeToOrders();
    this.calculateEarnings();
  }

  // Инициализация календаря
  private initializeCalendar() {
    this.generateCalendar();
    this.selectedDate = new Date();
    this.updateSelectedDateOrders();
  }

  // Подписка на обновления заказов
  private subscribeToOrders() {
    this.calendarService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.updateSelectedDateOrders();
      this.generateCalendar();
      this.calculateEarnings();
    });
  }

  // Генерация календарной сетки
  private generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    let currentWeek: any[] = [];
    this.calendarDays = [];

    // Получаем день недели первого дня месяца (0 = воскресенье)
    let dayOfWeek = firstDay.getDay();
    dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Корректируем для недели с понедельника
    
    // Добавляем дни предыдущего месяца
    for (let i = dayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      currentWeek.push(this.createDayObject(date, false));
    }

    // Добавляем дни текущего месяца
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      currentWeek.push(this.createDayObject(date, true));

      if (currentWeek.length === 7) {
        this.calendarDays.push(currentWeek);
        currentWeek = [];
      }
    }

    // Добавляем дни следующего месяца
    if (currentWeek.length > 0) {
      const remainingDays = 7 - currentWeek.length;
      for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(year, month + 1, i);
        currentWeek.push(this.createDayObject(date, false));
      }
      this.calendarDays.push(currentWeek);
    }
  }

  // Создание объекта дня
  private createDayObject(date: Date, isCurrentMonth: boolean) {
    return {
      date: date,
      isCurrentMonth: isCurrentMonth,
      orders: this.getOrdersByDate(date),
      isToday: this.isToday(date),
      isSelected: this.isSelected(date)
    };
  }

  // Получение заказов для конкретной даты
  private getOrdersByDate(date: Date): WorkOrder[] {
    return this.orders.filter(order => 
      order.dateTime.getDate() === date.getDate() &&
      order.dateTime.getMonth() === date.getMonth() &&
      order.dateTime.getFullYear() === date.getFullYear()
    );
  }

  // Обновление списка заказов для выбранной даты
  private updateSelectedDateOrders() {
    if (this.selectedDate) {
      this.selectedDateOrders = this.getOrdersByDate(this.selectedDate);
    }
  }

  // Расчет заработка
  private calculateEarnings() {
    const startOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const endOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    this.totalMonthEarnings = this.calendarService.getTotalEarnings(startOfMonth, endOfMonth);

    const startOfYear = new Date(this.currentDate.getFullYear(), 0, 1);
    const endOfYear = new Date(this.currentDate.getFullYear(), 11, 31);
    this.totalYearEarnings = this.calendarService.getTotalEarnings(startOfYear, endOfYear);
  }

  // Проверка, является ли дата сегодняшней
  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  // Проверка, является ли дата выбранной
  isSelected(date: Date): boolean {
    if (!this.selectedDate) return false;
    return date.getDate() === this.selectedDate.getDate() &&
           date.getMonth() === this.selectedDate.getMonth() &&
           date.getFullYear() === this.selectedDate.getFullYear();
  }

  // Обработчики навигации по календарю
  previousMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.generateCalendar();
    this.calculateEarnings();
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.generateCalendar();
    this.calculateEarnings();
  }

  // Выбор даты
  selectDate(date: Date) {
    this.selectedDate = date;
    this.updateSelectedDateOrders();
  }

  async addOrder() {
    const alert = await this.alertController.create({
      header: 'Новый заказ',
      inputs: [
        {
          name: 'workType',
          type: 'text',
          placeholder: 'Вид работы'
        },
        {
          name: 'clientName',
          type: 'text',
          placeholder: 'ФИО заказчика'
        },
        {
          name: 'address',
          type: 'text',
          placeholder: 'Адрес'
        },
        {
          name: 'cost',
          type: 'number',
          placeholder: 'Стоимость'
        },
        {
          name: 'time',
          type: 'time',
          placeholder: 'Время'
        }
      ],
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel'
        },
        {
          text: 'Добавить',
          handler: (data) => {
            const [hours, minutes] = data.time.split(':');
            const dateTime = new Date(this.selectedDate!);
            dateTime.setHours(parseInt(hours), parseInt(minutes));

            const newOrder: WorkOrder = {
              id: Date.now().toString(),
              workType: data.workType,
              dateTime: dateTime,
              clientName: data.clientName,
              address: data.address,
              cost: parseFloat(data.cost),
              status: 'pending'
            };
            
            this.calendarService.addOrder(newOrder);
          }
        }
      ]
    });

    await alert.present();
  }

  // Валидация данных заказа
  private validateOrderData(data: any): boolean {
    return data.workType && 
           data.clientName && 
           data.address && 
           data.cost > 0 && 
           data.time;
  }

  // Создание нового заказа
  private createNewOrder(data: any) {
    const [hours, minutes] = data.time.split(':');
    const dateTime = new Date(this.selectedDate!);
    dateTime.setHours(parseInt(hours), parseInt(minutes));

    const newOrder: WorkOrder = {
      id: Date.now().toString(),
      workType: data.workType,
      dateTime: dateTime,
      clientName: data.clientName,
      address: data.address,
      cost: parseFloat(data.cost),
      status: 'pending'
    };
    
    this.calendarService.addOrder(newOrder);
  }

  // Обновление статуса заказа
  async updateOrderStatus(order: WorkOrder, status: 'completed' | 'cancelled') {
    const updatedOrder = { ...order, status };
    this.calendarService.updateOrder(updatedOrder);
  }

  // Получение цвета статуса
  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return 'success';
      case 'cancelled': return 'danger';
      default: return 'warning';
    }
  }

  // Получение текста статуса
  getStatusText(status: string): string {
    switch (status) {
      case 'completed': return 'Выполнен';
      case 'cancelled': return 'Отменен';
      default: return 'В ожидании';
    }
  }
}