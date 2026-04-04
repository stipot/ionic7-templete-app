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

  // Массив для хранения истории (до 50 действий)
  private history: ImageData[] = [];
  private historyIndex: number = -1;
  private maxHistorySize: number = 50;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.initCanvas();
    this.setupEventListeners();
  }

  private initCanvas() {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.setCanvasSize();
    this.setDefaultBackground();
    
    
    window.addEventListener('resize', () => this.setCanvasSize());
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

  

  private setupEventListeners() {
    // Mouse events
    this.canvas.addEventListener('mousedown', this.startDraw.bind(this));
    this.canvas.addEventListener('mousemove', this.drawing.bind(this));
    this.canvas.addEventListener('mouseup', this.endDraw.bind(this));
    
    // Touch events
    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.canvas.addEventListener('touchend', this.endDraw.bind(this));
    
    // Tool buttons
    document.querySelectorAll('.tool-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchTool(e.currentTarget as HTMLElement));
    });
    
    // Fill checkbox
    const fillCheckbox = document.getElementById('fill-color') as HTMLIonCheckboxElement;
    fillCheckbox?.addEventListener('ionChange', (e: any) => {
      this.fillShape = e.detail.checked;
    });
    
    // Size slider
    const sizeSlider = document.getElementById('size-slider') as HTMLIonRangeElement;
    sizeSlider?.addEventListener('ionChange', (e: any) => {
      this.brushWidth = e.detail.value as number;
    });
    
    // Color options
    document.querySelectorAll('.color-option').forEach(option => {
      option.addEventListener('click', (e) => {
        const color = (e.currentTarget as HTMLElement).getAttribute('data-color');
        if (color) this.selectColor(color, e.currentTarget as HTMLElement);
      });
    });
    
    // Color picker
    const colorPicker = document.getElementById('color-picker') as HTMLInputElement;
    colorPicker?.addEventListener('change', (e) => {
      this.selectedColor = (e.target as HTMLInputElement).value;
    });
    
    // Action buttons
    const clearBtn = document.getElementById('clear-canvas');
    clearBtn?.addEventListener('click', () => this.clearCanvas());
    
    const saveBtn = document.getElementById('save-img');
    saveBtn?.addEventListener('click', () => this.saveImage());
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
    }
  }

  private saveImage() {
    const link = document.createElement('a');
    link.download = `paint-${Date.now()}.png`;
    link.href = this.canvas.toDataURL();
    link.click();
  }
}
