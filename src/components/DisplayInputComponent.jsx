import React from 'react';
import PropTypes from 'prop-types'

class DisplayInputComponent extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div style = {styles.display}>
                <input 
                    style={styles.input}
                    type="text"
                    value={this.props.displayInput}
                    onChange={this.props.onchange}
                />
            </div>
        );
    }
}

DisplayInputComponent.PropTypes = {
    displayInput: PropTypes.string.isRequired,
    onchange: PropTypes.func.isRequired
}

const styles = {
    display : {
        marginBottom: "10px"
    },
    input: {
        width: "100%",
        padding: "10px",
        fontSize: "30px",
        textAlign: "right",
        border: "1px solid #ddd",
        borderRadius: "#fff",
        boxSizing: "border-box",
    },
};

export default DisplayInputComponent;
