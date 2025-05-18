
const BASE_URL = '/Tasks';

export const GetTaskList = async () => {
    const response = await fetch(`${BASE_URL}/task-list`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const GetTaskById = async (id) => {
    const response = await fetch(`${BASE_URL}/get/${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const SaveTask = async (item) => {
    const response = await fetch(`${BASE_URL}/save-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const GetTasksByGroupId = async (groupId) => {

    const response = await fetch(`${BASE_URL}/get-taskList-by-groupId/${groupId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}