import createHttp from "./http.service";

class ProductService {
    constructor() {
        this.http = createHttp("https://charming-plum-scarab.cyclic.app/api/product", true);
    }
    async getAll(sort, value) {
        const url = `/?${sort}=${value}`;
        return (await this.http.get(url)).data;
    }
    async create(data) {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        return (await this.http.post("/", data, config)).data;
    }
    async getSearch(search) {
        return (await this.http.get(`/search/${search}`)).data;
    }

    async get(id) {
        return (await this.http.get(`/${id}`)).data;
    }

    async update(id, data) {
        return (await this.http.put(`/${id}`, data)).data;
    }

    async delete(id) {
        return (await this.http.delete(`/${id}`)).data;
    }
}

export default new ProductService();