export default interface IManga {
    _id: string;

    title: string;
    author: string;
    type: string;
    year: number;
    status: string;
    genre: string[];
    synopse: string;

    cover: string;
    url: string;
}
