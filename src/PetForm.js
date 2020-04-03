import React, { useState, useRef } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

export default function PetForm({ pet, onSave, onCancel }) {
    const initialPet = pet || {
        name: '',
        kind: '',
        photo: null
    }

    const [name, setName] = useState(initialPet.name);
    const [kind, setKind] = useState(initialPet.kind);
    const [photo, setPhoto] = useState(initialPet.photo);
    const [errors, setErrors] = useState(null);
    const [saving, setSaving] = useState(false);

    const photoInput = useRef();

    const updatePhoto = () => {
        const file =
            photoInput.current.files &&
            photoInput.current.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPhoto(reader.result);
            reader.readAsDataURL(file);
        }
    }
    const submit = e => {
        e.preventDefault();
        setSaving(true)
        onSave({
            ...pet,
            name,
            kind,
            photo
        })
            .catch(error => {
                console.log(error)
                setErrors(error)
                setSaving(false)
            })
    }
    return (
        <div>
            <Form className="pet-form" onSubmit={submit}>
                <FormGroup row>
                    <Col sm={6}>
                        {photo && <img alt="the pet" src={photo} width="150px" />}
                        <input
                            className="mt-2"
                            type="file"
                            id="photo"
                            ref={photoInput}
                            onChange={updatePhoto}
                        />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Col sm={6}>
                        <Label htmlFor="name">Name: </Label>
                        <Input type="text" id="name" value={name}
                            onChange={e => setName(e.target.value)} />
                    </Col>
                </FormGroup>

                {errors && errors.name && (
                    <div className="error">{errors.name}</div>
                )}

                <FormGroup row>
                    <Col sm={6}>
                        <Label htmlFor="kind">Kind: </Label>
                        <Input type="select" name="kind"
                            id="kind"
                            value={kind}
                            onChange={e => setKind(e.target.value)} >
                            <option value=''>Choose a kind</option>
                            <option value='cat'>Cat</option>
                            <option value='dog'>Dog</option>
                        </Input>

                        {errors && errors.kind && (
                            <div className="error">{errors.kind}</div>
                        )}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={3} className="mb-2 mb-sm-0">
                        <Button
                            color="primary"
                            size="lg"
                            block
                            disabled={saving}
                            type="submit">
                            Save
                </Button>
                    </Col>
                    <Col sm={3} >
                        <Button
                            color="secondary"
                            size="lg"
                            block
                            disabled={saving}
                            type="button"
                            onClick={onCancel}>
                            Cancel
                </Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    );
};
