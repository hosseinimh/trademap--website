import { HS_FILES_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class HSFile extends Entity {
    constructor() {
        super();
    }

    async getPaginate(hs, type, _pn = 1, _pi = 10) {
        return await this.handlePost(API_URLS.FETCH_HS_FILES, {
            hs: hs,
            type: type,
            _pn,
            _pi,
        });
    }

    async download(hs, type) {
        const response = await this.handleDownloadByPost(
            API_URLS.DOWNLOAD_HS_FILE + "/" + hs + "/" + type
        );

        if (!response) {
            return;
        }

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
            "download",
            `${hs} - ${type == 1 ? "Imports" : "Exports"}.txt`
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }
}
