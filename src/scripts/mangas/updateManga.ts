import axios from "axios";

export default function updateManga(id: string, data: any) {
    axios.patch(`http://localhost:8080/mangas/${id}`, data);
}
