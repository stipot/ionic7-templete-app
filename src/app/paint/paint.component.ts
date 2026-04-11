import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.scss'],
})
export class PaintComponent implements OnInit, AfterViewInit {
  @ViewChild('paintCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  
  private isDrawing = false;
  private startPoint = { x: 0, y: 0 };
  private snapshot: ImageData | null = null;
  
  private selectedTool = 'brush';
  private brushWidth = 5;
  private selectedColor = '#000000';
  private fillShape = false;

  // История для отмены (максимум 20 действий)
  private history: ImageData[] = [];
  private historyIndex: number = -1;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCanvas();
      this.setupEventListeners();
    }, 100);
  }

  private initCanvas() {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.setCanvasSize();
    this.setDefaultBackground();
    
    // Сохраняем начальное состояние
    this.saveToHistory();
    
    window.addEventListener('resize', () => {
      setTimeout(() => this.setCanvasSize(), 100);
    });
  }

  private setCanvasSize() {
    const container = document.querySelector('.drawing-board') as HTMLElement;
    if (container) {
      this.canvas.width = container.clientWidth;
      this.canvas.height = container.clientHeight;
      this.setDefaultBackground();
    }
  }

  private setDefaultBackground() {
    if (this.ctx) {
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  // ========== ОТМЕНА (UNDO) ==========
  private saveToHistory() {
    // Проверка что canvas готов
    if (this.canvas.width === 0 || this.canvas.height === 0) return;
    
    // Удаляем всё, что было после текущего индекса (если отменили и начали рисовать заново)
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    
    // Сохраняем текущее состояние
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.history.push(imageData);
    this.historyIndex++;
    
    // Ограничиваем историю 20 действиями
    if (this.history.length > 20) {
      this.history.shift();
      this.historyIndex--;
    }
  }

  public undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      const previousState = this.history[this.historyIndex];
      this.ctx.putImageData(previousState, 0, 0);
    }
  }

  // ========== ЗАЛИВКА ОБЛАСТИ ==========
  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  private floodFill(x: number, y: number, fillColor: string) {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    const idx = (Math.floor(y) * width + Math.floor(x)) * 4;
    const targetR = data[idx];
    const targetG = data[idx + 1];
    const targetB = data[idx + 2];
    
    const fillRGB = this.hexToRgb(fillColor);
    if (!fillRGB) return;
    
    if (targetR === fillRGB.r && targetG === fillRGB.g && targetB === fillRGB.b) return;
    
    const stack: { x: number; y: number }[] = [{ x: Math.floor(x), y: Math.floor(y) }];
    const visited = new Set<string>();
    
    while (stack.length > 0) {
      const { x: px, y: py } = stack.pop()!;
      const key = `${px},${py}`;
      
      if (px < 0 || px >= width || py < 0 || py >= height) continue;
      if (visited.has(key)) continue;
      
      const pixelIdx = (py * width + px) * 4;
      
      const colorMatch = data[pixelIdx] === targetR &&
                         data[pixelIdx + 1] === targetG &&
                         data[pixelIdx + 2] === targetB;
      
      if (colorMatch) {
        data[pixelIdx] = fillRGB.r;
        data[pixelIdx + 1] = fillRGB.g;
        data[pixelIdx + 2] = fillRGB.b;
        data[pixelIdx + 3] = 255;
        
        visited.add(key);
        
        stack.push({ x: px + 1, y: py });
        stack.push({ x: px - 1, y: py });
        stack.push({ x: px, y: py + 1 });
        stack.push({ x: px, y: py - 1 });
      }
    }
    
    this.ctx.putImageData(imageData, 0, 0);
    this.saveToHistory();
  }

  private activateFillTool() {
    this.selectedTool = 'fill';
    
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
    const fillBtn = document.getElementById('fill-tool');
    fillBtn?.classList.add('active');
    
    this.canvas.style.cursor = 'pointer';
    
    const fillHandler = (e: MouseEvent) => {
      const { x, y } = this.getMouseCoordinates(e);
      this.floodFill(x, y, this.selectedColor);
      this.canvas.removeEventListener('click', fillHandler);
      
      this.selectedTool = 'brush';
      document.querySelector('#brush')?.classList.add('active');
      this.canvas.style.cursor = 'crosshair';
    };
    
    this.canvas.addEventListener('click', fillHandler);
  }

  private setupEventListeners() {
    this.canvas.addEventListener('mousedown', this.startDraw.bind(this));
    this.canvas.addEventListener('mousemove', this.drawing.bind(this));
    this.canvas.addEventListener('mouseup', this.endDraw.bind(this));
    
    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.canvas.addEventListener('touchend', this.endDraw.bind(this));
    
    document.querySelectorAll('.tool-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        if (target.id === 'fill-tool') {
          this.activateFillTool();
        } else {
          this.switchTool(target);
        }
      });
    });
    
    const fillCheckbox = document.getElementById('fill-color') as HTMLIonCheckboxElement;
    fillCheckbox?.addEventListener('ionChange', (e: any) => {
      this.fillShape = e.detail.checked;
    });
    
    const sizeSlider = document.getElementById('size-slider') as HTMLIonRangeElement;
    sizeSlider?.addEventListener('ionChange', (e: any) => {
      this.brushWidth = e.detail.value as number;
    });
    
    document.querySelectorAll('.color-option').forEach(option => {
      option.addEventListener('click', (e) => {
        const color = (e.currentTarget as HTMLElement).getAttribute('data-color');
        if (color) this.selectColor(color, e.currentTarget as HTMLElement);
      });
    });
    
    const colorPicker = document.getElementById('color-picker') as HTMLInputElement;
    colorPicker?.addEventListener('change', (e) => {
      this.selectedColor = (e.target as HTMLInputElement).value;
    });
    
    const clearBtn = document.getElementById('clear-canvas');
    clearBtn?.addEventListener('click', () => this.clearCanvas());
    
    const saveBtn = document.getElementById('save-img');
    saveBtn?.addEventListener('click', () => this.saveImage());
    
    // Кнопка отмены
    const undoBtn = document.getElementById('undo-btn');
    if (undoBtn) {
      undoBtn.addEventListener('click', () => {
        this.undo();
      });
    }
    
    // Горячая клавиша Ctrl+Z
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        this.undo();
      }
    });
  
  }

  private handleTouchStart(e: TouchEvent) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.canvas.dispatchEvent(mouseEvent);
  }

  private handleTouchMove(e: TouchEvent) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.canvas.dispatchEvent(mouseEvent);
  }

  private getMouseCoordinates(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  private startDraw(e: MouseEvent) {
    this.isDrawing = true;
    const { x, y } = this.getMouseCoordinates(e);
    this.startPoint = { x, y };
    
    // Сохраняем состояние ПЕРЕД рисованием
    this.saveToHistory();
    
    this.snapshot = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.selectedTool === 'brush' || this.selectedTool === 'eraser') {
      this.drawDot(x, y);
    }
  }

  private drawing(e: MouseEvent) {
    if (!this.isDrawing) return;
    
    const { x, y } = this.getMouseCoordinates(e);
    
    switch(this.selectedTool) {
      case 'brush':
        this.drawBrush(x, y);
        break;
      case 'eraser':
        this.erase(x, y);
        break;
      case 'rectangle':
      case 'circle':
      case 'triangle':
        this.drawShape(x, y);
        break;
    }
  }

  private endDraw() {
    this.isDrawing = false;
    // НЕ сохраняем здесь, чтобы не было дублирования
  }

  private drawDot(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.brushWidth / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = this.selectedTool === 'eraser' ? '#FFFFFF' : this.selectedColor;
    this.ctx.fill();
  }

  private drawBrush(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
    this.ctx.lineTo(x, y);
    this.ctx.strokeStyle = this.selectedColor;
    this.ctx.lineWidth = this.brushWidth;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();
    this.startPoint = { x, y };
  }

  private erase(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
    this.ctx.lineTo(x, y);
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.lineWidth = this.brushWidth;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();
    this.startPoint = { x, y };
  }

  private drawShape(currentX: number, currentY: number) {
    if (!this.snapshot) return;
    
    this.ctx.putImageData(this.snapshot, 0, 0);
    const width = currentX - this.startPoint.x;
    const height = currentY - this.startPoint.y;
    
    this.ctx.beginPath();
    
    switch(this.selectedTool) {
      case 'rectangle':
        if (this.fillShape) {
          this.ctx.fillStyle = this.selectedColor;
          this.ctx.fillRect(this.startPoint.x, this.startPoint.y, width, height);
        }
        this.ctx.strokeStyle = this.selectedColor;
        this.ctx.lineWidth = this.brushWidth;
        this.ctx.strokeRect(this.startPoint.x, this.startPoint.y, width, height);
        break;
        
      case 'circle':
        const radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2;
        const centerX = this.startPoint.x + width / 2;
        const centerY = this.startPoint.y + height / 2;
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        if (this.fillShape) {
          this.ctx.fillStyle = this.selectedColor;
          this.ctx.fill();
        }
        this.ctx.strokeStyle = this.selectedColor;
        this.ctx.lineWidth = this.brushWidth;
        this.ctx.stroke();
        break;
        
      case 'triangle':
        const centerX_tri = this.startPoint.x + width / 2;
        this.ctx.moveTo(centerX_tri, this.startPoint.y);
        this.ctx.lineTo(this.startPoint.x, currentY);
        this.ctx.lineTo(currentX, currentY);
        this.ctx.closePath();
        if (this.fillShape) {
          this.ctx.fillStyle = this.selectedColor;
          this.ctx.fill();
        }
        this.ctx.strokeStyle = this.selectedColor;
        this.ctx.lineWidth = this.brushWidth;
        this.ctx.stroke();
        break;
    }
  }

  private switchTool(btn: HTMLElement) {
    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.selectedTool = btn.id;
    this.canvas.style.cursor = 'crosshair';
  }

  private selectColor(color: string, element: HTMLElement) {
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    this.selectedColor = color;
  }

  private clearCanvas() {
    if (confirm('Очистить весь рисунок?')) {
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.saveToHistory();
    }
  }

  private saveImage() {
    const link = document.createElement('a');
    link.download = `paint-${Date.now()}.png`;
    link.href = this.canvas.toDataURL();
    link.click();
  }
}