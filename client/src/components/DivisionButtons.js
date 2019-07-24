import React from 'react';
import { Button } from 'reactstrap';

function DivisionButtons(props) {
    // Keep button filled in for division chosen. All the rest are outline.
    let buttonStyle = "";
    if (props.id === props.division) {
        buttonStyle = "btn-warning"
    } else {
        buttonStyle = "btn-outline-warning"
    }

    return (
        <Button color="warning" size="sm" className={`mr-2 mb-1 ${buttonStyle}`} id={props.id} onClick={props.onClick}>{props.id}</Button>
    )
}

export default DivisionButtons;