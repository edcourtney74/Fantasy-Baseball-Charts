import React from 'react';
import { Button } from 'reactstrap';

function ShowButton(props) {
    return (
            <Button outline color="success" size="sm" className="mr-2" onClick={props.onClickShowAll}>Show All Teams</Button>
    )
}

export default ShowButton;