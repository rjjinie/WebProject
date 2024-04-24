import createApiClient from "./api.reader"

class ReaderService {
    constructor(baseUrl = "/api/reader") {
        this.apiClient = createApiClient(baseUrl)
    }

    async create(userData) {
        try {
            const response = await this.apiClient.post('/register', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getInfo(id) {
        return (await this.apiClient.get(`/${id}`)).data;
    }

    async updateInfo(id, data) {
        return (await this.apiClient.put(`${id}`, data)).data;
    }
}
export default new ReaderService();
