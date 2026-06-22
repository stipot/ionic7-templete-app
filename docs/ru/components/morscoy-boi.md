Классическое поле	
Поле 10×10, стандартный набор кораблей

Пошаговый режим
Чередование ходов игрока и компьютера

Размещение флота
Ручная расстановка с предпросмотром и валидацией

Суперспособности
3 уникальные способности, выдаются за промахи

Умный ИИ
Компьютер использует тактику и суперспособности

Статус-бар
Вся обратная связь через statusMessage (без спама алертов)

interface Cell {
  x: number;                    // Координата X (0-9)
  y: number;                    // Координата Y (0-9)
  hasShip: boolean;             // Есть ли корабль
  isHit: boolean;               // Попадание (корабль подбит)
  isMiss: boolean;              // Промах (вода)
  isRevealed: boolean;          // Клетка раскрыта (была атакована/просканирована)
  isSuperPower?: boolean;       // [Опц.] Помечена суперспособностью
  superPowerType?: SuperPowerType; // [Опц.] Тип способности для визуализации
}

export type SuperPowerType = 'explosion' | 'radar' | 'repair';

explosion
Урон по области 3×3 клетки

radar	
Показывает 4 клетки, не атакует

repair
Полностью чинит повреждённый корабль

SuperPower — конфигурация способности
interface SuperPower {
  id: string;           // Уникальный идентификатор
  type: SuperPowerType; // Тип способности
  name: string;         // Отображаемое имя
  icon: string;         // Иконка Ionic
  color: string;        // Цвет для UI
  description: string;  // Описание для подсказок
  available: boolean;   // Готова к использованию
}

ShipConfig — конфигурация кораблей
interface ShipConfig {
  size: number;   // Длина корабля (1-4)
  count: number;  // Сколько таких кораблей нужно разместить
  placed: number; // Сколько уже размещено
}

Стандартный флот:
[
  { size: 4, count: 1, placed: 0 }, // 1 линкор (4 клетки)
  { size: 3, count: 2, placed: 0 }, // 2 крейсера (3 клетки)
  { size: 2, count: 3, placed: 0 }, // 3 эсминца (2 клетки)
  { size: 1, count: 4, placed: 0 }  // 4 подлодки (1 клетка)
]

Свойства компонента
Игровое состояние
Свойство
Тип	
По умолчанию
Описание

playerBoard
Board
[]
Поле игрока (10×10 ячеек)

computerBoard
Board
[]
Поле компьютера (10×10 ячеек)

isPlayerTurn
boolean
true
Чей сейчас ход

gameOver	
boolean	
false
Завершена ли игра

statusMessage
string
"Расставьте корабли..."	
Сообщение для отображения в UI


Режим размещения
Свойство	
Тип	
Описание

isPlacementMode	
boolean	
Активен ли режим расстановки кораблей

selectedShipSize	
number | null
Выбранный размер корабля для размещения

isHorizontal	
boolean	
Ориентация корабля при размещении

shipsToPlace	
ShipConfig[]	
Конфигурация флота для размещения





Система суперспособностей
Свойство
Тип
Описание

enableSuperPowers
boolean
Включены ли суперспособности в этой игре

playerSuperPowers
SuperPower[]
Доступные способности игрока

computerSuperPowers
SuperPower[]
Доступные способности компьютера

playerMissCount
number
Счётчик промахов игрока

computerMissCount
number
Счётчик промахов компьютера

playerLastPowerAtMisses
number
Последний порог промахов для выдачи способности игроку

computerLastPowerAtMisses
number
Последний порог промахов для выдачи способности компьютеру

selectedPowerForActivation
SuperPower | null
Выбранная для активации способность

isPowerActivationMode
boolean
Режим выбора цели для способности


Основные методы
Инициализация

// Создание пустого поля 10×10
createEmptyBoard(): Board

// Старт новой игры
startNewGame(withSuperPowers: boolean = false): void
// withSuperPowers — включить ли систему суперспособностей

// Выбор режима игры (с алертом)
async selectGameMode(): Promise<void>



Размещение кораблей
// Проверка возможности размещения
canPlaceShip(
  board: Board, 
  x: number, 
  y: number, 
  size: number, 
  horizontal: boolean
): boolean
// Возвращает true, если корабль можно разместить (без перекрытий и с отступами)

// Размещение корабля на поле
placeShip(
  board: Board, 
  x: number, 
  y: number, 
  size: number, 
  horizontal: boolean
): void

// Обработка клика по ячейке при размещении
handlePlayerCellClick(cell: Cell): void

// Получение ячеек для предпросмотра размещения
getPreviewCells(x: number, y: number): Cell[]

// Проверка: все ли корабли размещены
isPlacementComplete(): boolean

// Завершение размещения и переход к бою
finishPlacement(): void


Игровой процесс
// Обработка клика по ячейке во время игры
handleCellClick(cell: Cell, boardType: 'player' | 'computer'): void

// Ход компьютера (автоматический)
computerTurn(): void

// Проверка условия победы
checkWin(board: Board, winner: string): void
// winner: 'player' | 'computer'


Суперспособности
// Генерация случайной способности
getRandomSuperPower(): SuperPower

// Проверка и выдача способности за промахи
checkForSuperPower(isPlayer: boolean): void
// Выдаёт способность каждые 10 промахов (без повторной выдачи за тот же порог)

// Активация способности игроком
activateSuperPower(power: SuperPower, targetCell?: Cell): void

//  Взрыв 3×3
activateExplosion(centerCell: Cell, board: Board, isPlayer: boolean): void
// Наносит урон, считает промахи для выдачи новых способностей

//  Радар 2×2
activateRadar(startCell: Cell, board: Board, isPlayer: boolean): void
// Только разведка: не наносит урон, не считает промахи, помечает клетки для визуализации

//  Ремонт
activateRepair(isPlayer: boolean): void
// Восстанавливает isHit=false, isRevealed=false — корабль снова можно атаковать



Вспомогательные методы для шаблона
// Проверка: валидна ли цель для способности
isValidPowerTarget(cell: Cell, powerType: SuperPowerType): boolean

// Отмена активации способности
cancelPowerActivation(): void

// Получение иконки для способности
getSuperPowerIcon(type: SuperPowerType | undefined): string

// Получение цвета для способности
getSuperPowerColor(type: SuperPowerType | undefined): string

// Показать справку по способностям
async showPowersInfo(): Promise<void>


Система суперспособностей
Получение способностей

Принцип: каждые 10 промахов → 1 случайная способность

Игрок:
  • Промахи считаются в playerMissCount
  • При достижении 10, 20, 30... промахов выдаётся способность
  • Уведомление показывается в statusMessage

Компьютер:
  • Промахи считаются в computerMissCount
  • Получает способности молча (без уведомлений)
  • Использует их автоматически при возможности



Использование способностей

// Логика:
1. Игрок выбирает способность → выбирает центр области 3×3
2. Все 9 клеток раскрываются:
   • Если корабль и не был подбит → isHit = true
   • Если вода → isMiss = true, счётчик промахов +1
3. Промахи учитываются для выдачи новых способностей
4. После активации ход переходит к противнику (если не победа)

// Логика:
1. Игрок выбирает способность → выбирает верхний левый угол области 2×2
2. Все 4 клетки раскрываются:
   • Если корабль → isSuperPower = true, superPowerType = 'radar'
   • Если вода → просто isRevealed = true
3. ❗ Промахи НЕ считаются, способность НЕ выдаётся за радар
4. Клетки с isSuperPower='radar' можно атаковать в следующий раз
5. При атаке такой клетки маркер радара снимается

// Логика:
1. Игрок выбирает способность → автоматически находит первый повреждённый корабль
2. Все клетки корабля восстанавливаются:
   • isHit = false
   • isRevealed = false  // ❗ Ключевое: корабль снова можно атаковать!
   • isMiss = false
   • isSuperPower = false
3. Если все корабли целы → способность возвращается в доступные
4. После ремонта ход НЕ передаётся (игрок продолжает ходить)

Поведение компьютера

computerTurn(): void {
  // 1. Приоритет: использовать суперспособность, если доступна
  if (computerSuperPowers.some(p => p.available)) {
    computerUseSuperPower(availablePower);
    return;
  }
  
  // 2. Тактический выстрел: вокруг подбитых клеток
  // 3. Случайный выстрел: если тактика не дала результата
}

ИИ компьютера

1. Клетки рядом с уже подбитыми (поиск добивания)
2. Клетки, помеченные радаром (если есть)
3. Случайные нераскрытые клетки


Передача хода

// После способности (кроме ремонта):
if (power.type !== 'repair') {
  this.isPlayerTurn = true;
  setTimeout(() => this.statusMessage = "Ваш ход!", 1500);
} 
// После ремонта — компьютер продолжает ход
else {
  setTimeout(() => this.computerTurn(), 800);
}

ТОО
1.Улучшить логику компьютера
2.Сделать сервер морского боя, чтобы студенты могли играть между с собой
3.Графический дизайн морского боя