import createHttp from "./http.service";

class ProductService {
    constructor() {
            this.http = createHttp("https://charming-plum-scarab.cyclic.app/api/user", true);
        }
        // async loginAdmin(data) {
        //     return (await this.http.post('/loginAdmin', data)).data;
        // }
    async login(data) {
        return (await this.http.post('/login', data)).data;
    }
    async register(data) {
        return (await this.http.post('/register', data)).data;
    }
    async logout() {
        return (await this.http.get('/logout')).data;
    }
    async getallUser() {
        return (await this.http.get('/all-user')).data;
    }
    async getById(id) {
        return (await this.http.get(`${id}`)).data;
    }
    async deletel(id) {
        return (await this.http.delete(`${id}`)).data;
    }
    async update(id, data) {
        return (await this.http.put(`/${id}`, data)).data;
    }
}

export default new ProductService();