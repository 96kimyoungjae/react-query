import { useSuspenseQuery } from "@tanstack/react-query";
import { todoService } from "../api/todo/service";

export const Query03 = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["test"],
    queryFn: () => todoService.getTodo({ id: 4 }),
    gcTime: 5000,
    staleTime: 3000,
  });

  throw new Error("Error");

  return (
    <div>
      <h4>title: {data.title}</h4>
    </div>
  );

  return null;
};
