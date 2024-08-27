import React from 'react';
import DisplayInputComponent from './DisplayInputComponent';
import { CALC_OPERATOR_LIST } from '../constans/calculator.constants';
import ButtonListComponent from './ButtonListComponent';

class SimpleCalculatorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayInput: "0" 
        };

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    evaluateExpression(expression) {
        try {
            let sanitizedExpression = expression
                .replace(/(?<!\d)-(\d+(\.\d*)?|\.\d+)(\^)/g, '(-$1)**')
                .replace(/\^/g, "**"); 

            sanitizedExpression = sanitizedExpression.replace(/(\d+(\.\d*)?|\.\d+)%\^/g, '($1 / 100)**')
                                                   .replace(/(\d+(\.\d*)?|\.\d+)%/g, '($1 / 100)');

            const result = Function('"use strict";return (' + sanitizedExpression + ')')();
            return isFinite(result) ? result : "Error";
        } catch (error) {
            return "Error";
        }
    }

    onButtonClick(key) {
        const { displayInput } = this.state;
        const input = String(displayInput);
        const isKeyOperator = CALC_OPERATOR_LIST.includes(key);
        const isLastCharOperator = CALC_OPERATOR_LIST.includes(input.slice(-1));
    
        switch (key) {
            case "AC":
                this.setState({ displayInput: "0" });
                break;
            case "DEL":
                this.setState({
                    displayInput: input.length > 1 ? input.slice(0, -1) : "0",
                });
                break;
            case "=":
                this.setState({
                    displayInput: String(this.evaluateExpression(input)),
                });
                break;
            case ".":
                const lastNumber = input.split(/[\+\-\*\/\%\^]/).pop();
                if (!lastNumber.includes(".")) {
                    this.setState({
                        displayInput: input + key,
                    });
                }
                break;
            case "%":
                if (input && !input.endsWith("%")) {
                    this.setState({
                        displayInput: input + key,
                    });
                }
                break;
            case "^":
                this.setState({
                    displayInput: input + key,
                });
                break;
            default:
                if (input === "0" && key !== ".") {
                    this.setState({
                        displayInput: key,
                    });
                } else {
                    if (isLastCharOperator && isKeyOperator) {
                        this.setState({
                            displayInput: input.slice(0, -1) + key,
                        });
                    } else {
                        this.setState({
                            displayInput: input + key,
                        });
                    }
                }
                break;
        }
    }
    

    onDisplayInputChange = (event) => {
        this.setState({
            displayInput: event.target.value,
        });
    }

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.contentContainer}>
                    <h1 style={styles.title}>Simple Calculator</h1>
                    <div style={styles.calculator}>
                        <DisplayInputComponent
                            displayInput={this.state.displayInput}
                            onChange={this.onDisplayInputChange}
                        />

                        <ButtonListComponent
                            onClick={this.onButtonClick}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2c3e50",
        height: "100vh",
        margin: 0,
    },
    contentContainer: {
        flexDirection: "column",
        alignItems: "center",
        display: "flex",
        padding: "20px",
        backgroundColor: "#34495e",
        borderRadius: "10px", 
    },
    calculator: {
        width: "380px",
        padding: "20px",
        borderRadius: "10px", 
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#add8e6",
    },
    title: {
        textAlign: "center",
        color: "white",
    }
};



export default SimpleCalculatorComponent;
