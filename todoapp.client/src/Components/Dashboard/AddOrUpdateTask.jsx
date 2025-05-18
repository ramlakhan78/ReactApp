import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { GetAllGroupList } from '@/api/taskGroupApi';
import { GetTaskById } from '@/api/taskApi';
import { FormateDate } from '../../../global/Helper'


const AddOrUpdateTask = ({ show, setShow, onAddOrEdit, taskId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(FormateDate(new Date()));
    const [groupId, setgroupId] = useState(0);
    const [taskGroups, setTaskGroups] = useState([{ listId: 0, listName: '' }]);
    const [isShowError, setIsShowError] = useState(false);
    const [editTaskItem, setEditTaskItem] = useState([]);


    useEffect(() => {
        (async () => {
            const allGroup = await GetAllGroupList();
            console.log(allGroup);
            setTaskGroups(allGroup.data);

            if (taskId > 0) {
                let res = await GetTaskById(taskId);
                if (res.isSuccess) {
                    let itemToEdit = res.data;
                    setTitle(itemToEdit.title);
                    setDescription(itemToEdit.description);
                    setDate(itemToEdit.toDoDate);
                    setgroupId(itemToEdit.taskGroupId);
                    setEditTaskItem(itemToEdit);
                }
            }

            // set default group id to first group id
            if (allGroup.data && allGroup.data.length > 0) {
                setgroupId(allGroup.data[0].listId);
            }
        })();
    }, []);

    const handleSubmit = () => {
        let itemToAddOrEdit = {};
        if (taskId > 0) {
            itemToAddOrEdit = { ...editTaskItem, title: title, description: description, toDoDate: date };
        } else {
            itemToAddOrEdit = { taskId: 0, title: title, description: description, toDoDate: date, taskGroupId: groupId };
        }

        onAddOrEdit(itemToAddOrEdit);
        EmptyAllFields();
        setShow(false)
    }

    const EmptyAllFields = () => {
        setTitle('');
        setDescription('');
        setDate(FormateDate(new Date()));
        setgroupId(0);
    }

    const HendleErrorAndSetTitleValue = (e) => {
        setTitle(e.target.value);
        if (e.target.value.trim()) {
            setIsShowError(false);
        } else {
            setIsShowError(true);
        }

    }

    return (

        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{taskId > 0 ? "Edit task" : "Add task"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            onChange={(e) => HendleErrorAndSetTitleValue(e)}
                            type="text"
                            placeholder="enter task title"
                            autoFocus
                            value={title}
                        />
                        <Form.Text className={`text-danger ${!isShowError ? "d-none" : ""}`}>
                            please enter a text for title.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            onChange={(e) => setDescription(e.target.value)} as="textarea"
                            placeholder="enter desceription"
                            rows={3}
                            value={description}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            type="Date"
                        />
                    </Form.Group>
                    {
                        taskId > 0 ?

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label>Select Task Group</Form.Label>
                                <Form.Select
                                    onChange={(e) => setgroupId(e.target.value)} aria-label="Default select example">
                                    {taskGroups.map((item) => (
                                        <option key={item.listId} value={item.listId}>{item.listName}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            : ''
                    }

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={!title.trim()}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddOrUpdateTask;