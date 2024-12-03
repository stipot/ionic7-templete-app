import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent {
  selectedRecipe: any = null;

  recipes = [
    {
      name: 'Паста с соусом',
      description: 'Вкусная паста с томатным соусом',
      image: 'https://via.placeholder.com/300x150',
      ingridients: 'Да, помидоры, паста, базилик',
      details: 'Этот рецепт пасты с соусом прост в приготовлении, и он идеально подходит для обеда или ужина. Используйте свежие ингредиенты для лучшего вкуса.',
    },
    {
      name: 'Салат Цезарь',
      description: 'Свежий салат с курицей и соусом Цезарь',
      image: 'https://via.placeholder.com/300x150',
      ingridients: 'Да\nКурица\nСалат\nГренки\nСоус',
      details: 'Салат Цезарь — это классика, которая никогда не выходит из моды. Этот салат с хрустящими гренками и курицей идеально подойдет к любому основному блюду.',
    },
    {
      name: 'Борщ',
      description: 'Традиционный украинский борщ с мясом',
      image: 'https://avatars.mds.yandex.net/get-entity_search/2347736/1009655397/S600xU_2x',
      ingridients: 'Мясо\nСвекла\nКартофель\nКапуста',
      details: 'Этот борщ варится долго, но результат стоит того! Он обладает насыщенным вкусом и идеально подходит для холодной зимы.',
    },
    {
      name: 'Борщ',
      description: 'Традиционный украинский борщ с мясом',
      image: 'https://avatars.mds.yandex.net/get-entity_search/2347736/1009655397/S600xU_2x',
      ingridients: 'Мясо\nСвекла\nКартофель\nКапуста',
      details: 'Этот борщ варится долго, но результат стоит того! Он обладает насыщенным вкусом и идеально подходит для холодной зимы.',
    },    {
      name: 'Борщ',
      description: 'Традиционный украинский борщ с мясом',
      image: 'https://avatars.mds.yandex.net/get-entity_search/2347736/1009655397/S600xU_2x',
      ingridients: 'Мясо\nСвекла\nКартофель\nКапуста',
      details: 'Этот борщ варится долго, но результат стоит того! Он обладает насыщенным вкусом и идеально подходит для холодной зимы.',
    },    {
      name: 'Борщ',
      description: 'Традиционный украинский борщ с мясом',
      image: 'https://avatars.mds.yandex.net/get-entity_search/2347736/1009655397/S600xU_2x',
      ingridients: 'Мясо\nСвекла\nКартофель\nКапуста',
      details: 'Этот борщ варится долго, но результат стоит того! Он обладает насыщенным вкусом и идеально подходит для холодной зимы.',
    },    {
      name: 'Борщ',
      description: 'Традиционный украинский борщ с мясом',
      image: 'https://avatars.mds.yandex.net/get-entity_search/2347736/1009655397/S600xU_2x',
      ingridients: 'Мясо\nСвекла\nКартофель\nКапуста',
      details: 'Этот борщ варится долго, но результат стоит того! Он обладает насыщенным вкусом и идеально подходит для холодной зимы.',
    },    {
      name: 'Борщ',
      description: 'Традиционный украинский борщ с мясом',
      image: 'https://avatars.mds.yandex.net/get-entity_search/2347736/1009655397/S600xU_2x',
      ingridients: 'Мясо\nСвекла\nКартофель\nКапуста',
      details: 'Этот борщ варится долго, но результат стоит того! Он обладает насыщенным вкусом и идеально подходит для холодной зимы.',
    },    {
      name: 'Борщ',
      description: 'Традиционный украинский борщ с мясом',
      image: 'https://avatars.mds.yandex.net/get-entity_search/2347736/1009655397/S600xU_2x',
      ingridients: 'Мясо\nСвекла\nКартофель\nКапуста',
      details: 'Этот борщ варится долго, но результат стоит того! Он обладает насыщенным вкусом и идеально подходит для холодной зимы.',
    },    {
      name: 'Борщ',
      description: 'Традиционный украинский борщ с мясом',
      image: 'https://avatars.mds.yandex.net/get-entity_search/2347736/1009655397/S600xU_2x',
      ingridients: 'Мясо\nСвекла\nКартофель\nКапуста',
      details: 'Этот борщ варится долго, но результат стоит того! Он обладает насыщенным вкусом и идеально подходит для холодной зимы.',
    },
  ];

  selectRecipe(recipe: any) {
    this.selectedRecipe = recipe;
  }

  deselectRecipe() {
    this.selectedRecipe = null;
  }

  convertNewlinesToBreaks(text: string): string {
    return text.replace(/\n/g, '<br>');
  }
}
