import ButtonCalculator from './button/buttons';
import Screencalculator from './screen/screen';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

function BodyCalculator() {
    const [calc, setCal] = useState("0");
    const updateCalc = (value) => {
        if (value == 'C') {
            clearScreen();
        } else if (value == '=') {
            buttonClickResolve();
        }
        else {
            if (calc == '0') {
                setCal(value)
            } else {
                setCal(calc + value);
            }
        }
    }
    const buttonValues = ['C', '/', '0', '=', '7', '8', '9', '*', '4', '5', '6', '+', '1', '2', '3', '-'];
    const buttonClickResolve = () => {

        const expresion = calc;
        const rpn = infixToRPN(expresion);
        const resultado = evaluarExpresionRPN(rpn);
        setCal(resultado.toString());

    }

    const clearScreen = () => {
        setCal('0');
    }

    const infixToRPN = (expresion) => {
        function obtenerPrecedencia(operador) {
            switch (operador) {
                case '+':
                case '-':
                    return 1;
                case '*':
                case '/':
                    return 2;
                default:
                    return 0;
            }
        }

        // eslint-disable-next-line no-useless-escape
        const tokens = expresion.match(/\d+|\+|\-|\*|\//g);
        const output = [];
        const operadores = [];

        tokens?.forEach((token) => {
            if (/\d+/.test(token)) {
                output.push(parseFloat(token));
            } else if (
                token === '+' ||
                token === '-' ||
                token === '*' ||
                token === '/'
            ) {
                while (
                    operadores.length > 0 &&
                    obtenerPrecedencia(operadores[operadores.length - 1]) >=
                    obtenerPrecedencia(token)
                ) {
                    output.push(operadores.pop());
                }
                operadores.push(token);
            }
        });
        while (operadores.length > 0) {
            output.push(operadores.pop());
        }
        return output;
    }

    const evaluarExpresionRPN = (expresionRPN) => {
        const operandos = [];

        expresionRPN.forEach((token) => {
            if (typeof token === 'number') {
                operandos.push(token);
            } else {
                const segundoOperando = operandos.pop();
                const primerOperando = operandos.pop();

                switch (token) {
                    case '+':
                        operandos.push(primerOperando + segundoOperando);
                        break;
                    case '-':
                        operandos.push(primerOperando - segundoOperando);
                        break;
                    case '*':
                        operandos.push(primerOperando * segundoOperando);
                        break;
                    case '/':
                        operandos.push(primerOperando / segundoOperando);
                        break;
                    default:
                        throw new Error('Operador no válido: ' + token);
                }
            }
        });

        return operandos.pop();
    }


    return (
        <Box sx={{ width: '400px' }}>
            <Grid container item spacing={1}>
                <Grid container item spacing={0}>
                    <Grid item xs={12}>
                        <Screencalculator value={calc}></Screencalculator>
                    </Grid>
                </Grid>

                {Array.from({ length: buttonValues.length / 4 }).map((_, rowIndex) => (
                    <Grid container item spacing={5} key={rowIndex}>
                        {buttonValues.slice(rowIndex * 4, (rowIndex + 1) * 4).map((value, index) => (
                            <Grid item xs={3} key={index}>
                                <ButtonCalculator valor={value} onClick={() => { updateCalc(value) }}></ButtonCalculator>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default BodyCalculator;


