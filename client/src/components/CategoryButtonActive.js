import React from 'react';
import { Button } from 'reactstrap';

function CategoryButtonActive(props) {
    return (
            <Button color="primary" size="sm" className="mr-2 mb-1" id={props.id} onClick={props.onClickCategory}>{props.id}</Button>
    )
}

export default CategoryButtonActive;