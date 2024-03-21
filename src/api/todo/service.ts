import { IHttpClient, backendHttpClient } from "../httpClient";

import { GetTodoResponse } from "./response";

type ITodoService = {
  getTodo({ id }: { id: number }): Promise<GetTodoResponse>;
};

class TodoService implements ITodoService {
  constructor(private httpClient: IHttpClient) {}

  async getTodo({ id }: Parameters<ITodoService["getTodo"]>[0]) {
    const { data } = await this.httpClient.request<GetTodoResponse>({
      method: "GET",
      url: `/todos/${id}`,
    });

    return data;
  }

  async getTodoList() {
    const { data } = await this.httpClient.request<GetTodoResponse>({
      method: "GET",
      url: "/items/deal-items-v3",
    });

    return data;
  }
}

export const todoService = new TodoService(backendHttpClient);
