import axios from "axios";

const url = "https://manga-collection-backend.onrender.com";

export default async function deleteManga(id: string) {
    try {
        axios.delete(`${url}/mangas/${id}`);
    } catch (error) {
        console.log(error);
    }
}
