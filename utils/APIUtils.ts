import { APIRequestContext } from "@playwright/test";
export class APIUtil{
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

//   async getUsers() {
//     const response = await this.request.get('/users');
//     return response;
//   }
}