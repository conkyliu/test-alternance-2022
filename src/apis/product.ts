// 导入axios实例
import httpRequest from "@/request/index";

// 定义接口的传参
interface UserInfoParam {
  userID: string;
  userName: string;
}

export function getProduce(param: any) {
  return httpRequest({
    url: "/api/2/search?json=true",
    method: "get",
    params: param,
  });
}
