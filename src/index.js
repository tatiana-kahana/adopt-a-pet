import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Modal from 'react-modal'
import Pet from './Pet';
import EditPetModal from './EditPetModal';
import NewPetModal from './NewPetModal';

import { listPets, createPet, updatePet, deletePet } from './api';

import {
    Button, Container, Row, Col, Card, Jumbotron
} from 'reactstrap';

const App = () => {
    const [pets, setPets] = useState([]);
    const [isNewPetOpen, setNewPetOpen] = useState(false);
    const [currentPet, setCurrentPet] = useState(null)
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        // async function getData() {
        //     setLoading(true)
        //     try {
        //         const res = await fetch(
        //             "http://localhost:3001/pets"
        //         );
        //         const pets = await res.json();
        //         setPets(pets)
        //         setLoading(false)

        //     } catch (e) {
        //         setLoading(false)
        //     }

        // }
        // getData()

        setLoading(true)
        listPets()
            .then(pets => setPets(pets))
            .finally(() => setLoading(false))
    }, []);

    // console.log(isNewPetOpen)


    const addPet = async pet => {
        return createPet(pet)
            .then(newPet => {
                setPets([
                    ...pets,
                    newPet
                ])
                setNewPetOpen(false)
            });
    };

    const savePet = async pet => {
        return updatePet(pet)
            .then(updatedPet => {
                setPets(pets =>
                    pets.map(pet =>
                        pet.id === updatedPet.id ? updatedPet : pet))
                setCurrentPet(null)
            })
    }

    const removePet = byePet => {
        const result = window.confirm(`Are you sure you want to adopt ${byePet.name}`)
        if (result) {
            deletePet(byePet)
                .then(() => {
                    setPets(pets =>
                        pets.filter(pet => pet.id !== byePet.id))
                })
        }
    }
    return (
        <Container>

            <Jumbotron>
                <h1 className="display-4 text-center">Adopt-a-Pet</h1>
            </Jumbotron>

            <Row>
                {
                    isLoading ? (
                        <Col><div className="loading display-3">Loading...</div></Col>
                    ) : (
                            <Col>
                                <Row className="mb-4">
                                    <Col className="text-center">
                                        <Button
                                            color="secondary"
                                            size="lg"
                                            onClick={() => setNewPetOpen(true)}>
                                            Add a pet</Button>
                                    </Col>
                                </Row>

                                <Row xs="3">
                                    {pets.map(pet => (
                                        <Col key={pet.id} className="mt-2">
                                            <Card >
                                                <Pet
                                                    pet={pet}
                                                    onEdit={() => setCurrentPet(pet)}
                                                    onRemove={() => removePet(pet)} />
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        )}
            </Row>

            {isNewPetOpen &&
                (<NewPetModal
                    onCancel={() => setNewPetOpen(false)}
                    onSave={addPet}
                />
                )}
            {currentPet && (
                <EditPetModal
                    pet={currentPet}
                    onCancel={() => setCurrentPet(null)}
                    onSave={savePet}
                />
            )}
        </Container>
    )
}

const el = document.querySelector('#root');
Modal.setAppElement(el)

ReactDOM.render(
    <App />,
    el
)