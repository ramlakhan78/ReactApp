import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SaveGroup, GetAllGroupList, GetGroupById } from '@/api/TaskGroupApi';
import { GetAllGroupsTaskList } from '@/api/TaskApi';
import { Context } from '../../global/MyContext';
export default function Sidebar() {

    const { taskGroups, setTaskGroups, setAllGroupTaskList } = useContext(Context);

    const [isCollapse, setIsCollapse] = useState(false);
    const [show, setShow] = useState(false);
    const [GroupInputValue, setGroupInputValue] = useState('');
    const [isShowError, setIsShowError] = useState(false);

    /* show add list popup */
    const handleShow = () => setShow(true);

    /* show/hide list submenu  */
    const hendleCollapse = () => {
        setIsCollapse(!isCollapse);
    }

    /* Add Group */
    const handleAdd = async () => {
        if (GroupInputValue) {
            try {
                const result = await SaveGroup({ listId: 0, listName: GroupInputValue, IsEnableShow: true });
                if (result.isSuccess) {

                    const allGroups = await GetAllGroupList();
                    if (allGroups.data && allGroups.data.length > 0) {
                        setTaskGroups(allGroups.data);
                    }
                }
                alert(result.message);
                setGroupInputValue('');
            } catch (error) {
                console.error('Error creating list:', error);
                setGroupInputValue('');
            }
        }

        setShow(false);
    }

    /*handle add list*/
    const handleErrorAddGroup = (value) => {
        setGroupInputValue(value);
        if (!value) {
            setIsShowError(true);
        } else {
            setIsShowError(false);
        }
    }

    const hendleCheckGroup = async (groupId) => {
        const existed = taskGroups.find(item => item.listId == groupId);
        if (existed && existed.listName?.trim()) {
            console.log(existed);
            const itemsToUpdate = { ...existed, isEnableShow: !existed.isEnableShow };
            console.log(itemsToUpdate);
            const result = await SaveGroup(itemsToUpdate);

            if (result.isSuccess) {

                console.log(itemsToUpdate);
                const updatedTaskGroups = taskGroups.map(item =>
                    item.listId === groupId ? itemsToUpdate : item
                );

                setTaskGroups(updatedTaskGroups);

                const res = await GetAllGroupsTaskList();
                if (res.isSuccess) {
                    setAllGroupTaskList(res.data);
                } else {
                    console.error("Failed or unexpected response:", res.message, res.data);
                }
            }
        }

    }

    return (
        <div className="sidebarWrapper">
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
                                    <li key={item.listId} className="submenu-item"> <input className="checkinput" type="checkbox" checked={item.isEnableShow} onChange={() => hendleCheckGroup(item.listId)} /> <span>{item.listName}</span> </li>
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
        </div>
    );
}

