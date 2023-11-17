import axios from "axios";

export default async function searchManga(body: { option: string; input: string }) {
    try {
        const input = body.input.split(" ").join("+");
        const data = await axios.get(`http://localhost:8080/mangas/search-${body.option}-${input}`);
        data.status;
        return data.data;
    } catch (error) {
        return "error";
    }
}
