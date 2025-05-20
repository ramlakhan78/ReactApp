export const FormateDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "short",  // "Thu"
        month: "short",    // "May"
        day: "2-digit"     // "22"
    });
    //const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
}



 