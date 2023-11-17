import { Stats } from "./Stats";
import { Info } from "./Info";
import { Link } from "./Link";

export default class {
    _id: string;
    info: Info;
    link: Link;
    stats: Stats;
    constructor() {
        this._id = "";
        this.info = { title: "", author: "", type: "", year: 0, status: "", genre: [], synopse: "" };
        this.link = { cover: "", url: "" };
        this.stats = { views: 0, reading: 0, planning: 0, dropped: 0, completed: 0 };
    }
}
