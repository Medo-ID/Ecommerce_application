const url = "http://localhost:3000";

export const getTitles = async () => {
    const response = await fetch(`${url}/titles`);
    const titles = await response.json();
    return titles;
}