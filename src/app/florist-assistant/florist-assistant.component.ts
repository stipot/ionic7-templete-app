import { Component, OnInit } from '@angular/core';

export interface Plant {
  id: string;
  name: string;
  species: string;
  waterFrequencyDays: number;
  lastWatered: Date;
  imageUrl?: string;
}

@Component({
  selector: 'app-florist-assistant',
  templateUrl: './florist-assistant.component.html',
  styleUrls: ['./florist-assistant.component.scss']
})
export class FloristAssistantComponent implements OnInit {
  plants: Plant[] = [];
  isModalOpen = false;
  
  newPlant: Partial<Plant> = {
    name: '',
    species: '',
    waterFrequencyDays: 3,
    imageUrl: ''
  };

  constructor() {}

  ngOnInit() {
    this.loadPlants();
  }

  loadPlants() {
    const data = localStorage.getItem('florist_plants');
    if (data) {
      this.plants = JSON.parse(data);
      this.plants.forEach(p => p.lastWatered = new Date(p.lastWatered));
    } else {
      // Default demo data
      this.plants = [
        {
          id: '1',
          name: 'Фикус Бенджамина',
          species: 'Ficus benjamina',
          waterFrequencyDays: 7,
          lastWatered: new Date(new Date().getTime() - 8 * 24 * 60 * 60 * 1000),
          imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: '2',
          name: 'Алоэ Вера',
          species: 'Aloe barbadensis',
          waterFrequencyDays: 14,
          lastWatered: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
          imageUrl: 'https://images.unsplash.com/photo-1596547609652-9cb5d8d73bba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
        }
      ];
      this.savePlants();
    }
  }

  savePlants() {
    localStorage.setItem('florist_plants', JSON.stringify(this.plants));
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  addPlant() {
    if (!this.newPlant.name) return;
    
    this.plants.push({
      id: Math.random().toString(36).substring(2, 9),
      name: this.newPlant.name,
      species: this.newPlant.species || 'Неизвестно',
      waterFrequencyDays: this.newPlant.waterFrequencyDays || 7,
      lastWatered: new Date(),
      imageUrl: this.newPlant.imageUrl || 'https://images.unsplash.com/photo-1402246399064-fbb3fb5038c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    });
    
    this.savePlants();
    this.setOpen(false);
    this.newPlant = { name: '', species: '', waterFrequencyDays: 3, imageUrl: '' };
  }

  waterPlant(plant: Plant) {
    plant.lastWatered = new Date();
    this.savePlants();
  }

  deletePlant(id: string) {
    this.plants = this.plants.filter(p => p.id !== id);
    this.savePlants();
  }

  getDaysUntilWater(plant: Plant): number {
    const nextWaterDate = new Date(plant.lastWatered.getTime() + plant.waterFrequencyDays * 24 * 60 * 60 * 1000);
    const today = new Date();
    const diffTime = nextWaterDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
