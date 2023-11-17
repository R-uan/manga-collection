import axios from "axios";

export default async function getMangas() {
    try {
        const data = (await axios.get("http://localhost:8080/mangas")).data;
        return data;
    } catch (error) {
        return "";
    }
}
