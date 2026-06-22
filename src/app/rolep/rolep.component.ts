import { Component } from '@angular/core';

interface Character {
  name: string;
  class: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  magic: number;
}

interface Enemy {
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
}

interface LogMessage {
  text: string;
  type: 'info' | 'damage' | 'victory' | 'defeat' | 'heal';
}

@Component({
  selector: 'app-rolep',
  templateUrl: './rolep.component.html',
  styleUrls: ['./rolep.component.scss'],
})
export class RolepPage {
  // Этапы игры
  gameStage: 'create' | 'room' | 'battle' = 'create';
  
  // Персонаж
  characterName: string = '';
  selectedClass: string = 'warrior';
  character: Character | null = null;
  
  // Враг
  currentEnemy: Enemy | null = null;
  
  // Бой
  actionsLeft: number = 3;
  isEnemyTurn: boolean = false;
  gameOver: boolean = false;
  winner: 'player' | 'enemy' | null = null;
  battleLogs: LogMessage[] = [];
  defenseBonus: number = 0;
  
  // Классы персонажей
  classes = [
    {
      id: 'warrior',
      name: 'Воин',
      icon: 'shield-outline',
      color: 'danger',
      description: 'Сильный в ближнем бою',
      stats: {
        hp: 130,
        attack: 32,
        defense: 15,
        magic: 5
      }
    },
    {
      id: 'rogue',
      name: 'Вор',
      icon: 'flash-outline',
      color: 'warning',
      description: 'Ловкий и быстрый',
      stats: {
        hp: 100,
        attack: 30,
        defense: 10,
        magic: 10
      }
    },
    {
      id: 'mage',
      name: 'Маг',
      icon: 'flash-outline',
      color: 'tertiary',
      description: 'Владеет магией',
      stats: {
        hp: 80,
        attack: 25,
        defense: 8,
        magic: 20
      }
    }
  ];
  
  // Комнаты
  rooms = [
    {
      id: 'cave',
      name: 'Тёмная пещера',
      description: 'Здесь живёт кровожадный гоблин',
      icon: 'bug-outline',
      color: 'danger',
      enemy: {
        name: 'Кровавый Гоблин',
        hp: 65,
        maxHp: 65,
        attack: 22,
        defense: 8
      }
    },
    {
      id: 'forest',
      name: 'Дремучий лес',
      description: 'Огромный волк рыщет в поисках добычи',
      icon: 'leaf-outline',
      color: 'success',
      enemy: {
        name: 'Лесной Великан',
        hp: 85,
        maxHp: 85,
        attack: 25,
        defense: 10
      }
    },
    {
      id: 'castle',
      name: 'Проклятый замок',
      description: 'Дух рыцаря охраняет эти стены',
      icon: 'business-outline',
      color: 'dark',
      enemy: {
        name: 'Призрачный Рыцарь',
        hp: 110,
        maxHp: 110,
        attack: 30,
        defense: 15
      }
    }
  ];

  constructor() {}

  // Выбор класса
  selectClass(classId: string) {
    this.selectedClass = classId;
  }

  // Создание персонажа
  createCharacter() {
    if (this.characterName && this.characterName.trim()) {
      const classStats = this.classes.find(c => c.id === this.selectedClass)!.stats;
      
      this.character = {
        name: this.characterName.trim(),
        class: this.selectedClass,
        hp: classStats.hp,
        maxHp: classStats.hp,
        attack: classStats.attack,
        defense: classStats.defense,
        magic: classStats.magic
      };
      
      const className = this.classes.find(c => c.id === this.selectedClass)!.name;
      this.addLog(`✨ Создан герой ${this.character.name} (${className})`, 'info');
      this.addLog(`📊 Характеристики: HP ${this.character.hp}, Атака ${this.character.attack}, Защита ${this.character.defense}`, 'info');
      
      this.gameStage = 'room';
    }
  }

  // Выбор комнаты
  selectRoom(room: any) {
    if (!room || !room.enemy) return;
    
    this.currentEnemy = {
      name: room.enemy.name,
      hp: room.enemy.hp,
      maxHp: room.enemy.maxHp,
      attack: room.enemy.attack,
      defense: room.enemy.defense
    };
    
    this.addLog(`🏰 Вы вошли в ${room.name}. Враг: ${this.currentEnemy.name}`, 'info');
    this.resetBattle();
    this.gameStage = 'battle';
  }

  // Атака
  attack() {
    if (this.gameOver || this.isEnemyTurn || this.actionsLeft === 0) return;
    if (!this.character || !this.currentEnemy) return;

    const damage = Math.max(5, this.character.attack - this.currentEnemy.defense);
    this.currentEnemy.hp = Math.max(0, this.currentEnemy.hp - damage);
    this.actionsLeft--;

    this.addLog(`⚔️ ${this.character.name} наносит ${damage} урона ${this.currentEnemy.name}!`, 'damage');

    if (this.currentEnemy.hp <= 0) {
      this.addLog(`🏆 Победа! ${this.currentEnemy.name} повержен!`, 'victory');
      this.gameOver = true;
      this.winner = 'player';
      return;
    }

    if (this.actionsLeft === 0) {
      this.enemyTurn();
    }
  }

  // Магическая атака
  magicAttack() {
    if (this.gameOver || this.isEnemyTurn || this.actionsLeft === 0) return;
    if (!this.character || !this.currentEnemy) return;
    
    if (this.character.class !== 'mage') {
      this.addLog(`❌ Только маги могут использовать магию!`, 'info');
      return;
    }

    const damage = Math.max(10, this.character.magic * 2 - this.currentEnemy.defense);
    this.currentEnemy.hp = Math.max(0, this.currentEnemy.hp - damage);
    this.actionsLeft--;

    this.addLog(`✨ ${this.character.name} использует магию и наносит ${damage} урона ${this.currentEnemy.name}!`, 'damage');

    if (this.currentEnemy.hp <= 0) {
      this.addLog(`🏆 Победа! ${this.currentEnemy.name} повержен!`, 'victory');
      this.gameOver = true;
      this.winner = 'player';
      return;
    }

    if (this.actionsLeft === 0) {
      this.enemyTurn();
    }
  }

  // Специальная атака (вор)
  specialAttack() {
    if (this.gameOver || this.isEnemyTurn || this.actionsLeft === 0) return;
    if (!this.character || !this.currentEnemy) return;
    
    if (this.character.class !== 'rogue') {
      this.addLog(`❌ Только воры могут использовать скрытую атаку!`, 'info');
      return;
    }

    const damage = Math.max(15, this.character.attack * 1.5 - this.currentEnemy.defense);
    this.currentEnemy.hp = Math.max(0, this.currentEnemy.hp - damage);
    this.actionsLeft--;

    this.addLog(`🗡️ ${this.character.name} использует скрытую атаку и наносит ${damage} урона ${this.currentEnemy.name}!`, 'damage');

    if (this.currentEnemy.hp <= 0) {
      this.addLog(`🏆 Победа! ${this.currentEnemy.name} повержен!`, 'victory');
      this.gameOver = true;
      this.winner = 'player';
      return;
    }

    if (this.actionsLeft === 0) {
      this.enemyTurn();
    }
  }

  // Ярость (воин)
  rageAttack() {
    if (this.gameOver || this.isEnemyTurn || this.actionsLeft === 0) return;
    if (!this.character || !this.currentEnemy) return;
    
    if (this.character.class !== 'warrior') {
      this.addLog(`❌ Только воины могут использовать ярость!`, 'info');
      return;
    }

    const damage = Math.max(20, this.character.attack * 1.8 - this.currentEnemy.defense);
    this.currentEnemy.hp = Math.max(0, this.currentEnemy.hp - damage);
    this.actionsLeft--;

    this.addLog(`😤 ${this.character.name} впадает в ярость и наносит ${damage} урона ${this.currentEnemy.name}!`, 'damage');

    if (this.currentEnemy.hp <= 0) {
      this.addLog(`🏆 Победа! ${this.currentEnemy.name} повержен!`, 'victory');
      this.gameOver = true;
      this.winner = 'player';
      return;
    }

    if (this.actionsLeft === 0) {
      this.enemyTurn();
    }
  }

  // Защита
  defend() {
    if (this.gameOver || this.isEnemyTurn || this.actionsLeft === 0) return;
    if (!this.character) return;

    this.defenseBonus = 15;
    this.actionsLeft--;
    this.addLog(`🛡️ ${this.character.name} защищается! Защита +${this.defenseBonus}`, 'heal');

    if (this.actionsLeft === 0) {
      this.enemyTurn();
    }
  }

  // Лечение
  heal() {
    if (this.gameOver || this.isEnemyTurn || this.actionsLeft === 0) return;
    if (!this.character) return;

    let healAmount = 0;
    switch (this.character.class) {
      case 'warrior':
        healAmount = 15;
        break;
      case 'rogue':
        healAmount = 20;
        break;
      case 'mage':
        healAmount = 25;
        break;
    }
    
    const oldHp = this.character.hp;
    this.character.hp = Math.min(this.character.maxHp, this.character.hp + healAmount);
    const actualHeal = this.character.hp - oldHp;
    
    this.actionsLeft--;
    this.addLog(`💚 ${this.character.name} восстанавливает ${actualHeal} HP!`, 'heal');

    if (this.actionsLeft === 0) {
      this.enemyTurn();
    }
  }

  // Ход врага
  async enemyTurn() {
    this.isEnemyTurn = true;
    this.addLog(`🔄 Ход ${this.currentEnemy?.name}...`, 'info');
    
    await this.delay(800);

    if (!this.character || !this.currentEnemy) {
      this.isEnemyTurn = false;
      return;
    }

    const totalDefense = this.character.defense + this.defenseBonus;
    const damage = Math.max(5, this.currentEnemy.attack - totalDefense);
    this.character.hp = Math.max(0, this.character.hp - damage);
    this.defenseBonus = 0;

    this.addLog(`👹 ${this.currentEnemy.name} наносит ${damage} урона!`, 'damage');

    if (this.character.hp <= 0) {
      this.addLog(`💀 ${this.character.name} пал в бою...`, 'defeat');
      this.gameOver = true;
      this.winner = 'enemy';
      this.isEnemyTurn = false;
      return;
    }

    this.actionsLeft = 3;
    this.isEnemyTurn = false;
    this.addLog(`🎯 Ваш ход! У вас 3 действия`, 'info');
  }

  // Сброс боя
  resetBattle() {
    this.actionsLeft = 3;
    this.isEnemyTurn = false;
    this.gameOver = false;
    this.winner = null;
    this.defenseBonus = 0;
    if (this.character) {
      this.character.hp = this.character.maxHp;
    }
  }

  // Полный сброс игры
  resetGame() {
    this.gameStage = 'create';
    this.character = null;
    this.currentEnemy = null;
    this.battleLogs = [];
    this.characterName = '';
    this.selectedClass = 'warrior';
    this.resetBattle();
  }

  // Добавление лога
  addLog(text: string, type: LogMessage['type']) {
    this.battleLogs.unshift({ text, type });
    if (this.battleLogs.length > 20) {
      this.battleLogs.pop();
    }
  }

  // Задержка
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Вспомогательные методы для UI
  getCharacterHpPercent(): number {
    if (!this.character) return 0;
    return (this.character.hp / this.character.maxHp) * 100;
  }

  getEnemyHpPercent(): number {
    if (!this.currentEnemy) return 0;
    return (this.currentEnemy.hp / this.currentEnemy.maxHp) * 100;
  }

  getHpColor(percent: number): string {
    if (percent < 30) return 'danger';
    if (percent < 60) return 'warning';
    return 'success';
  }
  
  getClassName(): string {
    const classObj = this.classes.find(c => c.id === this.selectedClass);
    return classObj ? classObj.name : 'Воин';
  }
}