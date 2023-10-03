import {app} from './main.js';

export function validateExpression(expression) {
    try {
        const parsedExpression = math.parse(expression);
        const compiledExpression = parsedExpression.compile();
        compiledExpression.evaluate({x: 0});
        return true;
    } catch (e) {
        return false;
    }
}

export function compileExpressions() {
    app.expressions = app.expressions.map(e => {
        const parsedExpression = math.parse(e.expr);
        return {
            ...e,
            compiledExpression: parsedExpression.compile(),
        };
    });
}

export function fn(expr, x) {
    return expr.compiledExpression.evaluate({x: x});
}
