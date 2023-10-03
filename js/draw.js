import {app} from '../main.js';
import {fn} from './calculate.js';

export function rysujWykres() {
    app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);

    drawGrid();
    drawAxis();
    drawAllFunctions();
}

function drawGrid() {
    // Rysowanie siatki pionowej
    app.ctx.beginPath();
    app.ctx.strokeStyle = '#ddd';
    app.ctx.lineWidth = 1;

    for (let x = app.x0 % app.scaleX; x < app.canvas.width; x += app.scaleX) {
        app.ctx.moveTo(x, 0);
        app.ctx.lineTo(x, app.canvas.height);
        app.ctx.moveTo(app.x0 - (x - app.x0), 0);
        app.ctx.lineTo(app.x0 - (x - app.x0), app.canvas.height);
    }

    app.ctx.stroke();

    // Rysowanie siatki poziomej
    for (let y = app.y0 % app.scaleY; y < app.canvas.height; y += app.scaleY) {
        app.ctx.moveTo(0, y);
        app.ctx.lineTo(app.canvas.width, y);
        app.ctx.moveTo(0, app.y0 - (y - app.y0));
        app.ctx.lineTo(app.canvas.width, app.y0 - (y - app.y0));
    }

    app.ctx.stroke();
}

function drawAxis() {
    // Rysowanie osi x z oznaczeniami
    app.ctx.beginPath();
    app.ctx.strokeStyle = 'black';
    app.ctx.fillStyle = 'black';
    app.ctx.lineWidth = 1;
    app.ctx.moveTo(0, app.y0);
    app.ctx.lineTo(app.canvas.width, app.y0);
    app.ctx.stroke();

    let stepX = app.scaleX;
    for (let x = app.x0; x < app.canvas.width; x += stepX) {
        drawXAxis(x);
    }
    stepX = app.scaleX;
    for (let x = app.x0; x >= (app.x0 % app.scaleX) - (2 * stepX); x -= stepX) {
        drawXAxis(x);
    }

    // Rysowanie osi y z oznaczeniami
    app.ctx.beginPath();
    app.ctx.moveTo(app.x0, 0);
    app.ctx.lineTo(app.x0, app.canvas.height);
    app.ctx.stroke();

    let stepY = app.scaleY;
    for (let y = app.y0; y < app.canvas.height; y += stepY) {
        drawYAxis(y);
    }
    for (let y = app.y0; y >= (app.y0 % app.scaleY) - (2 * stepY); y -= stepY) {
        drawYAxis(y);
    }

    app.ctx.fillText('0', app.x0 + 3, app.y0 + 10);
}

function drawXAxis(x) {
    app.ctx.moveTo(x, app.y0 - 5);
    app.ctx.lineTo(x, app.y0 + 5);
    app.ctx.stroke();
    const label = Math.round((x - app.x0) / app.scaleX);
    if (label !== 0) {
        app.ctx.fillText(label, x - 3, app.y0 + 15);
    }
}

function drawYAxis(y) {
    app.ctx.moveTo(app.x0 - 5, y);
    app.ctx.lineTo(app.x0 + 5, y);
    app.ctx.stroke();
    const label = Math.round(-(y - app.y0) / app.scaleY);
    if (label !== 0) {
        app.ctx.fillText(label, app.x0 + 10, y + 3);
    }
}

function drawFunction(expression) {
    app.ctx.beginPath();
    app.ctx.strokeStyle = expression.color;
    app.ctx.lineWidth = 2;

    for (let x = -(app.canvas.width / 2)-app.x0; x < app.canvas.width+app.x0 / 2; x += 1) {
        let y = -fn(expression, x / app.scaleX) * app.scaleY + app.y0;
        app.ctx.lineTo(x + app.x0, y);
    }
    app.ctx.stroke();
    // for (let x = -(app.canvas.width / 2); x < app.canvas.width / 2; x += 1) {
    //     let y = -fn(expression, x / app.scaleX) * app.scaleY + app.y0;
    //     if (x === 0 || y === 0) {
    //         drawDot(x + app.x0, y+app.y0);
    //     }
    // }
}

function drawAllFunctions() {
    app.expressions.forEach(drawFunction);
}

function drawDot(x, y) {
    app.ctx.beginPath();
    app.ctx.moveTo(x, y);
    app.ctx.arc(x, y, 4, 0, 2 * Math.PI);
    app.ctx.fillStyle = 'red';
    app.ctx.strokeStyle = 'blue';
    app.ctx.fill();
    app.ctx.stroke();
    app.ctx.closePath();
}
