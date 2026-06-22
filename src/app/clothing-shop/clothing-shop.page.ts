import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; // Для смены языка

@Component({
  selector: 'app-clothing-shop',
  templateUrl: './clothing-shop.page.html',
  styleUrls: ['./clothing-shop.page.scss'],
})
export class ClothingShopPage {
  // МАССИВ ТОВАРОВ (названия, цены, цвета, категории, размеры на 4 языках)
  products = [
    { id: 1, name: 'Футболка', nameEn: 'T-shirt', nameFr: 'T-shirt', nameIt: 'Maglietta', price: 2990, color: '#FF6B6B', category: 'Футболки', categoryEn: 'T-shirts', categoryFr: 'T-shirts', categoryIt: 'Magliette', sizes: ['S','M','L','XL'] },
    { id: 2, name: 'Джинсы', nameEn: 'Jeans', nameFr: 'Jeans', nameIt: 'Jeans', price: 4990, color: '#4ECDC4', category: 'Джинсы', categoryEn: 'Jeans', categoryFr: 'Jeans', categoryIt: 'Jeans', sizes: ['28','30','32','34'] },
    { id: 3, name: 'Куртка', nameEn: 'Jacket', nameFr: 'Veste', nameIt: 'Giacca', price: 12990, color: '#45B7D1', category: 'Куртки', categoryEn: 'Jackets', categoryFr: 'Vestes', categoryIt: 'Giacche', sizes: ['S','M','L','XL'] },
    { id: 4, name: 'Платье', nameEn: 'Dress', nameFr: 'Robe', nameIt: 'Vestito', price: 3990, color: '#96CEB4', category: 'Платья', categoryEn: 'Dresses', categoryFr: 'Robes', categoryIt: 'Vestiti', sizes: ['XS','S','M','L'] },
    { id: 5, name: 'Кроссовки', nameEn: 'Sneakers', nameFr: 'Baskets', nameIt: 'Scarpe da ginnastica', price: 6990, color: '#FFEAA7', category: 'Обувь', categoryEn: 'Shoes', categoryFr: 'Chaussures', categoryIt: 'Scarpe', sizes: ['36','37','38','39','40'] },
    { id: 6, name: 'Худи', nameEn: 'Hoodie', nameFr: 'Hoodie', nameIt: 'Felpa con cappuccio', price: 5490, color: '#DFE6E9', category: 'Куртки', categoryEn: 'Jackets', categoryFr: 'Vestes', categoryIt: 'Giacche', sizes: ['S','M','L','XL'] },
    { id: 7, name: 'Шорты', nameEn: 'Shorts', nameFr: 'Short', nameIt: 'Pantaloncini', price: 1990, color: '#FDCB6E', category: 'Футболки', categoryEn: 'T-shirts', categoryFr: 'T-shirts', categoryIt: 'Magliette', sizes: ['S','M','L','XL'] },
    { id: 8, name: 'Свитер', nameEn: 'Sweater', nameFr: 'Pull', nameIt: 'Maglione', price: 4490, color: '#E17055', category: 'Куртки', categoryEn: 'Jackets', categoryFr: 'Vestes', categoryIt: 'Giacche', sizes: ['S','M','L','XL'] }
  ];
  
  cartItems: any[] = []; // ТОВАРЫ В КОРЗИНЕ
  selectedCategory = 'all'; // ВЫБРАННАЯ КАТЕГОРИЯ
  showCart = false; // ПОКАЗЫВАТЬ КОРЗИНУ (true/false)
  
  // КАТЕГОРИИ НА 4 ЯЗЫКАХ
  categories = ['all', 'Футболки', 'Джинсы', 'Куртки', 'Платья', 'Обувь'];
  categoriesEn = ['all', 'T-shirts', 'Jeans', 'Jackets', 'Dresses', 'Shoes'];
  categoriesFr = ['all', 'T-shirts', 'Jeans', 'Vestes', 'Robes', 'Chaussures'];
  categoriesIt = ['all', 'Magliette', 'Jeans', 'Giacche', 'Vestiti', 'Scarpe'];

  constructor(public translate: TranslateService) { // ПОДКЛЮЧАЕМ ПЕРЕВОДЫ
    const saved = localStorage.getItem('cart'); // ЗАГРУЖАЕМ КОРЗИНУ ИЗ ХРАНИЛИЩА
    if (saved) this.cartItems = JSON.parse(saved);
  }

  // ВОЗВРАЩАЕТ НАЗВАНИЕ КАТЕГОРИИ НА ТЕКУЩЕМ ЯЗЫКЕ
  getCategoryName(cat: string): string {
    const lang = this.translate.currentLang;
    const index = this.categories.indexOf(cat);
    
    if (lang === 'en') return index !== -1 ? this.categoriesEn[index] : cat;
    if (lang === 'fr') return index !== -1 ? this.categoriesFr[index] : cat;
    if (lang === 'it') return index !== -1 ? this.categoriesIt[index] : cat;
    return cat;
  }

  // ВОЗВРАЩАЕТ НАЗВАНИЕ ТОВАРА НА ТЕКУЩЕМ ЯЗЫКЕ
  getProductName(product: any): string {
    const lang = this.translate.currentLang;
    if (lang === 'en') return product.nameEn;
    if (lang === 'fr') return product.nameFr;
    if (lang === 'it') return product.nameIt;
    return product.name;
  }

  // МЕНЯЕТ ЯЗЫК ВО ВСЕМ ПРИЛОЖЕНИИ
  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  // ФИЛЬТРУЕТ ТОВАРЫ ПО КАТЕГОРИИ
  get filtered() {
    if (this.selectedCategory === 'all') return this.products;
    return this.products.filter(p => p.category === this.selectedCategory);
  }

  // ОБЩАЯ СТОИМОСТЬ КОРЗИНЫ
  get total() {
    return this.cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  }

  // КОЛИЧЕСТВО ТОВАРОВ В КОРЗИНЕ
  get count() {
    return this.cartItems.reduce((s, i) => s + i.quantity, 0);
  }

  // ДОБАВЛЯЕТ ТОВАР В КОРЗИНУ
  add(product: any, size: string) {
    if (!size) return;
    const existing = this.cartItems.find(i => i.product.id === product.id && i.selectedSize === size);
    existing ? existing.quantity++ : this.cartItems.push({ product: {...product}, quantity: 1, selectedSize: size });
    this.save();
    
    // СООБЩЕНИЕ НА ТЕКУЩЕМ ЯЗЫКЕ
    let msg = '';
    const lang = this.translate.currentLang;
    if (lang === 'ru') msg = `${this.getProductName(product)} (${size}) добавлен в корзину`;
    else if (lang === 'en') msg = `${this.getProductName(product)} (${size}) added to cart`;
    else if (lang === 'fr') msg = `${this.getProductName(product)} (${size}) ajouté au panier`;
    else msg = `${this.getProductName(product)} (${size}) aggiunto al carrello`;
    alert(msg);
  }

  // ИЗМЕНЯЕТ КОЛИЧЕСТВО ТОВАРА (+1 или -1)
  update(item: any, delta: number) {
    const newQty = item.quantity + delta;
    newQty > 0 ? item.quantity = newQty : this.remove(item);
    this.save();
  }

  // УДАЛЯЕТ ТОВАР ИЗ КОРЗИНЫ
  remove(item: any) {
    this.cartItems = this.cartItems.filter(i => i !== item);
    this.save();
  }

  // ОЧИЩАЕТ КОРЗИНУ
  clear() {
    this.cartItems = [];
    this.save();
  }

  // ОФОРМЛЕНИЕ ЗАКАЗА
  checkout() {
    if (!this.cartItems.length) {
      let msg = '';
      const lang = this.translate.currentLang;
      if (lang === 'ru') msg = 'Корзина пуста';
      else if (lang === 'en') msg = 'Cart is empty';
      else if (lang === 'fr') msg = 'Le panier est vide';
      else msg = 'Il carrello è vuoto';
      return alert(msg);
    }
    
    let msg = '';
    const lang = this.translate.currentLang;
    if (lang === 'ru') msg = `Заказ оформлен! Сумма: ${this.format(this.total)} ₽`;
    else if (lang === 'en') msg = `Order placed! Total: ${this.format(this.total)} ₽`;
    else if (lang === 'fr') msg = `Commande passée! Total: ${this.format(this.total)} ₽`;
    else msg = `Ordine effettuato! Totale: ${this.format(this.total)} ₽`;
    
    alert(msg);
    this.clear();
    this.showCart = false;
  }

  // ФОРМАТИРУЕТ ЦЕНУ (пробелы между разрядами)
  format(p: number) { return p.toLocaleString('ru-RU'); }
  
  // СОХРАНЯЕТ КОРЗИНУ В localStorage
  save() { localStorage.setItem('cart', JSON.stringify(this.cartItems)); }
}