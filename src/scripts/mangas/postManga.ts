import axios from "axios";

const url = "https://manga-collection-backend.onrender.com";

export default async function postManga(data: any) {
    try {
        axios.post(`${url}/mangas`, data);
    } catch (error) {
        console.log(error);
    }
}
