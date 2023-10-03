import {app} from './main.js';

export function randomHexColor() {
    const chars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        const idx = Math.floor(Math.random() * 16);
        color += chars[idx];
    }
    return color;
}

export function generateLegend() {
    document.querySelector('.legend').innerHTML = app.expressions.map(ex => {
        return `<div class="item">
        <div class="line" style="background: ${ex.color}"></div>
        <div class="expr">${ex.expr}</div>
    </div>`;
    }).join('');
    document.querySelectorAll('.legend .item').forEach(el => {
        const exprElement = el.querySelector('.expr');
        katex.render(exprElement.innerText, exprElement, {
            throwOnError: false,
        });
    });
}
