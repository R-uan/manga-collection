import axios, { isAxiosError } from "axios";
import IMangaPost from "./interfaces/IMangaPost";
const url = "http://localhost:8080";

export abstract class MangaRequests {
    static async FetchAll() {
        try {
            const response = (await axios.get(`${url}/mangas`)).data;
            return response;
        } catch (error) {
            if (isAxiosError(error)) {
                throw "Could Not Reach API";
            } else throw "Unexpected Error";
        }
    }

    static async SearchManga(params: { option: string; input: string }) {
        try {
            const input = params.input.split(" ").join("+");
            const data = await axios.get(`${url}/mangas/search-${params.option}-${input}`);
            return data.data;
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status == 404) throw "NOT FOUND";
                else if (error.response?.status == 400) throw "BAD REQUEST";
                else throw "UNEXPECTED ERROR";
            }
        }
    }

    static async PostManga(data: IMangaPost) {
        try {
            const request = await axios.post(`${url}/mangas`, data);
            return request;
        } catch (error) {
            if (isAxiosError(error))
                if (error.response?.status == 400) {
                    throw `Bad Request - Missing required fields ${error.response.data.missing}`;
                } else if (error.response?.status == 500) throw `Internal Server Error`;
        }
    }

    static async UpdateManga(id: string, data: any) {
        try {
            const request = await axios.patch(`${url}/mangas/${id}`, data);
            return request;
        } catch (error) {
            if (isAxiosError(error))
                if (error.response?.status == 400) {
                    throw `Bad Request - Missing required fields ${error.response.data.missing}`;
                } else if (error.response?.status == 500) throw `Internal Server Error`;
        }
    }

    static async DeleteManga(id: string) {
        try {
            const request = await axios.delete(`${url}/mangas/${id}`);
            if (request.status == 200) return `Deleted Successfuly`;
        } catch (error) {
            if (isAxiosError(error))
                if (error.response?.status == 400) {
                    throw `Invalid ID ${error.response.data.message}`;
                } else if (error.response?.status == 500) throw `Internal Server Error`;
        }
    }
}
