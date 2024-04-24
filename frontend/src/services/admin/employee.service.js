import createApiAdmin from "./api.auth.service";

class EmployeeService {
    constructor(baseUrl = "/api/admin/employee") {
        this.api = createApiAdmin(baseUrl);
    }
}
export default new EmployeeService();