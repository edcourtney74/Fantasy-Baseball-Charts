import React from 'react';
import { Button, Row } from 'reactstrap';

function CategoryButton(props) {
    return (
        <Row className="justify-content-center mt-4">
            <Button outline color="primary" size="sm" className="mr-2" id="rank" onClick={props.onClickRank}>Rank</Button>
            <Button outline color="primary" size="sm" className="mr-2" id="points-for">Points For</Button>
            <Button outline color="primary" size="sm" className="mr-2" id="points-against">Points Against</Button>
            <Button outline color="primary" size="sm" className="mr-2" id="exp-wins">Expected Wins</Button>
            <Button outline color="primary" size="sm" className="mr-2" id="luck">Luck</Button>
            <Button outline color="primary" size="sm" className="mr-2" id="h2h-luck">H2H Luck</Button>
        </Row>
    )
}

export default CategoryButton;