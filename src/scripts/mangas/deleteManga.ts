import axios from "axios";

export default async function deleteManga(id: string) {
    axios.delete(`http://localhost:8080/mangas/${id}`);
}
