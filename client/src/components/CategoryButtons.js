import React from 'react';
import { Button, Row } from 'reactstrap';

function CategoryButton(props) {
    return (
        <Row className="justify-content-center mt-4">
            <Button outline color="primary" size="sm" className="mr-2" onClick={props.onClickRank}>Rank</Button>
            <Button outline color="primary" size="sm" className="mr-2">Points For</Button>
            <Button outline color="primary" size="sm" className="mr-2">Points Against</Button>
            <Button outline color="primary" size="sm" className="mr-2">Expected Wins</Button>
            <Button outline color="primary" size="sm" className="mr-2">Luck</Button>
            <Button outline color="primary" size="sm" className="mr-2">H2H Luck</Button>
        </Row>
    )
}

export default CategoryButton;