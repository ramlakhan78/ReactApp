import React, { createContext, useState, useEffect } from 'react';
import { GetAllGroupList } from '../api/TaskGroupApi';
import { GetAllGroupsTaskList } from '@/api/TaskApi';

export const Context = createContext();

export const MyContextProvider = ({ children }) => {
    const [taskGroups, setTaskGroups] = useState([]);
    const [allGroupTaskList, setAllGroupTaskList] = useState([]);

    useEffect(() => {
        (async () => {
            await getAllGroups();
            await getAllGroupsTask();
        })();
    }, []);

    const getAllGroups = async () => {
        const allGroups = await GetAllGroupList();
        if (allGroups.data && allGroups.data.length > 0) {
            setTaskGroups(allGroups.data);
        }
    };

    const getAllGroupsTask = async () => {
        const res = await GetAllGroupsTaskList();
        if (res.isSuccess) {
            setAllGroupTaskList(res.data);
        } else {
            console.error("Failed or unexpected response:", res.message, res.data);
        }
    };

    return (
        <Context.Provider value={{ taskGroups, setTaskGroups, allGroupTaskList, setAllGroupTaskList }}>
        {children}
    </Context.Provider>
    );

}  