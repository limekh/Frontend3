import { Component, 
        OnInit, 
        OnChanges, 
        DoCheck, 
        AfterContentInit, 
        AfterContentChecked, 
        AfterViewInit, 
        AfterViewChecked, 
        OnDestroy,
        SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements 
  OnInit, 
  OnChanges, 
  DoCheck, 
  AfterContentInit, 
  AfterContentChecked, 
  AfterViewInit, 
  AfterViewChecked, 
  OnDestroy {
  
  title = 'digital-departament-application';

  greeting: string = "";
  logMessages: string[] = [];

  constructor() {
    this.log('Constructor вызван');
  }

  // 1. Вызывается при первой инициализации компонента
  ngOnInit(): void {
    this.log('ngOnInit: Компонент инициализирован');
  }

  // 2. Вызывается при изменении входных свойств (если они есть)
  ngOnChanges(changes: SimpleChanges): void {
    this.log(`ngOnChanges: Обнаружены изменения: ${JSON.stringify(changes)}`);
  }

  // 3. Вызывается при каждой проверке изменений
  ngDoCheck(): void {
    this.log('ngDoCheck: Проверка изменений');
  }

  // 4. Вызывается после инициализации содержимого
  ngAfterContentInit(): void {
    this.log('ngAfterContentInit: Контент инициализирован');
  }

  // 5. Вызывается после каждой проверки содержимого
  ngAfterContentChecked(): void {
    this.log('ngAfterContentChecked: Проверка контента завершена');
  }

  // 6. Вызывается после инициализации представления
  ngAfterViewInit(): void {
    this.log('ngAfterViewInit: Представление инициализировано');
  }

  // 7. Вызывается после каждой проверки представления
  ngAfterViewChecked(): void {
    this.log('ngAfterViewChecked: Проверка представления завершена');
  }

  // 8. Вызывается перед уничтожением компонента
  ngOnDestroy(): void {
    this.log('ngOnDestroy: Компонент будет уничтожен');
  }

  onSayHi(): void {
    alert("Привет, " + this.greeting);
    this.log(`Пользователь ввел: ${this.greeting}`);
  }

  private log(message: string): void {
    this.logMessages.push(message);
    console.log(message);
  }
}
