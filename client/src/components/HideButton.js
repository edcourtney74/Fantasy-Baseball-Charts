import React from 'react';
import { Button } from 'reactstrap';

function HideButton(props) {
    return (
            <Button outline color="success" size="sm" className="mr-2" onClick={props.onClickHideAll}>Hide All Teams</Button>
    )
}

export default HideButton;