import {app, generateLegend} from '../main.js';
import {randomHexColor} from '../utils.js';
import {compileExpressions} from './calculate.js';
import {rysujWykres} from './draw.js';

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

export function initEvents() {
    app.canvas.addEventListener('mousemove', onMouseMove);
    app.canvas.addEventListener('mousedown', onMouseDown);
    app.canvas.addEventListener('mouseup', onMouseUp);
    document.querySelector('.expression-input').addEventListener('change', e => {
        app.expressions.push({
            expr: e.target.value,
            color: randomHexColor(),
            compiledExpression: null,
        });
        e.target.value = '';
        compileExpressions();
        rysujWykres();
        generateLegend();
    });
    window.addEventListener('resize', () => {
        resize();
        rysujWykres();
    });
}
