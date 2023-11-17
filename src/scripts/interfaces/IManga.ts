export default interface Manga {
    _id: string;
    info: {
        title: string;
        author: string;
        type: string;
        year: number;
        status: string;
        genre: string[];
        synopse: string;
    };
    link: {
        cover: string;
        url: string;
    };
    stats: {
        views: number;
        reading: number;
        planning: number;
        dropped: number;
        completed: number;
    };
}
