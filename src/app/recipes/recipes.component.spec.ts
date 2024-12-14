import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesComponent ],
      imports: [IonicModule.forRoot(), FormsModule] 
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter recipes by name and description', () => {
    component.searchText = 'курица';
    component.searchType = 'name';
    fixture.detectChanges();

    const filtered = component.filteredRecipes;
    expect(filtered.length).toBe(2); 
    expect(filtered[0].name).toContain('Куриные бедра с горчичным соусом');
  });

  it('should toggle search type between name and ingredients', () => {
    expect(component.searchType).toBe('name');

    component.toggleSearchType();
    expect(component.searchType).toBe('ingredients');

    component.toggleSearchType();
    expect(component.searchType).toBe('name');
  });
});