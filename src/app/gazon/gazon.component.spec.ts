import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { GazonComponent } from './gazon.component';

describe('GazonComponent', () => {
  let component: GazonComponent;
  let fixture: ComponentFixture<GazonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GazonComponent ],
      imports: [
        IonicModule.forRoot(),
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GazonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('должен создавать компонент', () => {
    expect(component).toBeTruthy();
  });

  it('должен обрабатывать выбор файла', () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const event = { target: { files: [file] } } as any;
    
    component.onFileSelected(event);
    expect(component.selectedFile).toBe(file);
  });

  it('должен очищать выбранный файл', () => {
    component.selectedFile = new File(['test'], 'test.png');
    component.clearFile();
    
    expect(component.selectedFile).toBeNull();
    expect(component.sourceFormat).toBe('');
    expect(component.targetFormat).toBe('');
  });

  it('должен рассчитывать размер файла правильно', () => {
    component.calculateFileSize(1024); // 1 KB
    expect(component.fileSize).toBe('1 КБ');
    
    component.calculateFileSize(1048576); // 1 MB
    expect(component.fileSize).toBe('1 МБ');
  });
});