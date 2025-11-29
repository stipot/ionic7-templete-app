import { Component } from '@angular/core';

interface Tile {
  value: number;
  id: number;
  row: number;
  col: number;
  isNew?: boolean;
  merged?: boolean;
}

type GameTheme = 'classic' | 'dark' | 'colorful' | 'minimal';
type GridSize = 3 | 4 | 5;

@Component({
  selector: 'app-g2048',
  templateUrl: './g2048.component.html',
  styleUrls: ['./g2048.component.scss']
})
export class G2048Component {
  grid: Tile[][] = [];
  score: number = 0;
  bestScore: number = 0;
  gameOver: boolean = false;
  won: boolean = false;
  currentTheme: GameTheme = 'classic';
  currentSize: GridSize = 4;
  private targetValue: number = 2048;
  
  constructor() {
    this.initializeGame();
  }

  initializeGame() {
    // Устанавливаем целевое значение в зависимости от размера
    this.targetValue = this.currentSize === 3 ? 512 : 
                      this.currentSize === 4 ? 2048 : 4096;

    this.grid = [];
    for (let row = 0; row < this.currentSize; row++) {
      this.grid[row] = [];
      for (let col = 0; col < this.currentSize; col++) {
        this.grid[row][col] = {
          value: 0,
          id: row * this.currentSize + col,
          row: row,
          col: col
        };
      }
    }
    
    this.score = 0;
    this.gameOver = false;
    this.won = false;
    this.addRandomTile();
    this.addRandomTile();
  }

  changeTheme() {
    const themes: GameTheme[] = ['classic', 'dark', 'colorful', 'minimal'];
    const currentIndex = themes.indexOf(this.currentTheme);
    this.currentTheme = themes[(currentIndex + 1) % themes.length];
  }

  changeSize() {
    const sizes: GridSize[] = [3, 4, 5];
    const currentIndex = sizes.indexOf(this.currentSize);
    this.currentSize = sizes[(currentIndex + 1) % sizes.length];
    this.initializeGame();
  }

  getThemeButtonText(): string {
    const themeNames = {
      'classic': 'Классика',
      'dark': 'Тёмная',
      'colorful': 'Цветная',
      'minimal': 'Минимализм'
    };
    return `Стиль: ${themeNames[this.currentTheme]}`;
  }

  getSizeButtonText(): string {
    const sizeNames = {
      3: '3×3',
      4: '4×4', 
      5: '5×5'
    };
    return `Карта: ${sizeNames[this.currentSize]}`;
  }

  getTargetValue(): number {
    return this.targetValue;
  }

  private addRandomTile() {
    const emptyCells: {row: number, col: number}[] = [];
    
    for (let row = 0; row < this.currentSize; row++) {
      for (let col = 0; col < this.currentSize; col++) {
        if (this.grid[row][col].value === 0) {
          emptyCells.push({row, col});
        }
      }
    }
    
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      this.grid[randomCell.row][randomCell.col].value = Math.random() < 0.9 ? 2 : 4;
      this.grid[randomCell.row][randomCell.col].isNew = true;
      
      setTimeout(() => {
        this.grid[randomCell.row][randomCell.col].isNew = false;
      }, 300);
    }
  }

  move(direction: 'left' | 'right' | 'up' | 'down') {
    if (this.gameOver) return;

    const gridBefore = this.serializeGrid();
    
    this.resetFlags();

    switch (direction) {
      case 'left': this.moveLeft(); break;
      case 'right': this.moveRight(); break;
      case 'up': this.moveUp(); break;
      case 'down': this.moveDown(); break;
    }

    const gridAfter = this.serializeGrid();

    if (gridBefore !== gridAfter) {
      this.updateFlags(gridBefore);
      this.addRandomTile();
      this.checkGameStatus();
      
      if (this.score > this.bestScore) {
        this.bestScore = this.score;
      }
    }
  }

  private resetFlags() {
    for (let row = 0; row < this.currentSize; row++) {
      for (let col = 0; col < this.currentSize; col++) {
        this.grid[row][col].isNew = false;
        this.grid[row][col].merged = false;
      }
    }
  }

  private updateFlags(previousGrid: string) {
    const previousState = JSON.parse(previousGrid);
    
    for (let row = 0; row < this.currentSize; row++) {
      for (let col = 0; col < this.currentSize; col++) {
        const currentValue = this.grid[row][col].value;
        const previousValue = previousState[row][col];
        
        if (currentValue !== 0 && previousValue !== 0 && currentValue === previousValue * 2) {
          this.grid[row][col].merged = true;
          
          setTimeout(() => {
            this.grid[row][col].merged = false;
          }, 300);
        }
      }
    }
  }

  private serializeGrid(): string {
    return JSON.stringify(this.grid.map(row => row.map(tile => tile.value)));
  }

  private moveLeft() {
    for (let row = 0; row < this.currentSize; row++) {
      const values = [];
      for (let col = 0; col < this.currentSize; col++) {
        if (this.grid[row][col].value !== 0) {
          values.push(this.grid[row][col].value);
        }
      }
      
      if (values.length === 0) continue;

      const newValues = [];
      for (let i = 0; i < values.length; i++) {
        if (i < values.length - 1 && values[i] === values[i + 1]) {
          newValues.push(values[i] * 2);
          this.score += values[i] * 2;
          i++;
        } else {
          newValues.push(values[i]);
        }
      }

      for (let col = 0; col < this.currentSize; col++) {
        this.grid[row][col].value = col < newValues.length ? newValues[col] : 0;
      }
    }
  }

  private moveRight() {
    for (let row = 0; row < this.currentSize; row++) {
      const values = [];
      for (let col = this.currentSize - 1; col >= 0; col--) {
        if (this.grid[row][col].value !== 0) {
          values.push(this.grid[row][col].value);
        }
      }
      
      if (values.length === 0) continue;

      const newValues = [];
      for (let i = 0; i < values.length; i++) {
        if (i < values.length - 1 && values[i] === values[i + 1]) {
          newValues.push(values[i] * 2);
          this.score += values[i] * 2;
          i++;
        } else {
          newValues.push(values[i]);
        }
      }

      for (let col = this.currentSize - 1; col >= 0; col--) {
        const index = this.currentSize - 1 - col;
        this.grid[row][col].value = index < newValues.length ? newValues[index] : 0;
      }
    }
  }

  private moveUp() {
    for (let col = 0; col < this.currentSize; col++) {
      const values = [];
      for (let row = 0; row < this.currentSize; row++) {
        if (this.grid[row][col].value !== 0) {
          values.push(this.grid[row][col].value);
        }
      }
      
      if (values.length === 0) continue;

      const newValues = [];
      for (let i = 0; i < values.length; i++) {
        if (i < values.length - 1 && values[i] === values[i + 1]) {
          newValues.push(values[i] * 2);
          this.score += values[i] * 2;
          i++;
        } else {
          newValues.push(values[i]);
        }
      }

      for (let row = 0; row < this.currentSize; row++) {
        this.grid[row][col].value = row < newValues.length ? newValues[row] : 0;
      }
    }
  }

  private moveDown() {
    for (let col = 0; col < this.currentSize; col++) {
      const values = [];
      for (let row = this.currentSize - 1; row >= 0; row--) {
        if (this.grid[row][col].value !== 0) {
          values.push(this.grid[row][col].value);
        }
      }
      
      if (values.length === 0) continue;

      const newValues = [];
      for (let i = 0; i < values.length; i++) {
        if (i < values.length - 1 && values[i] === values[i + 1]) {
          newValues.push(values[i] * 2);
          this.score += values[i] * 2;
          i++;
        } else {
          newValues.push(values[i]);
        }
      }

      for (let row = this.currentSize - 1; row >= 0; row--) {
        const index = this.currentSize - 1 - row;
        this.grid[row][col].value = index < newValues.length ? newValues[index] : 0;
      }
    }
  }

  getAllTiles(): Tile[] {
    const tiles: Tile[] = [];
    for (let row = 0; row < this.currentSize; row++) {
      for (let col = 0; col < this.currentSize; col++) {
        if (this.grid[row][col].value !== 0) {
          tiles.push(this.grid[row][col]);
        }
      }
    }
    return tiles;
  }

  getTilePosition(tile: Tile): {x: number, y: number} {
    // Используем фиксированные размеры для каждого типа поля
    let cellSize, gap;
    
    switch (this.currentSize) {
      case 3:
        cellSize = 120;
        gap = 10;
        break;
      case 4:
        cellSize = 80;
        gap = 10;
        break;
      case 5:
        cellSize = 64;
        gap = 10;
        break;
      default:
        cellSize = 80;
        gap = 10;
    }
    
    return {
      x: tile.col * (cellSize + gap),
      y: tile.row * (cellSize + gap)
    };
  }

  getTileTransform(tile: Tile): string {
    const position = this.getTilePosition(tile);
    return `translate(${position.x}px, ${position.y}px)`;
  }

  getTileClass(tile: Tile): string {
    const classes = [`tile-${tile.value}`];
    
    if (tile.isNew) classes.push('tile-new');
    if (tile.merged) classes.push('tile-merged');
    
    return classes.join(' ');
  }

  private checkGameStatus() {
    for (let row = 0; row < this.currentSize; row++) {
      for (let col = 0; col < this.currentSize; col++) {
        if (this.grid[row][col].value === this.targetValue) {
          this.won = true;
          return;
        }
      }
    }

    if (this.isGridFull() && !this.hasValidMoves()) {
      this.gameOver = true;
    }
  }

  private isGridFull(): boolean {
    for (let row = 0; row < this.currentSize; row++) {
      for (let col = 0; col < this.currentSize; col++) {
        if (this.grid[row][col].value === 0) {
          return false;
        }
      }
    }
    return true;
  }

  private hasValidMoves(): boolean {
    for (let row = 0; row < this.currentSize; row++) {
      for (let col = 0; col < this.currentSize - 1; col++) {
        if (this.grid[row][col].value === this.grid[row][col + 1].value) {
          return true;
        }
      }
    }
    
    for (let col = 0; col < this.currentSize; col++) {
      for (let row = 0; row < this.currentSize - 1; row++) {
        if (this.grid[row][col].value === this.grid[row + 1][col].value) {
          return true;
        }
      }
    }
    
    return false;
  }

  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft': 
        this.move('left'); 
        event.preventDefault(); 
        break;
      case 'ArrowRight': 
        this.move('right'); 
        event.preventDefault(); 
        break;
      case 'ArrowUp': 
        this.move('up'); 
        event.preventDefault(); 
        break;
      case 'ArrowDown': 
        this.move('down'); 
        event.preventDefault(); 
        break;
    }
  }

  restartGame() {
    this.initializeGame();
  }

  trackByTileId(index: number, tile: Tile): number {
    return tile.id;
  }

  // Генератор массива для ngFor
  getGridArray(): number[] {
    return Array(this.currentSize).fill(0).map((x, i) => i);
  }
}