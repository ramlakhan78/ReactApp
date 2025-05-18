import { useState, useEffect } from 'react';
import AddOrUpdateTask from './AddOrUpdateTask';
import { EllipsisVertical, CircleCheckBig, Star } from "lucide-react";
import { SaveTask, GetTaskById, GetTasksByGroupId } from '@/api/TaskApi';

const Dashboard = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [taskMenuOpen, setTaskMenuOpen] = useState(false);
    const [showAddorEditTaskModel, setShowAddorEditTaskModel] = useState(false);
    const [taskIdForEdit, setTaskIdForEdit] = useState(0);
    const [groupTaskData, setGroupTaskData] = useState([]);


    useEffect(() => {
        (async () => {
            const res = await GetTasksByGroupId(1);
            if (res.isSuccess) {
                setGroupTaskData(res.data);
            } else {
                console.error(res.message);
            }
        })();
    }, []);

    const hendleEditTask = (taskId) => {
        setTaskIdForEdit(taskId);
        setShowAddorEditTaskModel(true);
    }

    const hendleAddOrEdit = async (item) => {

        console.log('Add or Edit Task', item);
        const res = await SaveTask(item);
        if (!res.isSuccess) {
            console.error(res);
        }

        alert(res.message);
        setTaskIdForEdit(0);

    }

    return (
        <>

            <div className="task-scroll-container">
                <div className="task-scroll">
                    {

                        groupTaskData && groupTaskData.length != 0 &&

                        < div className="task-card">

                            <div className="task-card-header">
                                <h4>title</h4>
                                <div className="task-group-menu" onClick={() => setMenuOpen(!menuOpen)} tabIndex={0} role="button" aria-label="Open menu">
                                    <EllipsisVertical />
                                    {menuOpen && (
                                        <div className="submenu">
                                            <div className="submenu-section">
                                                <div className="submenu-title">Sort by</div>
                                                <div className="submenu-item sort-item">My order</div>
                                                <div className="submenu-item sort-item">Date</div>
                                                <div className="submenu-item sort-item">Starred recently</div>
                                                <div className="submenu-item sort-item">Title</div>
                                            </div>
                                            <div className="submenu-divider" />
                                            <div className="submenu-item">Rename list</div>
                                            <div className="submenu-item">Delete list</div>
                                            <div className="submenu-divider" />
                                            <div className="submenu-item disabled">Delete all completed tasks</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className="btn add-task-button" onClick={() => setShowAddorEditTaskModel(true)}><CircleCheckBig className="add-task-check" />Add a task</button>
                            <div className="task-card-body">

                                <div className="row">
                                    <div className="col-1 d-flex justify-content-center"><input type="radio" /></div>
                                    <div className="col-7 d-flex mt-2" onClick={() => hendleEditTask(2)}>my task</div>
                                    <div className="col-2 d-flex justify-content-center">
                                        <div className="task-menu" onClick={() => setTaskMenuOpen(!taskMenuOpen)}>

                                            <EllipsisVertical />
                                            {taskMenuOpen && (
                                                <div className="tasksubmenu">
                                                    <div className="submenu-section">
                                                        <div className="tasksubmenu-item">Delete</div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                    <div className="col-2 d-flex justify-content-center mt-2"><Star /></div>
                                </div>

                            </div>
                        </div>

                    }
                </div>


            </div >

            {showAddorEditTaskModel == true && <AddOrUpdateTask show={showAddorEditTaskModel} setShow={setShowAddorEditTaskModel} onAddOrEdit={hendleAddOrEdit} taskId={taskIdForEdit} />
            }

        </>
    )
}

export default Dashboard;