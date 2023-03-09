import { HS_CODES_API_URLS as API_URLS } from "../../constants";
import Entity from "./Entity";

export class HSCode extends Entity {
    constructor() {
        super();
    }

    async getPaginate(hs, type, _pn = 1, _pi = 10) {
        return await this.handlePost(API_URLS.FETCH_HS_CODES, {
            hs: hs,
            type: type,
            _pn,
            _pi,
        });
    }
}
