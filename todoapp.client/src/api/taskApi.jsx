
const BASE_URL = '/Task';

export const addTask = async (item) => {
    const response = await fetch(`${BASE_URL}/add-task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const getTaskList = async () => {
    const response = await fetch(`${BASE_URL}/task-list`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};