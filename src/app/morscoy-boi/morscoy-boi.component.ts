import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

// Интерфейс для клетки поля
interface Cell {
  x: number;
  y: number;
  hasShip: boolean;
  isHit: boolean;
  isMiss: boolean;
  isRevealed: boolean; // Видели ли мы эту клетку
}

type Board = Cell[][];

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
  statusMessage: string = "Ваш ход! Стреляйте по полю врага (сверху).";

  // Конфигурация кораблей (размеры)
  private shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.startNewGame();
  }

  // --- Инициализация ---

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
    this.statusMessage = "Ваш ход! Стреляйте по полю врага.";

    this.placeShipsRandomly(this.playerBoard);
    this.placeShipsRandomly(this.computerBoard);
  }

  // --- Логика расстановки кораблей ---

  placeShipsRandomly(board: Board) {
    this.shipSizes.forEach(size => {
      let placed = false;
      while (!placed) {
        const horizontal = Math.random() < 0.5;
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        if (this.canPlaceShip(board, x, y, size, horizontal)) {
          this.placeShip(board, x, y, size, horizontal);
          placed = true;
        }
      }
    });
  }

  canPlaceShip(board: Board, x: number, y: number, size: number, horizontal: boolean): boolean {
    // Проверка границ
    if (horizontal) {
      if (x + size > 10) return false;
      for (let i = 0; i < size; i++) {
        if (board[y][x + i].hasShip) return false;
      }
    } else {
      if (y + size > 10) return false;
      for (let i = 0; i < size; i++) {
        if (board[y + i][x].hasShip) return false;
      }
    }
    return true;
  }

  placeShip(board: Board, x: number, y: number, size: number, horizontal: boolean) {
    for (let i = 0; i < size; i++) {
      if (horizontal) board[y][x + i].hasShip = true;
      else board[y + i][x].hasShip = true;
    }
  }

  // --- Игровой процесс ---

  handleCellClick(cell: Cell, boardType: 'player' | 'computer') {
    // Запрет кликов если игра окончена, не ваш ход, или кликнули по своему полю
    if (this.gameOver || !this.isPlayerTurn || boardType === 'player') return;
    if (cell.isRevealed) return; // Уже стреляли сюда

    // Ход игрока
    cell.isRevealed = true;
    if (cell.hasShip) {
      cell.isHit = true;
      this.checkWin(this.computerBoard, 'player');
      if (!this.gameOver) {
        this.statusMessage = "Попадание! Стреляйте снова.";
      }
    } else {
      cell.isMiss = true;
      this.statusMessage = "Промах. Ход компьютера...";
      this.isPlayerTurn = false;
      setTimeout(() => this.computerTurn(), 1000); // Задержка перед ходом ПК
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
             // Если ПК попал, он стреляет снова
             setTimeout(() => this.computerTurn(), 1000); 
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
    // Проверка: все ли клетки с кораблями подбиты
    const allShipsSunk = board.every(row => 
      row.every(cell => !cell.hasShip || cell.isHit)
    );

    if (allShipsSunk) {
      this.gameOver = true;
      this.showEndGameAlert(winner === 'player' ? 'Победа!' : 'Поражение!');
    }
  }

  async showEndGameAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: message,
      subHeader: 'Хотите сыграть еще раз?',
      buttons: [
        { text: 'Нет', role: 'cancel' },
        { text: 'Да', handler: () => this.startNewGame() }
      ]
    });
    await alert.present();
  }
}