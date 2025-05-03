import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RecipesComponent } from './recipes.component';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesComponent ],
      imports: [IonicModule.forRoot(), FormsModule, TranslateModule.forRoot()] 
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter recipes by name and description', () => {
    component.searchText = 'куриная';
    component.searchType = 'name';
    fixture.detectChanges();

    const filtered = component.filteredRecipes;
    expect(filtered.length).toBe(1); 
    expect(filtered[0].name).toContain('Куриная запеканка с тортильей');
  });

  it('should toggle search type between name and ingredients', () => {
    expect(component.searchType).toBe('name');

    component.toggleSearchType();
    expect(component.searchType).toBe('ingredients');

    component.toggleSearchType();
    expect(component.searchType).toBe('name');
  });
});