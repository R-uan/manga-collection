import axios from "axios";

const url = "https://manga-collection-backend.onrender.com";

export default function updateManga(id: string, data: any) {
    try {
        axios.patch(`${url}/mangas/${id}`, data);
    } catch (error) {
        console.log(error);
    }
}
