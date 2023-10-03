import {app} from '../main.js';
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
