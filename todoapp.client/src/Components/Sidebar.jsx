import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Sidebar() {
    const [isCollapse, setIsCollapse] = useState(false);
    const [taskList, setTaskList] = useState([{ listId: 0, listName: '' }]);
    const [show, setShow] = useState(false);

    const [listInputValue, setlistInputValue] = useState('');
    const [isShowError, setIsShowError] = useState(false);


    useEffect(() => {
        getAllTaskList();
    }, []);

    /* close add list popup */
    const handleAdd = () => {
        if (listInputValue) {
            addList({ listId: 0, listName: listInputValue });
        }

        setShow(false);
    }

    /* show add list popup */
    const handleShow = () => setShow(true);

     /* show/hide list submenu  */
    const hendleCollapse = () => {
        setIsCollapse(!isCollapse);
    }

     /*Get All List*/
    const getAllTaskList = () => {
        fetch("/TaskList/task-list")
            .then((res) => {
                if (!res.ok) {
                    console.log("something went wrong!!");
                }
                return res.json();
            })
            .then((dataobj) => {
                if (dataobj.data && dataobj.data.length > 0) {
                    setTaskList(dataobj.data);
                }
                console.log(dataobj.data);
            })
            .catch((error) => {
                console.error("Failed to fetch task list:", error);
            });
    };

    /* Add list */
    const addList = async (item) => {
        try {
            const response = await fetch('/TaskList/add-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            getAllTaskList();
            const result = await response.json();
            alert(result.message);
            console.log('list created:', result);
            setlistInputValue('');
        } catch (error) {
            console.error('Error creating list:', error);
            setlistInputValue('');
        }
    }

    /*handle add list*/
    const handleErrorAddList = (value) => {
        if (!value) {
            setIsShowError(true);
            setlistInputValue('');
        } else {
            setIsShowError(false);
            setlistInputValue(value);
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
                        { taskList.length > 0 &&
                            taskList.map(item => (
                                <TaskList item={item} />
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
                    Name: <input type="text" className="form-control" onChange={(e) => handleErrorAddList(e.target.value)} />
                    <br />
                    <span className={`${isShowError == false ? "d-none":"" } text-danger`}>please enter value</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd} disabled={!listInputValue.trim()}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

//component of show list
function TaskList({ item }) {
    return (
        <li key={item.listId} className="submenu-item"> <input className="checkinput" type="checkbox" /> <span>{item.listName}</span> </li>
    );
}
