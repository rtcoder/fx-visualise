import {rysujWykres} from './js/draw.js';

// Pobierz wartość x od użytkownika (np. za pomocą input)
const inputExpression = 'x^2-4x+9'; // Przykładowe wyrażenie matematyczne
const expressions = [
    {
        color: 'blue',
        expr: 'x^2-4x+9',
        compiledExpression:null
    },
];

// Stwórz funkcję, która będzie obliczać wartość wyrażenia dla określonego x
function obliczWartoscWyrazenia(wyrazenie, x) {
    try {
        const parsedExpression = math.parse(wyrazenie);
        const compiledExpression = parsedExpression.compile();
        return compiledExpression.evaluate({x: x});
    } catch (error) {
        console.error('Błąd analizy wyrażenia:', error);
        return NaN; // W przypadku błędu zwracamy NaN
    }
}


const canvas = document.getElementById('wykres');
const context = canvas.getContext('2d');
resize();

let skalaX = 20;
let skalaY = 20;

let x0 = canvas.width / 2;
let y0 = canvas.height / 2;

let mouseX;
let mouseY;

let zmianaSkali = false;

function f(x) {
    return obliczWartoscWyrazenia(inputExpression, x);
}

// Funkcja obsługująca zdarzenie przesunięcia myszy
function onMouseMove(event) {
    if (zmianaSkali) {
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;

        if (event.shiftKey) { // Sprawdzamy, czy jest wciśnięty klawisz Shift
            x0 += deltaX;
            y0 += deltaY;
        } else {
            skalaX += deltaX / 10;
            skalaY += deltaY / 10;
            if (skalaX < 2) {
                skalaX = 2;
            }
            if (skalaY < 2) {
                skalaY = 2;
            }
        }

        mouseX = event.clientX;
        mouseY = event.clientY;
        rysujWykres(context, canvas, skalaX, skalaY, x0, y0, f);
    }
}

// Funkcja obsługująca zdarzenie naciśnięcia myszy
function onMouseDown(event) {
    zmianaSkali = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
}

// Funkcja obsługująca zdarzenie zwolnienia myszy
function onMouseUp() {
    zmianaSkali = false;
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Dodaj obsługę myszy do elementu canvas
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
window.addEventListener('resize', () => {
    resize();
    rysujWykres(context, canvas, skalaX, skalaY, x0, y0, f);
});
// Inicjalizacja rysowania wykresu
rysujWykres(context, canvas, skalaX, skalaY, x0, y0, f);

