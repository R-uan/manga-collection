import axios from "axios";

const url = "https://manga-collection-backend.onrender.com";

export default async function getMangas() {
    try {
        const data = (await axios.get(`${url}/mangas`)).data;
        return data;
    } catch (error) {
        console.log(error);
        return "";
    }
}
