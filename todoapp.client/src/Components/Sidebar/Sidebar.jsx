import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SaveGroup, GetAllGroupList } from '@/api/TaskGroupApi';

export default function Sidebar() {
    const [isCollapse, setIsCollapse] = useState(false);
    const [taskGroups, setTaskGroups] = useState([]);
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
                const result = await SaveGroup({ listId: 0, listName: GroupInputValue, IsEnableShow: true });
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

        const allGroups = await GetAllGroupList();
        if (allGroups.data && allGroups.data.length > 0) {
            setTaskGroups(allGroups.data);
        }
    };

    /*handle add list*/
    const handleErrorAddGroup = (value) => {
        setGroupInputValue(value);
        if (!value) {
            setIsShowError(true);
        } else {
            setIsShowError(false);
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
                                <li key={item.listId} className="submenu-item"> <input className="checkinput" type="checkbox" checked={item.isEnableShow} onChange={() => !item.isEnableShow} /> <span>{item.listName}</span> </li>
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
                    <Modal.Title>Add task Group</Modal.Title>
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

