export function rysujWykres(context, canvas, skalaX, skalaY, x0, y0, fx) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid(context, canvas, skalaX, skalaY, x0, y0);
    drawAxis(context, canvas, skalaX, skalaY, x0, y0);
    drawFunction(context, canvas, skalaX, skalaY, fx, x0, y0);
}

function drawGrid(context, canvas, skalaX, skalaY, x0, y0) {
    // Rysowanie siatki pionowej
    context.beginPath();
    context.strokeStyle = '#ddd';
    context.lineWidth = 1;

    for (let x = x0 % skalaX; x < canvas.width; x += skalaX) {
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.moveTo(x0 - (x - x0), 0);
        context.lineTo(x0 - (x - x0), canvas.height);
    }

    context.stroke();

    // Rysowanie siatki poziomej
    for (let y = y0 % skalaY; y < canvas.height; y += skalaY) {
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.moveTo(0, y0 - (y - y0));
        context.lineTo(canvas.width, y0 - (y - y0));
    }

    context.stroke();
}

function drawAxis(context, canvas, skalaX, skalaY, x0, y0) {
    // Rysowanie osi x z oznaczeniami
    context.beginPath();
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(0, y0);
    context.lineTo(canvas.width, y0);
    context.stroke();

    let stepX = skalaX;
    for (let x = x0; x < canvas.width; x += stepX) {
        drawXAxis(context, skalaX, x, x0, y0);
    }
    stepX = skalaX;
    for (let x = x0; x >= (x0 % skalaX) - (2 * stepX); x -= stepX) {
        drawXAxis(context, skalaX, x, x0, y0);
    }

    // Rysowanie osi y z oznaczeniami
    context.beginPath();
    context.moveTo(x0, 0);
    context.lineTo(x0, canvas.height);
    context.stroke();

    let stepY = skalaY;
    for (let y = y0; y < canvas.height; y += stepY) {
        drawYAxis(context, skalaY, y, x0, y0)
    }
    for (let y = y0; y >= (y0 % skalaY) - (2 * stepY); y -= stepY) {
        drawYAxis(context, skalaY, y, x0, y0)
    }

    context.fillText('0', x0 + 3, y0 + 10);
}

function drawXAxis(context, skalaX, x, x0, y0) {
    context.moveTo(x, y0 - 5);
    context.lineTo(x, y0 + 5);
    context.stroke();
    const label = Math.round((x - x0) / skalaX);
    if (label !== 0) {
        context.fillText(label, x - 3, y0 + 15);
    }
}

function drawYAxis(context, skalaY, y, x0, y0) {
    context.moveTo(x0 - 5, y);
    context.lineTo(x0 + 5, y);
    context.stroke();
    const label = Math.round(-(y - y0) / skalaY);
    if (label !== 0) {
        context.fillText(label, x0 + 10, y + 3);
    }
}

function drawFunction(context, canvas, skalaX, skalaY, fx, x0, y0) {
    context.beginPath();
    context.strokeStyle = 'blue';
    context.lineWidth = 2;

    for (let x = -(canvas.width / 2); x < canvas.width / 2; x += 1) {
        let y = -fx(x / skalaX) * skalaY + y0;
        context.lineTo(x + x0, y);
    }
    context.stroke();
    for (let x = -(canvas.width / 2); x < canvas.width / 2; x += 1) {
        let y = -fx(x / skalaX) * skalaY + y0;
        if (x === 0 || y === 0) {
            drawDot(context, x + x0, y);
        }
    }

}

function drawDot(context, x, y) {
    context.beginPath();
    context.arc(x, y, 4, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.strokeStyle = 'blue';
    context.fill();
    context.stroke();
    context.closePath();
}
