import React from 'react';
import { Button } from 'reactstrap';

function DivisionButtonActive(props) {
    return (
            <Button color="warning" size="sm" className="mr-2 mb-1" id={props.division} onClick={props.onClick}>{props.division}</Button>
    )
}

export default DivisionButtonActive;