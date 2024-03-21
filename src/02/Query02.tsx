import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { Axios, AxiosError } from "axios";
import { useEffect, useState } from "react";

export const Query02 = () => {
  const { data } = useQuery({
    queryKey: ["test"],
    queryFn: () => Promise.resolve(5),
  });

  const { data: data2 } = useQuery({
    queryKey: ["test"],
    queryFn: () => Promise.resolve(5),
    select: (data) => data.toString(),
  });

  interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }

  const fetchTodoList = async () => {
    const { data } = await axios.get<Todo>(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    return data;
  };

  const { data: data3, isSuccess } = useQuery({
    queryKey: ["test3"],
    queryFn: fetchTodoList,
  });

  // isSuccess일 때 데이터 추론이 가능한 이유
  // discriminated union type
  if (isSuccess) {
    data3;
  }

  const { error } = useQuery({
    queryKey: ["test4"],
    queryFn: fetchTodoList,
  });

  console.log(error);

  const todoOptions = () => {
    return queryOptions({
      queryKey: ["Todo"],
      queryFn: fetchTodoList,
    });
  };

  const { data: data4 } = useQuery(todoOptions());
  const queryClient = useQueryClient();
  const d = queryClient.getQueryData(["Todo"]);
  const d2 = queryClient.getQueryData(todoOptions().queryKey);

  return null;
};

function TodoList({ category }) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const data = await axios.get(
          `https://jsonplaceholder.typicode.com/todos/${category}`
        );
      } catch (error: AxiosError) {
        setError(error);
      }
    };
  });
}
