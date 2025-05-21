import { useContext, useState } from 'react';
import { Context } from '../global/MyContext';
import {
    SaveTask,
    GetAllGroupsTaskList,
    ToggleStarTask,
    GetStarredTask,
    DeleteTask,
    GetTaskById
} from '../api/TaskApi';

import {
    SaveGroup,
    GetAllGroupList,
    DeleteGroup,
    GetGroupById
} from '../api/TaskGroupApi';

export function useTaskEvents() {

    const {
        allGroupTaskList,
        setAllGroupTaskList,
        allStarredTasks,
        setallStarredTasks,
        taskGroups,
        setTaskGroups
    } = useContext(Context);

    const [showAddorEditTaskModel, setShowAddorEditTaskModel] = useState(false);
    const [taskIdForEdit, setTaskIdForEdit] = useState(0);
    const [gorupIdForAddTask, setGorupIdForAddTask] = useState(0);

    const hendleEditTask = (taskId) => {
        setTaskIdForEdit(taskId);
        setShowAddorEditTaskModel(true);
    };

    const handleAddTask = (GroupId) => {
        setGorupIdForAddTask(GroupId);
        setShowAddorEditTaskModel(true);
    };

    const hendleAddOrEdit = async (item) => {
        const res = await SaveTask(item);
        if (!res.isSuccess) {
            console.error("error while add or update task", res);
        }
        await updateTaskLists();
        setTaskIdForEdit(0);
        setGorupIdForAddTask(0);
    };

    const handleDeleteTask = async (taskId) => {
        const res = await DeleteTask(taskId);
        if (!res.isSuccess) {
            console.error("error while delete task", res);
        } else {
            await updateTaskLists();
        }
    };

    const hendleUpdateStar = async (taskId) => {
        let res = await ToggleStarTask(taskId);
        if (!res.isSuccess) {
            console.error(`error while calling hendleUpdateStar message '${res.message}'`);
        } else {
            await updateTaskLists();
        }
    };

    const handleCompleteTask = async (taskId, isComplete = true) => {
        const res = await GetTaskById(taskId);
        if (res.isSuccess) {
            const itemToComplete = { ...res.data, isCompleted: isComplete };
            await hendleAddOrEdit(itemToComplete);
        }
    };

    const handleRenameGroup = async (item) => {
        const result = await SaveGroup(item);
        if (!result.isSuccess) {
            console.error('Error renaming group :', result);
        }
        const allGroups = await GetAllGroupList();
        if (allGroups.data && allGroups.data.length > 0) {
            setTaskGroups(allGroups.data);
        }
        await updateGroupsTaskList();
    };

    const handleDeleteGroup = async (groupId) => {
        const res = await DeleteGroup(groupId);
        if (res.isSuccess) {
            const updatedGroupTaskList = allGroupTaskList.filter(group => group.groupId !== groupId);
            setAllGroupTaskList(updatedGroupTaskList);
            const updatedTaskGroups = taskGroups.filter(group => group.list !== groupId);
            setTaskGroups(updatedTaskGroups);
        } else {
            console.error("error while delete group", res);
        }
    };

    const updateGroupsTaskList = async () => {
        const res = await GetAllGroupsTaskList();
        if (res.isSuccess) {
            setAllGroupTaskList(res.data);
        } else {
            console.error("Failed or unexpected response:", res.message, res.data);
        }
    };

    const updateTaskLists = async () => {
        const res = await GetAllGroupsTaskList();
        if (res.isSuccess) {
            setAllGroupTaskList(res.data);
        } else {
            console.error("Failed or unexpected response:", res.message, res.data);
        }
        const starredTask = await GetStarredTask();
        if (starredTask.isSuccess) {
            setallStarredTasks(starredTask.data);
        } else {
            console.error("Failed or unexpected response:", starredTask.message, starredTask.data);
        }
    };
    const handleSort = async (option, groupId) => {
        const group = await GetGroupById(groupId);
        const res = await SaveGroup({ ...group.data, sortBy: option });
        if (!res.isSuccess) {
            console.log("error while calling api for save group", res);
            return;
        }

        await updateTaskLists();

    };

    return {
        showAddorEditTaskModel, setShowAddorEditTaskModel,
        taskIdForEdit, setTaskIdForEdit,
        gorupIdForAddTask, setGorupIdForAddTask,
        hendleEditTask,
        handleAddTask,
        hendleAddOrEdit,
        handleDeleteTask,
        hendleUpdateStar,
        handleCompleteTask,
        handleRenameGroup,
        handleDeleteGroup,
        updateGroupsTaskList,
        updateTaskLists,
        allGroupTaskList,
        setAllGroupTaskList,
        allStarredTasks,
        setallStarredTasks,
        taskGroups,
        setTaskGroups,
        handleSort
    };
}