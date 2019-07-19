import React from 'react';
import { Button } from 'reactstrap';

function DivisionButtons(props) {
    return (
            <Button outline color="warning" size="sm" className="mr-2 mb-1" id="">{props.division}</Button>
    )
}

export default DivisionButtons;