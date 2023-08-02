class UrlService {
  private port = 8080;
    private baseUrl = `http://localhost:${this.port}`;
    public admin = this.baseUrl + "/api/admin";
  public company = this.baseUrl + "/api/company";
  public customer = this.baseUrl + "/api/customer";
  public auth = this.baseUrl + "/api/auth";
}

const urlService = new UrlService();
export default urlService;
