interface Car {
    brand: string;
    model: string;
    year: number;
    price: number;
    electric: boolean;
    colors: string[];
    specific: {
        transmission: string;
        horsepower: number;
    }
}

interface CarsData {
    title: string;
    available: boolean;
    cars: Car[];
    statistics: {
        totalModels: number;
        averagePrice: number;
        electricCount: number;
    };
}

function displayData(data: CarsData): void {
    const output = document.getElementById('output') as HTMLDivElement;
    
    let html = `<h2>${data.title}</h2>`;
    html += `<p><strong>Доступно:</strong> ${data.available ? 'Да' : 'Нет'}</p>`;
    
    html += '<h3>Автомобили:</h3><ul>';
    data.cars.forEach(car => {
        html += `
        <li>
            <strong>${car.brand} ${car.model} (${car.year})</strong><br>
            Цена: $${car.price.toLocaleString()}<br>
            Тип: ${car.electric ? 'Электромобиль' : 'Бензиновый'}<br>
            Мощность (л.с.): ${car.specific.horsepower}<br>
            Трансмиссия: ${car.specific.transmission}<br>
            Доступные цвета: ${car.colors.join(', ')}
        </li>`;
    });
    html += '</ul>';
    
    html += '<h3>Статистика:</h3>';
    html += `<p>Всего моделей: ${data.statistics.totalModels}</p>`;
    html += `<p>Средняя цена: $${data.statistics.averagePrice.toLocaleString()}</p>`;
    html += `<p>Электромобилей: ${data.statistics.electricCount}</p>`;
    
    output.innerHTML = html;
    console.log('Данные об автомобилях:', data);
}

function handleError(error: string): void {
    const output = document.getElementById('output') as HTMLDivElement;
    output.innerHTML = `<div style="color: red;"><strong>Ошибка:</strong> ${error}</div>`;
    console.error('Произошла ошибка:', error);
    alert(`Ошибка: ${error}`);
}

function loadData(url: string, successCallback: (data: CarsData) => void, errorCallback: (error: string) => void): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            if (xhr.response) {
                successCallback(xhr.response as CarsData);
            } else {
                errorCallback('Неверный формат данных');
            }
        } else {
            errorCallback(`HTTP ошибка: ${xhr.status} ${xhr.statusText}`);
        }
    };

    xhr.onerror = () => {
        errorCallback('Ошибка сети при запросе данных');
    };

    xhr.send();
}

function setupEventListeners(): void {
    document.getElementById('loadData')?.addEventListener('click', () => {
        loadData('./cars.json', displayData, handleError);
    });

    document.getElementById('simulateError')?.addEventListener('click', () => {
        // Симуляция ошибки в данных
        const badData = {
            title: "Ошибочные данные",
            cars: "Это не массив",
            statistics: null
        };
        try {
            displayData(badData as unknown as CarsData);
        } catch (e) {
            handleError(`Ошибка обработки данных: ${e instanceof Error ? e.message : String(e)}`);
        }
    });

    document.getElementById('wrongUrl')?.addEventListener('click', () => {
        loadData('./nonexistent.json', displayData, handleError);
    });

    document.getElementById('serverError')?.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './cars.json', true);
        xhr.onload = function() {
            if (this.status >= 400) {
                handleError(`Сервер вернул ошибку: ${this.status} ${this.statusText}`);
            }
        };
        xhr.onerror = function() {
            handleError('Ошибка сети при запросе данных');
        };
        
        // Имитируем ответ с ошибкой
        setTimeout(() => {
            Object.defineProperty(xhr, 'status', { value: 500 });
            Object.defineProperty(xhr, 'statusText', { value: 'Internal Server Error' });
            xhr.onload?.call(xhr, new ProgressEvent('load'));
        }, 500);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    console.log('Приложение инициализировано. Нажмите кнопки для взаимодействия.');
});