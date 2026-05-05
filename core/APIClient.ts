import { APIRequestContext } from "@playwright/test";

export class APIClient {
constructor(protected request:APIRequestContext, protected baseURL:String)
{


}
async get(endpoint:string, headers?:any){
    return this.request.get(`${this.baseURL}${endpoint}`, { headers });
}
async post(endpoint:string, data: any, headers?:any){
    return this.request.get(`${this.baseURL}${endpoint}`, 
        {
         data,headers
    });
}

}