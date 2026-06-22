import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Cell {
  x: number;
  y: number;
  hasShip: boolean;
  isHit: boolean;
  isMiss: boolean;
  isRevealed: boolean;
  isSuperPower?: boolean;
  superPowerType?: SuperPowerType;
}

type Board = Cell[][];

interface ShipConfig {
  size: number;
  count: number;
  placed: number;
}

export type SuperPowerType = 'explosion' | 'radar' | 'repair';

interface SuperPower {
  id: string;
  type: SuperPowerType;
  name: string;
  icon: string;
  color: string;
  description: string;
  available: boolean;
}

@Component({
  selector: 'app-morscoy-boi',
  templateUrl: './morscoy-boi.component.html',
  styleUrls: ['./morscoy-boi.component.scss'],
})
export class MorscoyBoiComponent implements OnInit {
  playerBoard: Board = [];
  computerBoard: Board = [];
  
  isPlayerTurn: boolean = true;
  gameOver: boolean = false;
  statusMessage: string = "Расставьте корабли на своём поле.";
  
  isPlacementMode: boolean = true;
  selectedShipSize: number | null = null;
  isHorizontal: boolean = true;
  shipsToPlace: ShipConfig[] = [];

  //  Суперспособности
  enableSuperPowers: boolean = false;
  playerSuperPowers: SuperPower[] = [];
  computerSuperPowers: SuperPower[] = [];
  playerMissCount: number = 0;
  computerMissCount: number = 0;
  playerLastPowerAtMisses: number = 0;
  computerLastPowerAtMisses: number = 0;
  selectedPowerForActivation: SuperPower | null = null;
  isPowerActivationMode: boolean = false;

  private readonly SUPER_POWERS_CONFIG: Omit<SuperPower, 'available' | 'id'>[] = [
    {
      type: 'explosion',
      name: 'Взрыв 3×3',
      icon: 'flash',
      color: 'danger',
      description: 'Наносит урон по области 3×3 клетки'
    },
    {
      type: 'radar',
      name: 'Радар 2×2',
      icon: 'eye',
      color: 'warning',
      description: 'Открывает 4 клетки противника'
    },
    {
      type: 'repair',
      name: 'Ремонт',
      icon: 'construct',
      color: 'success',
      description: 'Полностью чинит один ваш корабль'
    }
  ];

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.selectGameMode();
  }

  createEmptyBoard(): Board {
    return Array(10).fill(null).map((_, y) =>
      Array(10).fill(null).map((_, x) => ({
        x, y, hasShip: false, isHit: false, isMiss: false, isRevealed: false
      }))
    );
  }

  startNewGame(withSuperPowers: boolean = false) {
    this.playerBoard = this.createEmptyBoard();
    this.computerBoard = this.createEmptyBoard();
    this.isPlayerTurn = true;
    this.gameOver = false;
    this.statusMessage = "Расставьте корабли на своём поле.";
    
    this.shipsToPlace = [
      { size: 4, count: 1, placed: 0 },
      { size: 3, count: 2, placed: 0 },
      { size: 2, count: 3, placed: 0 },
      { size: 1, count: 4, placed: 0 }
    ];
    
    this.isPlacementMode = true;
    this.selectedShipSize = null;
    this.isHorizontal = true;

    this.enableSuperPowers = withSuperPowers;
    this.playerSuperPowers = [];
    this.computerSuperPowers = [];
    this.playerMissCount = 0;
    this.computerMissCount = 0;
    this.playerLastPowerAtMisses = 0;
    this.computerLastPowerAtMisses = 0;
    this.selectedPowerForActivation = null;
    this.isPowerActivationMode = false;
    
    this.placeShipsRandomly(this.computerBoard);
  }

  //  Выбор режима игры
  async selectGameMode() {
    const alert = await this.alertCtrl.create({
      header: 'Режим игры',
      message: 'Включить суперспособности?',
      buttons: [
        { text: 'Обычный', handler: () => this.startNewGame(false) },
        { text: ' С суперспособностями', handler: () => this.startNewGame(true) }
      ]
    });
    await alert.present();
  }

  //  Генерация случайной суперспособности
  getRandomSuperPower(): SuperPower {
    const config = this.SUPER_POWERS_CONFIG[Math.floor(Math.random() * this.SUPER_POWERS_CONFIG.length)];
    return {
      ...config,
      id: `${config.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      available: true
    };
  }

  //  Проверка и выдача суперспособности (каждые 10 промахов, без уведомлений)
  checkForSuperPower(isPlayer: boolean) {
    if (!this.enableSuperPowers) return;
    
    const missCount = isPlayer ? this.playerMissCount : this.computerMissCount;
    const lastAwarded = isPlayer ? this.playerLastPowerAtMisses : this.computerLastPowerAtMisses;
    
    if (missCount >= 10 && missCount % 10 === 0 && missCount > lastAwarded) {
      const newPower = this.getRandomSuperPower();
      if (isPlayer) {
        this.playerSuperPowers.push(newPower);
        this.playerLastPowerAtMisses = missCount;
        this.statusMessage = ` Способность получена: ${newPower.name}`;
      } else {
        this.computerSuperPowers.push(newPower);
        this.computerLastPowerAtMisses = missCount;
        // Бот получает способность молча
      }
    }
  }

  //  Активация суперспособности
  activateSuperPower(power: SuperPower, targetCell?: Cell) {
    if (!power.available || !this.isPlayerTurn || this.gameOver) return;

    if (!targetCell && power.type !== 'repair') {
      this.selectedPowerForActivation = power;
      this.isPowerActivationMode = true;
      this.statusMessage = `Выберите цель для: ${power.name}`;
      return;
    }

    switch (power.type) {
      case 'explosion':
        this.activateExplosion(targetCell!, this.computerBoard, true);
        break;
      case 'radar':
        this.activateRadar(targetCell!, this.computerBoard, true);
        break;
      case 'repair':
        this.activateRepair(true);
        break;
    }

    power.available = false;
    this.selectedPowerForActivation = null;
    this.isPowerActivationMode = false;
    
    if (power.type !== 'repair') {
      this.checkWin(this.computerBoard, 'player');
      if (!this.gameOver) {
        this.statusMessage = "Ход противника...";
        this.isPlayerTurn = false;
        setTimeout(() => this.computerTurn(), 1000);
      }
    }
  }

  //  Взрыв 3×3 — без алертов, только статус
  activateExplosion(centerCell: Cell, board: Board, isPlayer: boolean) {
    const { x, y } = centerCell;
    let hitCount = 0;
    let missCount = 0;

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
          const cell = board[ny][nx];
          if (!cell.isRevealed) {
            cell.isRevealed = true;
            if (cell.hasShip && !cell.isHit) {
              cell.isHit = true;
              hitCount++;
            } else if (!cell.hasShip) {
              cell.isMiss = true;
              missCount++;
            }
          }
        }
      }
    }
    
    if (isPlayer) {
      this.playerMissCount += missCount;
      this.checkForSuperPower(true);
      this.statusMessage = hitCount > 0 ? ` Взрыв! Поражено: ${hitCount}` : ' Взрыв! Все мимо.';
    } else {
      this.computerMissCount += missCount;
      this.checkForSuperPower(false);
      this.statusMessage = hitCount > 0 ? ` Бот применил Взрыв! Урон: ${hitCount}` : ' Бот применил Взрыв! Промазал.';
    }
  }

  //  Радар 2×2 — чистая разведка, без алертов
  activateRadar(startCell: Cell, board: Board, isPlayer: boolean) {
    let revealedCount = 0;
    let shipsFound = 0;
    
    for (let dy = 0; dy < 2; dy++) {
      for (let dx = 0; dx < 2; dx++) {
        const nx = startCell.x + dx;
        const ny = startCell.y + dy;
        if (nx < 10 && ny < 10) {
          const cell = board[ny][nx];
          if (!cell.isRevealed) {
            cell.isRevealed = true;
            if (cell.hasShip) {
              shipsFound++;
              cell.isSuperPower = true;
              cell.superPowerType = 'radar';
            }
            revealedCount++;
          }
        }
      }
    }
    
    if (isPlayer) {
      this.statusMessage = shipsFound > 0 ? ` Радар: найдено кораблей: ${shipsFound}` : ' Радар: пусто.';
    } else {
      this.statusMessage = ` Бот использовал Радар.`;
    }
  }

  //  Ремонт корабля — без алертов
  activateRepair(isPlayer: boolean) {
    const board = isPlayer ? this.playerBoard : this.computerBoard;
    const damagedShips: Cell[][] = [];
    const visited = new Set<string>();

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = board[y][x];
        if (cell.hasShip && cell.isHit && !visited.has(`${x}-${y}`)) {
          const ship: Cell[] = [];
          const queue = [{x, y}];
          const shipVisited = new Set<string>();
          
          while (queue.length > 0) {
            const curr = queue.shift()!;
            const key = `${curr.x}-${curr.y}`;
            if (shipVisited.has(key)) continue;
            shipVisited.add(key);
            visited.add(key);
            
            const c = board[curr.y][curr.x];
            if (c.hasShip) {
              ship.push(c);
              [[0,1], [0,-1], [1,0], [-1,0]].forEach(([dx, dy]) => {
                const nx = curr.x + dx;
                const ny = curr.y + dy;
                if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
                  const nKey = `${nx}-${ny}`;
                  if (!shipVisited.has(nKey)) {
                    queue.push({x: nx, y: ny});
                  }
                }
              });
            }
          }
          
          if (ship.some(c => c.isHit)) {
            damagedShips.push(ship);
          }
        }
      }
    }

    if (damagedShips.length > 0) {
      const shipToRepair = damagedShips[0];
      shipToRepair.forEach(cell => { 
        cell.isHit = false;
        cell.isRevealed = false;
        cell.isMiss = false;
        cell.isSuperPower = false;
        cell.superPowerType = undefined;
      });
      this.statusMessage = isPlayer ? '🔧 Корабль восстановлен и снова уязвим!' : '🤖 Бот восстановил свой корабль.';
    } else {
      this.statusMessage = isPlayer ? 'ℹ Все корабли целы.' : '🤖 Бот попытался починиться, но корабли целы.';
      const powers = isPlayer ? this.playerSuperPowers : this.computerSuperPowers;
      const power = powers.find(p => p.type === 'repair' && !p.available);
      if (power) power.available = true;
    }
  }

  //  Обработка клика
  handleCellClick(cell: Cell, boardType: 'player' | 'computer') {
    if (this.isPlacementMode) {
      if (boardType === 'player') this.handlePlayerCellClick(cell);
      return;
    }

    if (this.isPowerActivationMode && this.selectedPowerForActivation && boardType === 'computer') {
      this.activateSuperPower(this.selectedPowerForActivation, cell);
      return;
    }

    if (this.gameOver || !this.isPlayerTurn) return;
    
    if (boardType === 'computer') {
      if (cell.isRevealed && !cell.isSuperPower) return;
      
      if (cell.isRevealed && cell.isSuperPower === true && cell.superPowerType === 'radar') {
        cell.isSuperPower = false;
        cell.superPowerType = undefined;
      }

      cell.isRevealed = true;
      if (cell.hasShip) {
        cell.isHit = true;
        this.checkWin(this.computerBoard, 'player');
        if (!this.gameOver) {
          this.statusMessage = " Попадание! Стреляйте снова.";
        }
      } else {
        cell.isMiss = true;
        this.playerMissCount++;
        this.checkForSuperPower(true);
        this.statusMessage = " Промах. Ход противника...";
        this.isPlayerTurn = false;
        setTimeout(() => this.computerTurn(), 800);
      }
    }
  }

  //  Выбор корабля для размещения
  selectShip(size: number) {
    const ship = this.shipsToPlace.find(s => s.size === size);
    if (ship && ship.placed < ship.count) {
      this.selectedShipSize = this.selectedShipSize === size ? null : size;
    }
  }

  isShipAvailable(size: number): boolean {
    const ship = this.shipsToPlace.find(s => s.size === size);
    return ship ? ship.placed < ship.count : false;
  }

  getPlacedCount(size: number): number {
    const ship = this.shipsToPlace.find(s => s.size === size);
    return ship ? ship.placed : 0;
  }

  getTotalCount(size: number): number {
    const ship = this.shipsToPlace.find(s => s.size === size);
    return ship ? ship.count : 0;
  }

  toggleOrientation() {
    this.isHorizontal = !this.isHorizontal;
  }

  //  Проверка возможности размещения
  canPlaceShip(board: Board, x: number, y: number, size: number, horizontal: boolean): boolean {
    if (horizontal) {
      if (x + size > 10) return false;
    } else {
      if (y + size > 10) return false;
    }
    
    for (let i = 0; i < size; i++) {
      const cx = horizontal ? x + i : x;
      const cy = horizontal ? y : y + i;
      if (board[cy][cx].hasShip) return false;
    }
    
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        for (let i = 0; i < size; i++) {
          const cx = horizontal ? x + i : x;
          const cy = horizontal ? y : y + i;
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
            if (board[ny][nx].hasShip) return false;
          }
        }
      }
    }
    return true;
  }

  placeShip(board: Board, x: number, y: number, size: number, horizontal: boolean) {
    for (let i = 0; i < size; i++) {
      if (horizontal) {
        board[y][x + i].hasShip = true;
      } else {
        board[y + i][x].hasShip = true;
      }
    }
  }

  //  Размещение корабля игроком
  handlePlayerCellClick(cell: Cell) {
    if (!this.isPlacementMode || !this.selectedShipSize) return;
    
    if (this.canPlaceShip(this.playerBoard, cell.x, cell.y, this.selectedShipSize, this.isHorizontal)) {
      this.placeShip(this.playerBoard, cell.x, cell.y, this.selectedShipSize, this.isHorizontal);
      
      const ship = this.shipsToPlace.find(s => s.size === this.selectedShipSize);
      if (ship) {
        ship.placed++;
        if (ship.placed >= ship.count) {
          this.selectedShipSize = null;
        }
      }
      
      const allPlaced = this.shipsToPlace.every(s => s.placed >= s.count);
      if (allPlaced) {
        this.statusMessage = "Флот готов! Жми 'В бой!'.";
      }
    } else {
      this.statusMessage = " Сюда нельзя ставить (слишком близко к другому кораблю)";
    }
  }

  isPlacementComplete(): boolean {
    return this.shipsToPlace.every(s => s.placed >= s.count);
  }

  finishPlacement() {
    if (!this.isPlacementComplete()) {
      const total = this.shipsToPlace.reduce((sum, s) => sum + s.count, 0);
      const placed = this.shipsToPlace.reduce((sum, s) => sum + s.placed, 0);
      this.statusMessage = ` Флот не полон: ${placed} из ${total}`;
      return;
    }
    this.isPlacementMode = false;
    this.statusMessage = "Ваш ход! Стреляйте по полю врага.";
  }

  //  Предпросмотр размещения
  getPreviewCells(x: number, y: number): Cell[] {
    if (!this.isPlacementMode || !this.selectedShipSize) return [];
    if (!this.canPlaceShip(this.playerBoard, x, y, this.selectedShipSize, this.isHorizontal)) return [];
    
    const cells: Cell[] = [];
    for (let i = 0; i < this.selectedShipSize; i++) {
      const cx = this.isHorizontal ? x + i : x;
      const cy = this.isHorizontal ? y : y + i;
      if (this.playerBoard[cy] && this.playerBoard[cy][cx]) {
        cells.push(this.playerBoard[cy][cx]);
      }
    }
    return cells;
  }

  isValidPreview(cell: Cell, x: number, y: number): boolean {
    return this.getPreviewCells(x, y).includes(cell);
  }

  //  Случайное размещение кораблей для компьютера
  placeShipsRandomly(board: Board) {
    const ships = [
      { size: 4, count: 1 },
      { size: 3, count: 2 },
      { size: 2, count: 3 },
      { size: 1, count: 4 }
    ];
    
    ships.forEach(shipConfig => {
      for (let i = 0; i < shipConfig.count; i++) {
        let placed = false;
        while (!placed) {
          const horizontal = Math.random() < 0.5;
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 10);

          if (this.canPlaceShip(board, x, y, shipConfig.size, horizontal)) {
            this.placeShip(board, x, y, shipConfig.size, horizontal);
            placed = true;
          }
        }
      }
    });
  }

  //  Ход компьютера
  computerTurn() {
    if (this.gameOver) return;

    //  Бот использует суперспособности, если они есть и доступны
    if (this.enableSuperPowers && this.computerSuperPowers.some(p => p.available)) {
      const availablePower = this.computerSuperPowers.find(p => p.available);
      if (availablePower) {
        this.computerUseSuperPower(availablePower);
        return;
      }
    }

    //  Обычный выстрел
    let targetCell: Cell | null = null;
    
    // 1. Стреляем вокруг подбитых
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = this.playerBoard[y][x];
        const isTargetable = !cell.isRevealed || (cell.isSuperPower === true && cell.superPowerType === 'radar');
        if (cell.isRevealed && cell.isHit && isTargetable) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
                const neighbor = this.playerBoard[ny][nx];
                const isNeighborTargetable = !neighbor.isRevealed || (neighbor.isSuperPower === true && neighbor.superPowerType === 'radar');
                if (isNeighborTargetable) {
                  targetCell = neighbor;
                  break;
                }
              }
            }
            if (targetCell) break;
          }
        }
        if (targetCell) break;
      }
      if (targetCell) break;
    }
    
    // 2. Если не нашли - случайный выстрел
    if (!targetCell) {
      let attempts = 0;
      while (attempts < 100) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const cell = this.playerBoard[y][x];
        const isTargetable = !cell.isRevealed || (cell.isSuperPower === true && cell.superPowerType === 'radar');
        if (isTargetable) {
          targetCell = cell;
          break;
        }
        attempts++;
      }
    }
    
    if (targetCell) {
      if (targetCell.isSuperPower === true && targetCell.superPowerType === 'radar') {
        targetCell.isSuperPower = false;
        targetCell.superPowerType = undefined;
      }
      
      targetCell.isRevealed = true;
      if (targetCell.hasShip) {
        targetCell.isHit = true;
        this.checkWin(this.playerBoard, 'computer');
        if (!this.gameOver) {
          setTimeout(() => this.computerTurn(), 800);
        }
      } else {
        targetCell.isMiss = true;
        this.computerMissCount++;
        this.checkForSuperPower(false);
        this.isPlayerTurn = true;
        this.statusMessage = "Ваш ход!";
      }
    }
  }

  //  ИИ компьютера для суперспособностей
  computerUseSuperPower(power: SuperPower) {
    switch (power.type) {
      case 'explosion': {
        let targetCell: Cell | null = null;
        
        for (let y = 0; y < 10; y++) {
          for (let x = 0; x < 10; x++) {
            const cell = this.playerBoard[y][x];
            if (cell.isRevealed && cell.isHit) {
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  const nx = x + dx;
                  const ny = y + dy;
                  if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
                    const neighbor = this.playerBoard[ny][nx];
                    const isTargetable = !neighbor.isRevealed || (neighbor.isSuperPower === true && neighbor.superPowerType === 'radar');
                    if (isTargetable) {
                      targetCell = neighbor;
                      break;
                    }
                  }
                }
                if (targetCell) break;
              }
            }
            if (targetCell) break;
          }
          if (targetCell) break;
        }
        
        if (!targetCell) {
          const unrevealed: Cell[] = [];
          for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
              const cell = this.playerBoard[y][x];
              const isTargetable = !cell.isRevealed || (cell.isSuperPower === true && cell.superPowerType === 'radar');
              if (isTargetable) {
                unrevealed.push(cell);
              }
            }
          }
          if (unrevealed.length > 0) {
            targetCell = unrevealed[Math.floor(Math.random() * unrevealed.length)];
          }
        }
        
        if (targetCell) {
          if (targetCell.isSuperPower === true && targetCell.superPowerType === 'radar') {
            targetCell.isSuperPower = false;
            targetCell.superPowerType = undefined;
          }
          this.activateExplosion(targetCell, this.playerBoard, false);
        }
        power.available = false;
        this.checkWin(this.playerBoard, 'computer');
        break;
      }
      
      case 'radar': {
        let rx = Math.floor(Math.random() * 9);
        let ry = Math.floor(Math.random() * 9);
        
        let attempts = 0;
        while (attempts < 20) {
          let hasUnrevealed = false;
          for (let dy = 0; dy < 2; dy++) {
            for (let dx = 0; dx < 2; dx++) {
              const cell = this.playerBoard[ry + dy][rx + dx];
              const isTargetable = !cell.isRevealed || (cell.isSuperPower === true && cell.superPowerType === 'radar');
              if (isTargetable) {
                hasUnrevealed = true;
                break;
              }
            }
            if (hasUnrevealed) break;
          }
          if (hasUnrevealed) break;
          rx = Math.floor(Math.random() * 9);
          ry = Math.floor(Math.random() * 9);
          attempts++;
        }
        
        this.activateRadar(this.playerBoard[ry][rx], this.playerBoard, false);
        power.available = false;
        break;
      }
      
      case 'repair':
        this.activateRepair(false);
        power.available = false;
        break;
    }
    
    if (power.type !== 'repair') {
      if (!this.gameOver) {
        this.isPlayerTurn = true;
        setTimeout(() => this.statusMessage = "Ваш ход!", 1500);
      }
    } else {
      if (!this.gameOver) {
        setTimeout(() => this.computerTurn(), 800);
      }
    }
  }

  //  Проверка победы
  checkWin(board: Board, winner: string) {
    const allShipsSunk = board.every(row => 
      row.every(cell => !cell.hasShip || cell.isHit)
    );

    if (allShipsSunk) {
      this.gameOver = true;
      this.showEndGameAlert(winner === 'player' ? ' Победа!' : ' Поражение!');
    }
  }

  //  Показать алерт (только для старта/конца)
  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  //  Конец игры
  async showEndGameAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: message,
      subHeader: 'Сыграем ещё?',
      buttons: [
        { text: 'Нет', role: 'cancel' },
        { text: 'Да', handler: () => this.selectGameMode() }
      ]
    });
    await alert.present();
  }

  //  Вспомогательные методы для шаблона
  isValidPowerTarget(cell: Cell, powerType: SuperPowerType): boolean {
    if (!this.isPowerActivationMode || !this.selectedPowerForActivation) return false;
    
    switch (powerType) {
      case 'explosion':
      case 'radar': {
        const isRadarMarked = cell.isSuperPower === true && cell.superPowerType === 'radar';
        return (!cell.isRevealed || isRadarMarked) && cell.x <= 8 && cell.y <= 8;
      }
      case 'repair':
        return cell.hasShip && cell.isHit;
      default:
        return false;
    }
  }

  cancelPowerActivation() {
    this.isPowerActivationMode = false;
    this.selectedPowerForActivation = null;
    this.statusMessage = this.isPlayerTurn ? "Ваш ход!" : "Ход противника...";
  }

  getSuperPowerIcon(type: SuperPowerType | undefined): string {
    if (!type) return 'star';
    const map: Record<SuperPowerType, string> = { 
      'explosion': 'flash', 
      'radar': 'eye', 
      'repair': 'construct' 
    };
    return map[type] || 'star';
  }

  getSuperPowerColor(type: SuperPowerType | undefined): string {
    if (!type) return 'primary';
    const map: Record<SuperPowerType, string> = { 
      'explosion': 'danger', 
      'radar': 'warning', 
      'repair': 'success' 
    };
    return map[type] || 'primary';
  }

  async showPowersInfo() {
    const alert = await this.alertCtrl.create({
      header: ' Суперспособности',
      message: `
        <b> Взрыв 3×3</b>: Урон по области 9 клеток.<br>
        <b> Радар 2×2</b>: Показывает 4 клетки. Не атакует.<br>
        <b> Ремонт</b>: Чинит корабль. Делает уязвимым.<br><br>
        <i>Выдаются каждые 10 промахов.</i>
      `,
      buttons: ['Понятно']
    });
    await alert.present();
  }
}