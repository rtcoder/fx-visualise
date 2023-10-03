import {compileExpressions, validateExpression} from './calculate.js';
import {rysujWykres} from './draw.js';
import {app} from './main.js';
import {generateLegend, randomHexColor} from './utils.js';

function onMouseMove(event) {
    if (app.scaleChange) {
        const deltaX = event.clientX - app.mouseX;
        const deltaY = event.clientY - app.mouseY;

        if (!event.shiftKey) { // Sprawdzamy, czy jest wciśnięty klawisz Shift
            app.x0 += deltaX;
            app.y0 += deltaY;
        } else {
            app.scaleX += deltaX / 10;
            app.scaleY += deltaY / 10;
            if (app.scaleX < 2) {
                app.scaleX = 2;
            }
            if (app.scaleY < 2) {
                app.scaleY = 2;
            }
        }

        app.mouseX = event.clientX;
        app.mouseY = event.clientY;
        rysujWykres();
    }
}

// Funkcja obsługująca zdarzenie naciśnięcia myszy
function onMouseDown(event) {
    app.scaleChange = true;
    app.mouseX = event.clientX;
    app.mouseY = event.clientY;
}

// Funkcja obsługująca zdarzenie zwolnienia myszy
function onMouseUp() {
    app.scaleChange = false;
}

export function resize() {
    app.canvas.width = window.innerWidth;
    app.canvas.height = window.innerHeight;
}

function addNewExpression(expression) {
    app.expressions.push({
        isVisible: true,
        expr: expression,
        color: randomHexColor(),
        compiledExpression: null,
    });
    compileExpressions();
    rysujWykres();
    generateLegend();
}

function transformExpression(expression) {
    return expression.replaceAll('π', 'PI');
}

export function initEvents() {
    window.addEventListener('mousemove', onMouseMove);
    app.canvas.addEventListener('mousedown', onMouseDown);
    app.canvas.addEventListener('mouseup', onMouseUp);

    const addNew = () => {
        const expression = transformExpression(expressionInput.value);
        if (!validateExpression(expression)) {
            alert('Invalid expression: ' + expressionInput.value);
            return;
        }
        addNewExpression(expression);
        expressionInput.value = '';
    };

    const expressionInput = document.querySelector('.expression-input');
    expressionInput.addEventListener('change', addNew);
    document.querySelector('.add').addEventListener('click', addNew);
    window.addEventListener('resize', () => {
        resize();
        rysujWykres();
    });
}
