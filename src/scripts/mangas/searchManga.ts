import axios from "axios";

const url = "https://manga-collection-backend.onrender.com";

export default async function searchManga(body: { option: string; input: string }) {
    try {
        const input = body.input.split(" ").join("+");
        const data = await axios.get(`${url}/mangas/search-${body.option}-${input}`);
        data.status;
        return data.data;
    } catch (error) {
        console.log(error);
        return "error";
    }
}
