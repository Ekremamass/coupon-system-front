import { toast } from "react-toastify";

class NotificationService {
  public success(msg: string) {
    toast.success(msg);
  }

  public error(msg:any){
    toast.error(this.msgFormatter(msg));
  }

  public msgFormatter(msg: any): string {
    const str = msg as any;
    if (str?.response?.data?.description) {
        return str?.response?.data?.description as string;
    }

    return "Something went wrong!!!"
}
}

const notifyService = new NotificationService();
export default notifyService;
