import { useContext, useState } from 'react';
import AddOrUpdateTask from './AddOrUpdateTask';
import { EllipsisVertical, CircleCheckBig, Star, Check, Trash2 } from "lucide-react";
import { SaveTask, GetAllGroupsTaskList, ToggleStarTask } from '@/api/TaskApi';
import { Context } from '../../global/MyContext';
import { FormateDate } from '../../global/Helper';

const Dashboard = () => {
    const { allGroupTaskList, setAllGroupTaskList } = useContext(Context);

    const [showAddorEditTaskModel, setShowAddorEditTaskModel] = useState(false);
    const [taskIdForEdit, setTaskIdForEdit] = useState(0);
    const [gorupIdForAddTask, setGorupIdForAddTask] = useState(0);
    const [openGroupMenuId, setOpenGroupMenuId] = useState(null);
    const [openTaskMenuId, setOpenTaskMenuId] = useState(null);

    const hendleEditTask = (taskId) => {
        setTaskIdForEdit(taskId);
        setShowAddorEditTaskModel(true);
    }

    const handleAddTask = (GroupId) => {
        setGorupIdForAddTask(GroupId);
        setShowAddorEditTaskModel(true);
    }

    const hendleAddOrEdit = async (item) => {

        console.log('Add or Edit Task', item);
        const res = await SaveTask(item);
        if (!res.isSuccess) {
            console.error(res);
        }

        await setGroupsTaskList()
        alert(res.message);
        setTaskIdForEdit(0);
        setGorupIdForAddTask(0);

    }


    const handleDeleteTask = (taskId) => {
        console.log("task id to delete", taskId);
    }

    const hendleUpdateStar = async (taskId) => {

        let res = await ToggleStarTask(taskId);
        if (res.isSuccess) {

            let taskList = allGroupTaskList.map(group => {
                group.taskList = group.taskList.map(task => {
                    if (task.taskId === taskId) {
                        task.isStarred = !task.isStarred;
                    }
                    return task;
                });
                return group;
            });
            setAllGroupTaskList(taskList);
        } else {
            console.error(`errer while calling hendleUpdateStar message '${res.message}'`);
        }
    }

    const handleCompleteTask = (taskId) => {
        console.log(`task id ${taskId} to complete task `);
    }

    const setGroupsTaskList = async () => {
        const res = await GetAllGroupsTaskList();
        if (res.isSuccess) {
            setAllGroupTaskList(res.data);
        } else {
            console.error("Failed or unexpected response:", res.message, res.data);
        }
    }

    return (
        <div className="content">
            <div className="task-scroll-container">
                <div className="task-scroll">
                    {
                        allGroupTaskList && allGroupTaskList.length > 0 &&

                        allGroupTaskList.map(group => (

                            group.isEnableShow &&

                            <div key={group.groupId} className="task-card">

                                <div className="task-card-header">
                                    <h4>{group.groupName}</h4>
                                        <div className="task-group-menu" onClick={() => setOpenGroupMenuId(openGroupMenuId === group.groupId ? null : group.groupId)}  tabIndex={0} role="button" aria-label="Open menu">
                                        <EllipsisVertical />
                                            {openGroupMenuId === group.groupId && (
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
                                <button className="btn add-task-button" onClick={() => handleAddTask(group.groupId)}><CircleCheckBig className="add-task-check" />Add a task</button>
                                <div className="task-card-body">
                                    {
                                        group.taskList &&
                                            group.taskList.length > 0
                                            ?
                                            <div className="incomplete-task">
                                                {
                                                    group.taskList.map(task => (

                                                        <div key={task.taskId} className="row">
                                                            <div className="col-1 mt-0 d-flex justify-content-center"><input type="radio" onClick={handleCompleteTask(task.taskId)} /></div>
                                                            <div className="col-7 task-details mt-2"
                                                                onClick={() => hendleEditTask(task.taskId)}>
                                                                <div className="task-title">
                                                                    {task.title}
                                                                </div>

                                                                {task.description?.trim() &&

                                                                    <div className="task-description">
                                                                        {task.description}
                                                                    </div>
                                                                }
                                                                {task.toDoDate?.trim() &&

                                                                    <div className="task-date">
                                                                        {FormateDate(task.toDoDate)}
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className="col-2 task-menuwrapper d-flex justify-content-center">
                                                                <div className="task-menu" onClick={() => setOpenTaskMenuId(openTaskMenuId === task.taskId ? null : task.taskId)}>

                                                                    <EllipsisVertical />
                                                                    {openTaskMenuId === task.taskId && (
                                                                        <div className="tasksubmenu">
                                                                            <div className="submenu-section">
                                                                                <div className="tasksubmenu-item" onClick={()=>handleDeleteTask(task.taskId)}>Delete</div>
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                </div>
                                                            </div>

                                                            <div className={`col-2 d-flex star-div justify-content-center mt-2 ${task.isStarred ? 'always-visible' : ''}`} onClick={()=>hendleUpdateStar(task.taskId)}><Star /></div>

                                                        </div>
                                                    ))
                                                }

                                            </div>
                                            :
                                            <h3 className="text-center">No task yet</h3>
                                    }

                                    {
                                        group.CompletedTaskList &&
                                        group.CompletedTaskList.length > 0 &&

                                        <div className="completed-task">
                                            <button className="btn">Completed</button>
                                            {
                                                group.CompletedTaskList.map(completeTask => {

                                                    <div key={completeTask.taskId} className="row">
                                                        <div className="col-1 d-flex justify-content-center"> <Check /></div>
                                                        <div className="col-7 task-details mt-2"
                                                            onClick={() => hendleEditTask(completeTask.taskId)}>
                                                            <div className="task-title">
                                                                {completeTask.title}
                                                            </div>

                                                            {completeTask.description?.trim() &&

                                                                <div className="task-description">
                                                                    {completeTask.description}
                                                                </div>
                                                            }
                                                            {completeTask.toDoDate?.trim() &&

                                                                <div className="task-date">
                                                                    {FormateDate(completeTask.toDoDate)}
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className="col-2 d-flex justify-content-center" >
                                                            <Trash2 onClick={handleDeleteTask(completeTask.taskId)} />
                                                        </div>

                                                        <div className="col-2 d-flex justify-content-center mt-2" onClick={hendleUpdateStar(completeTask.taskId, completeTask.isStarred)}><Star /></div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    }

                                </div>
                            </div>


                        ))
                    }
                </div>


            </div >

            {showAddorEditTaskModel == true &&
                <AddOrUpdateTask
                    show={showAddorEditTaskModel}
                    setShow={setShowAddorEditTaskModel}
                    onAddOrEdit={hendleAddOrEdit}
                    editTaskId={taskIdForEdit}
                    setEditTaskId={setTaskIdForEdit}
                    taskGroupId={gorupIdForAddTask}
                />
            }
        </div>
    )
}

export default Dashboard;