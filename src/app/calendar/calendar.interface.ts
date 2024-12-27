export interface WorkOrder {
    id: string;
    workType: string;
    dateTime: Date;
    clientName: string;
    address: string;
    cost: number;
    status: 'pending' | 'completed' | 'cancelled';
    notes?: string;
  }
  