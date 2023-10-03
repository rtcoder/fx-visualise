import {compileExpressions} from './calculate.js';
import {rysujWykres} from './draw.js';
import {initEvents, resize} from './events.js';
import {generateLegend} from './utils.js';

export const app = {
    mouseX: null,
    mouseY: null,
    scaleX: 20,
    scaleY: 20,
    scaleChange: false,
    x0: 0,
    y0: 0,
    canvas: null,
    ctx: null,
    expressions: [{
        color: 'red',
        expr: 'x^2-4x+9',
        compiledExpression: null,
    }],
};
app.canvas = document.getElementById('wykres');
app.ctx = app.canvas.getContext('2d');
resize();
app.x0 = app.canvas.width / 2;
app.y0 = app.canvas.height / 2;
compileExpressions();
generateLegend();

initEvents();
rysujWykres();

