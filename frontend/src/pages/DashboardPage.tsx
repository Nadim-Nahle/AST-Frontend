import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";
import type { User } from "../types/user";

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page, limit),
    placeholderData: (prev) => prev,
  });

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
      <h2>Users</h2>

      {/* 🔥 Page transition loading */}
      {isFetching && <p>Loading new page...</p>}

      {/* USERS */}
      {data.data.map((user: User) => (
        <div key={user.id} style={{ border: "1px solid gray", margin: 10 }}>
          <img src={user.avatar} width={50} />
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>{user.email}</p>
          <p>{user.jobTitle}</p>
        </div>
      ))}

      {/* PAGINATION */}
      <div>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span> Page {page} </span>

        <button
          disabled={page === data.totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
