import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Cell {
  x: number;
  y: number;
  hasShip: boolean;
  isHit: boolean;
  isMiss: boolean;
  isRevealed: boolean;
}

type Board = Cell[][];

interface ShipConfig {
  size: number;
  count: number;
  placed: number;
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

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.startNewGame();
  }

  createEmptyBoard(): Board {
    return Array(10).fill(null).map((_, y) =>
      Array(10).fill(null).map((_, x) => ({
        x, y, hasShip: false, isHit: false, isMiss: false, isRevealed: false
      }))
    );
  }

  startNewGame() {
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
    
    this.placeShipsRandomly(this.computerBoard);
  }

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
      this.showAlert('Ошибка', 'Сюда нельзя ставить (слишком близко к другому кораблю)');
    }
  }

  isPlacementComplete(): boolean {
    return this.shipsToPlace.every(s => s.placed >= s.count);
  }

  finishPlacement() {
    if (!this.isPlacementComplete()) {
      const total = this.shipsToPlace.reduce((sum, s) => sum + s.count, 0);
      const placed = this.shipsToPlace.reduce((sum, s) => sum + s.placed, 0);
      this.showAlert('Флот не полон', `Размещено: ${placed} из ${total}`);
      return;
    }
    this.isPlacementMode = false;
    this.statusMessage = "Ваш ход! Стреляйте по полю врага.";
  }

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

  handleCellClick(cell: Cell, boardType: 'player' | 'computer') {
    if (this.isPlacementMode) {
      if (boardType === 'player') this.handlePlayerCellClick(cell);
      return;
    }

    if (this.gameOver || !this.isPlayerTurn) return;
    
    if (boardType === 'computer') {
      if (cell.isRevealed) return;

      cell.isRevealed = true;
      if (cell.hasShip) {
        cell.isHit = true;
        this.checkWin(this.computerBoard, 'player');
        if (!this.gameOver) {
          this.statusMessage = "Попадание! Стреляйте снова.";
        }
      } else {
        cell.isMiss = true;
        this.statusMessage = "Промах. Ход противника...";
        this.isPlayerTurn = false;
        setTimeout(() => this.computerTurn(), 800);
      }
    }
  }

  computerTurn() {
    if (this.gameOver) return;

    let validShot = false;
    while (!validShot) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const cell = this.playerBoard[y][x];

      if (!cell.isRevealed) {
        cell.isRevealed = true;
        validShot = true;
        if (cell.hasShip) {
          cell.isHit = true;
          this.checkWin(this.playerBoard, 'computer');
          if (!this.gameOver) {
             setTimeout(() => this.computerTurn(), 800); 
          }
        } else {
          cell.isMiss = true;
          this.isPlayerTurn = true;
          this.statusMessage = "Ваш ход!";
        }
      }
    }
  }

  checkWin(board: Board, winner: string) {
    const allShipsSunk = board.every(row => 
      row.every(cell => !cell.hasShip || cell.isHit)
    );

    if (allShipsSunk) {
      this.gameOver = true;
      this.showEndGameAlert(winner === 'player' ? 'Победа!' : 'Поражение!');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showEndGameAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: message,
      subHeader: 'Сыграем ещё?',
      buttons: [
        { text: 'Нет', role: 'cancel' },
        { text: 'Да', handler: () => this.startNewGame() }
      ]
    });
    await alert.present();
  }
}