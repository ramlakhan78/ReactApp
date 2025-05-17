import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addGroup, getAllGroupList } from '@/api/taskGroupApi';

export default function Sidebar() {
    const [isCollapse, setIsCollapse] = useState(false);
    const [taskGroups, setTaskGroups] = useState([{ listId: 0, listName: '' }]);
    const [show, setShow] = useState(false);

    const [GroupInputValue, setGroupInputValue] = useState('');
    const [isShowError, setIsShowError] = useState(false);


    useEffect(() => {
        getAllGroups();
    }, []);

    /* show add list popup */
    const handleShow = () => setShow(true);

    /* show/hide list submenu  */
    const hendleCollapse = () => {
        setIsCollapse(!isCollapse);
    }

    /* Add list */
    const handleAdd = async () => {
        if (GroupInputValue) {
            try {
                const result = await addGroup({ listId: 0, listName: GroupInputValue });
                getAllGroups();
                alert(result.message);
                setGroupInputValue('');
            } catch (error) {
                console.error('Error creating list:', error);
                setGroupInputValue('');
            }
        }

        setShow(false);
    }

    /*Get All Groups*/
    const getAllGroups = async () => {

        const allGroups = await getAllGroupList();
        if (allGroups.data && allGroups.data.length > 0) {
            setTaskGroups(allGroups.data);
        }
    };

    /*handle add list*/
    const handleErrorAddGroup = (value) => {
        if (!value) {
            setIsShowError(true);
            setGroupInputValue('');
        } else {
            setIsShowError(false);
            setGroupInputValue(value);
        }
    }

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <button className="btn btn-secondary global-create-btn">
                        Create +
                    </button>
                </li>

                <li>
                    <button onClick={hendleCollapse} className="btn">
                        Task List {isCollapse == false ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    <ul className={`submenu ${isCollapse == true ? 'collapse' : ''}`}>
                        {taskGroups.length > 0 &&
                            taskGroups.map(item => (
                                <li key={item.listId} className="submenu-item"> <input className="checkinput" type="checkbox" /> <span>{item.listName}</span> </li>
                            ))
                        }
                    </ul>
                </li>
                <li>
                    <button className="btn createlist-btn" onClick={handleShow}>
                        <Plus /> <span>Create new list</span>
                    </button>
                </li>
            </ul>

            {/* model for add list */}
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Name: <input type="text" className="form-control" onChange={(e) => handleErrorAddGroup(e.target.value)} />
                    <br />
                    <span className={`${isShowError == false ? "d-none" : ""} text-danger`}>please enter value</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd} disabled={!GroupInputValue.trim()}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

