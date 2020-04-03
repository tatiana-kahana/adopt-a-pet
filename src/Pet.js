import React from 'react';
import {
    Button, CardTitle, Row, Col, CardImg, CardBody, CardSubtitle
} from 'reactstrap';
const Pet = ({ pet, onEdit, onRemove }) => {
    return (
        <>
            <CardBody className="pet">
                <CardTitle>
                    {pet.name}
                </CardTitle>

                <CardSubtitle>{pet.kind}</CardSubtitle>
            </CardBody>

            {pet.photo ? (
                <CardImg
                    className="pet-img"
                    src={pet.photo}
                    alt='pet'
                />
            ) : (
                    <div className="no-photo">?</div>
                )}

            <CardBody>
                <Row>
                    <Col xs="12" lg="6" className="mb-2 mb-lg-0">
                        <Button color="warning" className="pet-name" onClick={onEdit} block>
                            Edit info
                </Button>
                    </Col>
                    <Col xs="12" lg="6">
                        <Button color="success" className="adopt-btn" onClick={onRemove} block>
                            <span role="img" aria-label="adopt this pet">Adopt</span>
                        </Button>
                    </Col>
                </Row>
            </CardBody>
        </>
    );
};

export default Pet;