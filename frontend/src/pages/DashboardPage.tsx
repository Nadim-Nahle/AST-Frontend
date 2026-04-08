import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import { useCreateUser } from "../features/users/useCreateUser";

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const limit = 5;

  const [open, setOpen] = useState(false);

  const createUser = useCreateUser();

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page, limit),
    placeholderData: (prev) => prev,
  });

  // 🧪 Loading states
  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Users Dashboard</h2>

      {/* 🔥 Create button */}
      <button onClick={() => setOpen(true)}>Create User</button>

      {/* 🔥 Modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <UserForm
          onSubmit={(data) => {
            createUser.mutate(data);
            setOpen(false);
          }}
        />
      </Modal>

      {/* 🔥 Page loading indicator */}
      {isFetching && <p>Loading new page...</p>}

      {/* USERS LIST */}
      <div>
        {data.data.map((user: any) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <img
              src={user.avatar}
              alt="avatar"
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
            />

            <div>
              <strong>
                {user.firstName} {user.lastName}
              </strong>
              <p>{user.email}</p>
              <p>{user.jobTitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div style={{ marginTop: 20 }}>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

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
