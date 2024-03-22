import { useQuery } from "@tanstack/react-query";
import { todoService } from "../api/todo/service";
import { useState } from "react";

export const Query01 = () => {
  const [visible, setVisible] = useState(false);
  const {
    data,
    isLoading,
    isPending,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  } = useTodo({ id: 4 });

  const handleRefetch = () => {
    refetch();
  };

  const show02 = () => {
    setVisible(true);
  };

  if (isPending) {
    return (
      <>
        <div>Loading...</div>
        <QueryStatus
          isError={isError}
          isFetching={isFetching}
          isLoading={isLoading}
          isPending={isPending}
        />
        ;
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div>Error</div>
        <QueryStatus
          isError={isError}
          isFetching={isFetching}
          isLoading={isLoading}
          isPending={isPending}
        />
      </>
    );
  }

  return (
    <div>
      <h4>title: {data.title}</h4>
      <button onClick={handleRefetch}>refetch</button>
      <button onClick={show02}>show test component</button>

      <QueryStatus
        isError={isError}
        isFetching={isFetching}
        isLoading={isLoading}
        isPending={isPending}
      />
      {visible && <TestComponent />}
    </div>
  );

  return null;
};

const TestComponent = () => {
  const { data, isPending, isError } = useTodo({ id: 4 });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h4>title: {data.title}</h4>
    </div>
  );
};

const useTodo = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ["test"],
    queryFn: () => todoService.getTodo({ id }),
    gcTime: 5000,
    staleTime: 3000,
  });
};

const QueryStatus = ({
  isLoading,
  isFetching,
  isError,
  isPending,
}: {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isPending: boolean;
}) => {
  return (
    <div style={{ position: "absolute", right: 0, top: 0 }}>
      <h4>isLoading: {String(isLoading)}</h4>
      <h4>isFetching: {String(isFetching)}</h4>
      <h4>isError: {String(isError)}</h4>
      <h4>isPending: {String(isPending)}</h4>
    </div>
  );
};
