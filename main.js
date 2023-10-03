import {compileExpressions} from './js/calculate.js';
import {rysujWykres} from './js/draw.js';
import {initEvents, resize} from './js/events.js';

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
compileExpressions()
generateLegend()
function zamienNaIndeksGorny(wyrazenie) {
    // Funkcja pomocnicza do obsługi potęgi z indeksem górnym
    const zamienPotegi = (czesc) => {
        const potegaRegex = /(\w+)\^(\d+)/g;
        return czesc.replace(potegaRegex, '<sup>$1</sup><sup>$2</sup>');
    };

    // Podziel wyrażenie na części rozdzielone operatorami +, -, *
    const czesci = wyrazenie.split(/([-+*])/);

    // Przygotuj wynik w postaci HTML z indeksami górnymi
    let wynikHTML = '';
    let inIndex = false; // Flaga wskazująca, czy jesteśmy wewnątrz indeksu górnego

    czesci.forEach((czesc) => {
        if (czesc === '^') {
            inIndex = true;
        } else if (czesc === '+') {
            inIndex = false;
        } else if (czesc === '-' || czesc === '*') {
            wynikHTML += czesc;
        } else {
            if (inIndex) {
                wynikHTML += zamienPotegi(czesc);
            } else {
                wynikHTML += czesc;
            }
        }
    });

    return wynikHTML;
}


export function generateLegend (){
    document.querySelector('.legend').innerHTML =app.expressions.map(ex=>{
        return `<div class="item">
        <div class="line" style="background: ${ex.color}"></div>
        <div class="expr">${ex.expr}</div>
    </div>`
    }).join('');
    document.querySelectorAll('.legend .item').forEach(el=>{
        const exprElement=el.querySelector('.expr');
        katex.render(exprElement.innerText, exprElement, {
            throwOnError: false
        });
    })
}
initEvents();
rysujWykres();

