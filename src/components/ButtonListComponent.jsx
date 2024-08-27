import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { CALC_BUTTON_LIST } from "../constans/calculator.constants";

class ButtonListComponent extends React.Component {
    render() {
        return (
            <div style={styles.buttonList}>
                {CALC_BUTTON_LIST.map((key) => (
                    <Button 
                        variant="contained"
                        key={key}
                        style={this.getButtonStyle(key)}
                        onClick={() => this.props.onClick(key)}
                    >
                        {key}
                    </Button>
                ))}
            </div>
        );
    }

    getButtonStyle(key) {
        let backgroundColor = "";
        let color = "white";
        let width = "100%"; 

        if (["AC", "DEL"].includes(key)) {
            backgroundColor = "#f39c12";
        } else if (key === "=") {
            backgroundColor = "#2980b9";
            width = "325%"; 
        } else if (["+", "-", "*", "/", "%", "^"].includes(key)) {
            backgroundColor = "#16a085";
        } else if (key === ".") {
            backgroundColor = "#8e44ad";
        } else if (typeof key === "number") {
            backgroundColor = "#2c3e50";
        } else {
            backgroundColor = "#34495e";
        }

        return {
            backgroundColor,
            color,
            padding: "15px 20px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width, 
        };
    }
}

ButtonListComponent.propTypes = {
    onClick: PropTypes.func.isRequired,
};

const styles = {
    buttonList: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
    },
};

export default ButtonListComponent;
