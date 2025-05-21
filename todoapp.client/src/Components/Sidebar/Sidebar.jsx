import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronDown, ChevronUp, Plus, Star, CircleCheckBig } from 'lucide-react';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { SaveGroup, GetAllGroupList, GetGroupById } from '@/api/TaskGroupApi';
import { GetAllGroupsTaskList } from '@/api/TaskApi';
import { Context } from '../../global/MyContext';
import { GetPath } from '../../global/Helper';
import AddOrUpdateGroups from './AddOrUpdateGroups';

export default function Sidebar() {

    const { taskGroups, setTaskGroups, setAllGroupTaskList } = useContext(Context);
    const [isCollapse, setIsCollapse] = useState(false);
    const [show, setShow] = useState(false);

    /* Add Group */
    const handleAddorEdit = async (item) => {
        try {
            const result = await SaveGroup(item);
            if (result.isSuccess) {

                updateTaskGroups();
            }
        } catch (error) {
            console.error('Error creating list:', error);
        }
    }

    /* show add list popup */
    const handleShow = () => setShow(!show);

    /* show/hide list submenu  */
    const hendleCollapse = () => {
        setIsCollapse(!isCollapse);
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

    const updateTaskGroups = async () => {

        const allGroups = await GetAllGroupList();
        if (allGroups.data && allGroups.data.length > 0) {
            setTaskGroups(allGroups.data);
        }

        const res = await GetAllGroupsTaskList();
        if (res.isSuccess) {
            setAllGroupTaskList(res.data);
        } else {
            console.error("Failed or unexpected response:", res.message, res.data);
        }

    }

    return (
        <div className="sidebarWrapper">
            <div className="sidebar">
                <ul>
                    <li>
                        <button className="btn btn-primary global-create-btn">
                            Create +
                        </button>
                    </li>

                    <li className={`d-flex ${GetPath() === '/dashboard' ? 'active' : ''}`}>
                        <CircleCheckBig />
                        <Link className={`btn nav-link`} to="/dashboard">
                            All tasks
                        </Link>
                    </li>

                    <li className={`d-flex ${GetPath() === '/dashboard/starred' ? 'active' : ''}`}>
                        <Star />
                        <Link className={`btn nav-link`} to="/dashboard/starred">
                            Starred
                        </Link>
                    </li>

                    <li>
                        <button onClick={hendleCollapse} className="btn">
                            List {isCollapse == false ? <ChevronUp /> : <ChevronDown />}
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
                        <button className="btn createlist-btn" onClick={() => setShow(true)}>
                            <Plus /> <span>Create new list</span>
                        </button>
                    </li>
                </ul>


                <AddOrUpdateGroups show={show} setShow={handleShow} handleAddorEdit={handleAddorEdit} editGroupId={0} />

            </div>
        </div>
    );
}

