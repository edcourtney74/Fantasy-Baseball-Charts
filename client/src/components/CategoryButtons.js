import React from 'react';
import { Button } from 'reactstrap';

function CategoryButton(props) {
    // Keep button filled in for category chosen. All the rest are outline.
    let buttonStyle = "";
    props.id === props.chartType ? buttonStyle = "btn-primary" : buttonStyle = "btn-outline-primary"

    return (
        <Button color="primary" size="sm" className={`mr-2 mb-1 ${buttonStyle}`} id={props.id} onClick={props.onClickCategory}>{props.id}</Button>
    )
}

export default CategoryButton;