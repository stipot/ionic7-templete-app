import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent {
  selectedRecipe: any = null;
  searchText: string = '';
  searchType: 'name' | 'ingredients' = 'name';


  recipes = [
  {
    "name": "Паста с соусом песто",
    "description": "Паста с ароматным соусом песто, приготовленным на основе базилика, чеснока и оливкового масла.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Паста, базилик, оливковое масло, чеснок, кедровые орехи, пармезан",
    "details": "Для приготовления песто в блендере смешайте свежий базилик, чеснок, кедровые орехи и пармезан. Постепенно добавляйте оливковое масло, пока не получите однородную пасту. Отварите пасту в подсоленной воде и перемешайте с готовым соусом песто. Подавайте с тертым пармезаном и украсьте свежими листьями базилика."
  },
  {
    "name": "Сushi",
    "description": "Традиционные японские роллы из raw рыбы и риса с умами.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Рис, умами, raw рыба, нори, соевый соус",
    "details": "Намотайте нори на ролл-мат, spread рис, add умами и raw рыбу. Сверните плотно и cut на pieces. Подавайте с соевым соусом и wasabi."
  },
  {
    "name": "Тacos",
    "description": "Мексиканские тacos с говядиной и свежими овощами.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Тортильи из маиса, говядина, лук, томаты, салат, сальса",
    "details": "Обжарьте говядину с луком и томатами. Нагрейте тортильи и fill их говядиной, салатом и сальсой. Подавайте с лимонным соком."
  },
  {
    "name": "Карри",
    "description": "Традиционное индийское блюдо с пряными специями и тушеными овощами.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Овощи, курица, куркума, карри, кокосовое молоко",
    "details": "Обжарьте специи в масле, add нарезанные овощи и курицу. Добавьте кокосовое молоко и тушите до готовности. Подавайте с рисом или naan."
  },
  {
    "name": "Пицца маргарита",
    "description": "Итальянская пицца с томатным соусом, моцареллой и базиликом.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Тесто, томатный соус, моцарелла, базилик, оливковое масло",
    "details": "Roll out тесто, spread томатный соус, add слой моцареллы и листья базилика. Запекайте в hot oven до золотистого цвета. Добавьте оливковое масло перед подачей."
  },
  {
    "name": "Суфле",
    "description": "Легкое и воздушное французское суфле.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Яйца, сахар, мука, сливочное масло",
    "details": "Whisk yolks с сахаром до thick, add муку и melted butter. В другую миску whisk whites до stiff peaks и fold into mixture. Зальите в форму и bake в oven до подъема. Serve warm."
  },
  {
    "name": "Суп том yum",
    "description": "Острый и ароматный тайский суп с лемонгрass и креветками.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Креветки, лемонгрass, чили, лайм,鱼露, кокосовое молоко",
    "details": "Boil кокосовое молоко с лемонгрass и чили. Add креветки и fish sauce, cook until done. Add лайм juice и serve with cilantro."
  },
  {
    "name": "Бифстроганов",
    "description": "Русское блюдо из говядины, маринованной в грибном соусе.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Говядина, лук, грибы, сметана, вино",
    "details": "Marinate говядину в сметане и вине. Fry лук и грибы, add meat и cook until tender. Serve with пюре."
  },
  {
    "name": "Тако кебаб",
    "description": "Турецкие кебабы из говядины, маринованные в специях и grilled на углях.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Говядина, специи, лук, помидоры, баклажаны",
    "details": "Marinate beef in spices и grill on skewers. Serve with grilled vegetables and pita bread."
  },
  {
    "name": "Рис с курицей",
    "description": "Простое и сытное блюдо с курицей и рисом.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Куриное филе, рис, овощи, soy sauce",
    "details": "Cook rice separately. Fry chicken с soy sauce и vegetables. Mix with rice and serve hot."
  },
  {
    "name": "Салат Цезарь",
    "description": "Классический салат с romaine lettuce, курицей и пармезаном.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Romaine lettuce, grilled chicken, пармезан, Caesar dressing",
    "details": "Toss lettuce с Caesar dressing, add grilled chicken и Parmesan. Serve chilled."
  },
  {
    "name": "Суп с лапшой",
    "description": "Корейский суп с лапшой и говядиной.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Лапша, говядина, kimchi, лук, мисо",
    "details": "Boil beef и kimchi, add noodles и cook until tender. Add miso и serve hot."
  },
  {
    "name": "Тартар из тунца",
    "description": "Французское блюдо из raw тунца с соусом есспрессо.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Тунец, огурец, яйцо, соус espagnole",
    "details": "Chop tuna into chunks и mix with diced cucumber и egg. Add espagnole sauce и serve on toast."
  },
  {
    "name": "Плов",
    "description": "Традиционное узбекское блюдо с рисом, meat и carrots.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Рис, баранина, морковь, лук, cumin",
    "details": "Fry meat с onions, add carrots и rice. Cook in broth с cumin until tender. Serve hot."
  },
  {
    "name": "Сырный суп",
    "description": "Насыщенный суп с множеством сортов сыра.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Сыр, сливки, лук, чеснок, пшеничная мука",
    "details": "Sauté onions и garlic, add flour и cook until golden. Add milk и cream, stir until thickened. Add cheese и cook until melted. Serve hot."
  },
  {
    "name": "Морковный суп",
    "description": "Одно из самых популярных супов в мире, с морковью и ginger.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Морковь, лук, ginger, кориандр, сливочное масло",
    "details": "Sauté onions и ginger, add carrots и cook until soft. Add broth и simmer until tender. Blend until smooth, add butter и serve hot."
  },
  {
    "name": "Картофель фри",
    "description": "Классические французские fries, жареные во фритюре.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Картофель, соль, масло для жарки",
    "details": "Cut potatoes into sticks, soak in water, then fry in hot oil until golden. Sprinkle with salt and serve hot."
  },
  {
    "name": "Борщ",
    "description": "Традиционный украинский суп с свеклой и meat.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Свекла, свинина, капуста, томатное пюре, лук",
    "details": "Boil meat, add onions, cabbage, and beets. Add tomato paste and cook until tender. Serve hot with sour cream."
  },
  {
    "name": "Тирамису",
    "description": "Итальянский десерт с mascarpone и кофе.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Mascarpone, eggs, sugar, coffee, savoiardi",
    "details": "Beat eggs и sugar until stiff, add mascarpone. Dip savoiardi in coffee, layer in dish. Chill and dust with cocoa before serving."
  },
  {
    "name": "Шашлык",
    "description": "Традиционное русское блюдо из marinated meat, grilled на углях.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Баранина, лук, специи, marinade",
    "details": "Marinate meat with onions and spices. Grill on skewers until tender. Serve with bread and vegetables."
  },
  {
    "name": "Салат из морской капусты",
    "description": "Японский салат с Wakame и sesame dressing.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Wakame, соя,芝麻油, ginger, vinegar",
    "details": "Soak wakame in water, mix with soy sauce, sesame oil, ginger, and vinegar. Serve chilled."
  },
  {
    "name": "Хумус",
    "description": "Традиционный арабский dip из чечевицы.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Чечевица, tahini, лимонный сок, чеснок, оливковое масло",
    "details": "Blend chickpeas, tahini, lemon juice, and garlic until smooth. Add olive oil and serve with pita bread."
  },
  {
    "name": "Палак панир",
    "description": "Индийское блюдо из spinach и paneer.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Spinach, paneer, onions, garlic, турmeric",
    "details": "Sauté onions and garlic, add spinach and cook until wilted. Add paneer and spices, simmer until heated through. Serve with rice."
  },
  {
    "name": "Фахитас",
    "description": "Мексиканское блюдо с grilled meat и vegetables.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Говядина, лук, болгарский перец, гвоздика, cumin",
    "details": "Marinate meat with spices, grill until done. Serve with sautéed onions and peppers, tortillas, and salsa."
  },
  {
    "name": "Рататуй",
    "description": "Французское овощное блюдо с eggplant и zucchini.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Eggplant, zucchini, томаты, лук, basil",
    "details": "Sauté onions, add eggplant and zucchini, cook until tender. Add tomatoes and herbs, simmer until flavors meld. Serve hot."
  },
  {
    "name": "Сырники",
    "description": "Русские сырные блины, pan-fried до золотистого цвета.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Творог, яйца, мука, сахар, сметана",
    "details": "Mix cottage cheese with eggs, flour, sugar, and sour cream. Form into patties and fry until golden. Serve with sour cream or honey."
  },
  {
    "name": "Конфит",
    "description": "Французское блюдо из duck legs, braised in duck fat.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Duck legs, onions, garlic, thyme, rosemary",
    "details": "Cook duck legs in duck fat with onions, garlic, and herbs until tender. Serve with potatoes or bread."
  },
  {
    "name": "Сушиroll",
    "description": "Традиционные японские роллы с raw рыбой и рисом.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Рис, нори, raw рыба, avocado, wasabi",
    "details": "Spread rice on nori, add fish, avocado, and wasabi. Roll tightly and slice into pieces. Serve with soy sauce."
  },
  {
    "name": "Гаспачо",
    "description": "Испанский холодный суп из томатов и овощей.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Томаты, огурцы, лук, чили, olive oil",
    "details": "Blend tomatoes, cucumbers, onions, and chili until smooth. Chill and serve with olive oil and bread."
  },
  {
    "name": "Каннеллони",
    "description": "Итальянские трубочки с фаршем и соусом.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Пasta, ground beef, tomato sauce, ricotta, mozzarella",
    "details": "Cook pasta, mix beef with ricotta. Fill pasta with mixture, cover with tomato sauce and mozzarella. Bake until bubbly."
  },
  {
    "name": "Табуле",
    "description": "Арабский салат с bulgur и петрушкой.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Bulgur, parsley, tomatoes, onions, lemon juice",
    "details": "Cook bulgur, mix with chopped parsley, tomatoes, and onions. Add lemon juice and olive oil, chill and serve."
  },
  {
    "name": "Брауни",
    "description": "Американский шоколадный десерт.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Шоколад, butter, sugar, eggs, flour",
    "details": "Melt chocolate and butter, add sugar and eggs. Mix in flour, pour into pan and bake until set. Serve warm with ice cream."
  },
  {
    "name": "Карри куриное",
    "description": "Традиционное индийское блюдо с курицей и специями.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Курица, куркума, карри, кокосовое молоко, овощи",
    "details": "Cook chicken with spices and coconut milk until tender. Add vegetables and simmer until done. Serve with rice."
  },
  {
    "name": "Пирог с яблоками",
    "description": "Классический американский apple pie.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Яблоки, песочное тесто, sugar, cinnamon, butter",
    "details": "Prepare pie crust, fill with sliced apples, sugar, and cinnamon. Dot with butter, cover with top crust and bake until golden. Serve with ice cream."
  },
  {
    "name": "Суп с мисо",
    "description": "Японский суп с miso и tofu.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Miso paste, tofu, seaweed, scallions, bonito flakes",
    "details": "Dissolve miso in hot water, add tofu and seaweed. Garnish with scallions and bonito flakes. Serve hot."
  },
  {
    "name": "Фалфель",
    "description": "Арабские бобы, fried до хрустящего состояния.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Chickpeas, parsley, garlic, cumin, flour",
    "details": "Grind chickpeas into paste, mix with parsley, garlic, and spices. Form into balls and fry until crispy. Serve with tahini sauce."
  },
  {
    "name": "Ризотто",
    "description": "Итальянское рисовое блюдо с белым вином и Parmesan.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Arborio rice, white wine, chicken broth, Parmesan, butter",
    "details": "Sauté rice, add wine and broth, cook until creamy. Add butter and Parmesan, stir until smooth. Serve hot."
  },
  {
    "name": "Тостадия",
    "description": "Мексиканские tortillas, topped с beans и cheese.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Tortillas, beans, cheese, salsa, avocado",
    "details": "Toast tortillas, add beans, cheese, and salsa. Top with avocado and serve hot."
  },
  {
    "name": "Конфетти из риса",
    "description": "Индийское блюдо из rиса и mixed vegetables.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Рис, овощи, curry powder, cumin, гaram masala",
    "details": "Cook rice separately, sauté vegetables with spices. Mix with rice and cook until heated through. Serve with naan."
  },
  {
    "name": "Салат греческий",
    "description": "Салат с feta, tomatoes, cucumbers, and olives.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Feta cheese, tomatoes, cucumbers, olives, feta, olive oil",
    "details": "Chop all ingredients and mix in a bowl. Dress with olive oil and lemon juice. Serve chilled."
  },
  {
    "name": "Паштет",
    "description": "Французский spread из liver и onions.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Chicken liver, onions, butter, brandy, Dijon mustard",
    "details": "Cook liver and onions until tender, blend with butter and mustard. Add brandy and serve cold with bread."
  },
  {
    "name": "Суп с солянкой",
    "description": "Русский суп с pickles и meat.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Pickles, meat, onions, garlic, tomato paste",
    "details": "Cook meat with onions and garlic, add pickles and tomato paste. Simmer until tender. Serve hot with sour cream."
  },
  {
    "name": "Тартар из лосося",
    "description": "Французское блюдо из raw salmon с соусом хорнер.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Raw salmon, onions, capers, eggs, olive oil",
    "details": "Chop salmon into chunks, mix with onions, capers, and eggs. Add olive oil and serve on toast."
  },
  {
    "name": "Паннакота",
    "description": "Итальянский десерт с mascarpone и chocolate.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Mascarpone, eggs, sugar, chocolate, cream",
    "details": "Beat eggs and sugar until stiff, add mascarpone and chocolate. Pour into dishes and chill until set. Serve cold."
  },
  {
    "name": "Суп с лапшой удон",
    "description": "Японский суп с udon noodles и meat.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Udon noodles, meat, onions, garlic, soy sauce",
    "details": "Cook noodles separately, sauté meat with onions and garlic. Add soy sauce and broth, simmer until done. Serve hot."
  },
  {
    "name": "Торт ньютон",
    "description": "Американский десерт с печеньем и карамелью.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Cookie dough, caramel, chocolate, butter, eggs",
    "details": "Bake cookie dough, add caramel and chocolate layers. Chill and serve cold."
  },
  {
    "name": "Салат из крабовых палочек",
    "description": "Русский салат с крабовыми палочками и майонезом.",
    "image": "https://via.placeholder.com/300x150",
    "ingridients": "Крабовые палочки, огурцы, яйца, майонез",
    "details": "Mix all ingredients and chill before serving. Garnish with parsley."
  }
];

  get filteredRecipes() {
    if (this.searchType === 'name') {
      return this.recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        recipe.description.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else if (this.searchType === 'ingredients') {
      return this.recipes.filter(recipe =>
        recipe.ingridients.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    return this.recipes;
  }

  selectRecipe(recipe: any) {
    this.selectedRecipe = recipe;
  }

  deselectRecipe() {
    this.selectedRecipe = null;
  }

  convertNewlinesToBreaks(text: string): string {
    return text.replace(/\n/g, '<br>');
  }

  toggleSearchType() {
    this.searchType = this.searchType === 'name' ? 'ingredients' : 'name';
  }

}
