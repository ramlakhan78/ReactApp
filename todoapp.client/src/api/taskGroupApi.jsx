// src/api/taskGroupApi.jsx

const BASE_URL = '/TaskGroups';

export const addGroup = async (item) => {
    const response = await fetch(`${BASE_URL}/add-group`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const getAllGroupList = async () => {
    const response = await fetch(`${BASE_URL}/task-group-list`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};
