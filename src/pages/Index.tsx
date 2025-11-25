import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Candle {
  id: number;
  name: string;
  price: number;
  image: string;
  scent: string;
  description: string;
  composition: string;
  burnTime: string;
}

interface CartItem extends Candle {
  quantity: number;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

const candles: Candle[] = [
  {
    id: 1,
    name: 'Лавандовое утро',
    price: 1890,
    image: 'https://cdn.poehali.dev/projects/204f4f64-3b78-4bfe-ba08-5cbcf69b3d3f/files/41eb0d7c-2d9d-458c-a8dc-1c5010795953.jpg',
    scent: 'цветочный',
    description: 'Нежный аромат для спокойного начала дня',
    composition: 'Верхние ноты: лаванда, бергамот. Сердце: жасмин, герань. База: кедр, мускус',
    burnTime: '45-50 часов'
  },
  {
    id: 2,
    name: 'Эвкалиптовый лес',
    price: 2190,
    image: 'https://cdn.poehali.dev/projects/204f4f64-3b78-4bfe-ba08-5cbcf69b3d3f/files/8f1cba23-e7a1-4c61-a3cb-397d93b8c399.jpg',
    scent: 'травяной',
    description: 'Освежающий аромат для концентрации',
    composition: 'Верхние ноты: эвкалипт, мята. Сердце: шалфей, розмарин. База: пачули, сандал',
    burnTime: '40-45 часов'
  },
  {
    id: 3,
    name: 'Ванильный сад',
    price: 1790,
    image: 'https://cdn.poehali.dev/projects/204f4f64-3b78-4bfe-ba08-5cbcf69b3d3f/files/f067b990-e68c-4af8-8143-b6a5b76d8aab.jpg',
    scent: 'сладкий',
    description: 'Теплый аромат для уютного вечера',
    composition: 'Верхние ноты: ваниль, карамель. Сердце: жасмин, иланг-иланг. База: амбра, тонка бобы',
    burnTime: '50-55 часов'
  },
  {
    id: 4,
    name: 'Морской бриз',
    price: 2090,
    image: 'https://cdn.poehali.dev/projects/204f4f64-3b78-4bfe-ba08-5cbcf69b3d3f/files/41eb0d7c-2d9d-458c-a8dc-1c5010795953.jpg',
    scent: 'свежий',
    description: 'Прохладный аромат морского побережья',
    composition: 'Верхние ноты: морская соль, цитрус. Сердце: лилия, фрезия. База: амбра, дрифтвуд',
    burnTime: '45-50 часов'
  },
  {
    id: 5,
    name: 'Пряный имбирь',
    price: 1990,
    image: 'https://cdn.poehali.dev/projects/204f4f64-3b78-4bfe-ba08-5cbcf69b3d3f/files/8f1cba23-e7a1-4c61-a3cb-397d93b8c399.jpg',
    scent: 'пряный',
    description: 'Согревающий аромат с восточными нотами',
    composition: 'Верхние ноты: имбирь, корица. Сердце: гвоздика, кардамон. База: ваниль, пачули',
    burnTime: '40-45 часов'
  },
  {
    id: 6,
    name: 'Розовый сад',
    price: 2290,
    image: 'https://cdn.poehali.dev/projects/204f4f64-3b78-4bfe-ba08-5cbcf69b3d3f/files/f067b990-e68c-4af8-8143-b6a5b76d8aab.jpg',
    scent: 'цветочный',
    description: 'Элегантный аромат дамасской розы',
    composition: 'Верхние ноты: роза, пион. Сердце: герань, фиалка. База: мускус, сандал',
    burnTime: '50-55 часов'
  }
];

const reviews: Review[] = [
  {
    id: 1,
    author: 'Анна',
    rating: 5,
    text: 'Лавандовое утро — мой любимый аромат! Горит ровно, запах держится долго.',
    date: '15 ноября 2024'
  },
  {
    id: 2,
    author: 'Мария',
    rating: 5,
    text: 'Эвкалиптовый лес помогает сосредоточиться на работе. Очень рекомендую!',
    date: '10 ноября 2024'
  },
  {
    id: 3,
    author: 'Елена',
    rating: 4,
    text: 'Ванильный сад создаёт уютную атмосферу. Немного сладковат, но это дело вкуса.',
    date: '5 ноября 2024'
  }
];

const Index = () => {
  const [selectedScent, setSelectedScent] = useState<string>('все');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCandle, setSelectedCandle] = useState<Candle | null>(null);

  const scents = ['все', 'цветочный', 'травяной', 'сладкий', 'свежий', 'пряный'];

  const filteredCandles = selectedScent === 'все' 
    ? candles 
    : candles.filter(candle => candle.scent === selectedScent);

  const addToCart = (candle: Candle) => {
    const existingItem = cart.find(item => item.id === candle.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === candle.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...candle, quantity: 1 }]);
    }
    toast.success('Добавлено в корзину');
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            🕯️ Lumière
          </h1>
          
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="hidden md:flex items-center gap-2">
                  <Icon name="Sparkles" size={18} />
                  Уход
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-3xl">Уход за свечами</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Scissors" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Обрезайте фитиль</h3>
                        <p className="text-muted-foreground">Перед каждым зажиганием обрезайте фитиль до 5 мм. Это обеспечит ровное горение и предотвратит образование сажи.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Clock" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Первое горение</h3>
                        <p className="text-muted-foreground">При первом использовании дайте воску расплавиться по всей поверхности (2-3 часа). Это предотвратит образование тоннеля.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Flame" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Время горения</h3>
                        <p className="text-muted-foreground">Не жгите свечу дольше 4 часов подряд. Давайте ей остыть минимум 2 часа между использованиями.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Snowflake" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Хранение</h3>
                        <p className="text-muted-foreground">Храните свечи в прохладном месте вдали от прямых солнечных лучей. Накрывайте крышкой для сохранения аромата.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="ShieldCheck" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Безопасность</h3>
                        <p className="text-muted-foreground">Никогда не оставляйте горящую свечу без присмотра. Ставьте на ровную жаропрочную поверхность вдали от сквозняков.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cartItemsCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="text-2xl">Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <Card key={item.id}>
                        <CardContent className="p-4 flex gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7 ml-auto"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Итого:</span>
                      <span>{totalPrice} ₽</span>
                    </div>
                    <Button className="w-full" size="lg">
                      Оформить заказ
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Ароматные свечи ручной работы
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Создайте идеальную атмосферу с нашими натуральными свечами из соевого воска
          </p>
        </section>

        <section className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {scents.map(scent => (
              <Button
                key={scent}
                variant={selectedScent === scent ? 'default' : 'outline'}
                onClick={() => setSelectedScent(scent)}
                className="capitalize"
              >
                {scent}
              </Button>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredCandles.map((candle, index) => (
            <Card 
              key={candle.id} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in cursor-pointer group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div onClick={() => setSelectedCandle(candle)}>
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={candle.image} 
                        alt={candle.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-2xl font-semibold">{candle.name}</h3>
                        <Badge variant="secondary" className="capitalize">
                          {candle.scent}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{candle.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{candle.price} ₽</span>
                        <Button 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(candle);
                          }}
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-3xl">{candle.name}</DialogTitle>
                  </DialogHeader>
                  <div className="grid md:grid-cols-2 gap-6">
                    <img 
                      src={candle.image} 
                      alt={candle.name}
                      className="w-full rounded-lg"
                    />
                    <div className="space-y-4">
                      <div>
                        <Badge variant="secondary" className="capitalize mb-3">
                          {candle.scent}
                        </Badge>
                        <p className="text-muted-foreground">{candle.description}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">Композиция аромата</h4>
                        <p className="text-sm text-muted-foreground">{candle.composition}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Время горения</h4>
                        <p className="text-sm text-muted-foreground">{candle.burnTime}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Уход за свечой</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Обрезайте фитиль до 5 мм перед каждым зажиганием</li>
                          <li>• Первое горение не менее 2-3 часов</li>
                          <li>• Не жгите дольше 4 часов подряд</li>
                          <li>• Храните в прохладном месте</li>
                        </ul>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-primary">{candle.price} ₽</span>
                        <Button size="lg" onClick={() => addToCart(candle)}>
                          <Icon name="ShoppingCart" size={20} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </Card>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Отзывы покупателей</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">{review.author}</span>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3">{review.text}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-muted rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">О нашей мануфактуре</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Мы создаём свечи из 100% натурального соевого воска с эфирными маслами высшего качества. 
            Каждая свеча изготавливается вручную с любовью и заботой о вашем комфорте.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <Icon name="Leaf" size={32} className="mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-xl mb-2">Натуральный состав</h3>
              <p className="text-sm text-muted-foreground">Соевый воск и эфирные масла</p>
            </div>
            <div>
              <Icon name="Heart" size={32} className="mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-xl mb-2">Ручная работа</h3>
              <p className="text-sm text-muted-foreground">Каждая свеча уникальна</p>
            </div>
            <div>
              <Icon name="Clock" size={32} className="mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-xl mb-2">Долгое горение</h3>
              <p className="text-sm text-muted-foreground">До 55 часов аромата</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2024 Lumière. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;