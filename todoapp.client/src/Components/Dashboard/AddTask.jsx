import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { getAllGroupList } from '@/api/taskGroupApi';

const AddTask = ({ show, setShow, onAddOrEdit, isRequestEdit, taskId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [groupId, setgroupId] = useState('');
    const [taskGroups, setTaskGroups] = useState([{ listId: 0, listName: '' }]);


    useEffect(() => {
        const allGroup = getAllGroupList();
        setTaskGroups(allGroup.data);

    }, []);

    const handleSubmit = () => {
        let itemToAddOrEdit = {};
        if (isRequestEdit) {
            itemToAddOrEdit = { taskId: taskId, title: title, description: description, ToDoDate: date, taskGroupId: groupId };
        } else {
            itemToAddOrEdit = { taskId: 0, title: title, description: description, ToDoDate: date, taskGroupId: groupId };
        }

        onAddOrEdit(itemToAddOrEdit);
        EmptyAllFields();
        setShow(true)
    }

    const EmptyAllFields = () => {
        setTitle('');
        setDescription('');
        setDate('');
    }

    return (

        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{isRequestEdit == true ? "Edit task" : "Add task"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="enter task title"
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="Date"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Select Task Group</Form.Label>
                        <Form.Select aria-label="Default select example" onClick={(e) => setgroupId(e.target.value)}>
                            {taskGroups.map((item) => (
                                <option key={item.listId} value={item.listId}>{item.listName}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddTask;