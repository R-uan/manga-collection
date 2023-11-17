import axios from "axios";

export default async function postManga(
    event: React.FormEvent<HTMLFormElement>,
    setModalStatus: any
) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = {
        title: form._title.value,
        author: form.author.value,
        type: form.type.value,
        year: form.year.value,
        status: form.status.value,
        genre: form.genre.value.split(",").map((x: string) => {
            return x.trim();
        }),
        synopse: form.synopse.value,
        cover: form.cover.value,
        url: form.url.value,
    };
    axios.post("http://localhost:8080/mangas/", data);
    setModalStatus(false);
}
