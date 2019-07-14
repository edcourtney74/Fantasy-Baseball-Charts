import React from 'react';
import { Button, Row } from 'reactstrap';

function CategoryButton(props) {
    return (
        <Row className="justify-content-center mt-4">
            <Button outline color="primary" size="sm" className="mr-2" id="rank" onClick={props.onClickCategory}>Rank</Button>
            <Button outline color="primary" size="sm" className="mr-2" id="points-for" onClick={props.onClickCategory}>Points For</Button>
            <Button outline color="primary" size="sm" className="mr-2" id="points-against" onClick={props.onClickCategory}>Points Against</Button>
            <Button outline color="primary" size="sm" className="mr-2" id="exp-wins" onClick={props.onClickCategory}>Expected Wins</Button>
            <Button outline color="primary" size="sm" className="mr-2" id="luck" onClick={props.onClickCategory}>Luck</Button>
            <Button outline color="primary" size="sm" className="mr-2" id="h2h-luck" onClick={props.onClickCategory}>H2H Luck</Button>
        </Row>
    )
}

export default CategoryButton;