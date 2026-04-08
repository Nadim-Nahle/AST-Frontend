import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import { useCreateUser } from "../features/users/useCreateUser";
import { useDeleteUser } from "../features/users/UseDeleteUser";

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const limit = 5;

  const [editingUser, setEditingUser] = useState(null);
  const [open, setOpen] = useState(false);

  const createUser = useCreateUser();

  const deleteUser = useDeleteUser();

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
            className="flex items-center justify-between border p-3 rounded shadow-sm"
          >
            {/* LEFT SIDE (USER INFO) */}
            <div className="flex items-center gap-4">
              <img src={user.avatar} className="w-12 h-12 rounded-full" />

              <div>
                <p className="font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm">{user.jobTitle}</p>
              </div>
            </div>

            {/* RIGHT SIDE (ACTIONS) */}
            <div className="flex gap-3">
              {/* EDIT BUTTON */}
              <button
                onClick={() => {
                  setEditingUser(user); // 👈 THIS sets form data
                  setOpen(true); // 👈 opens modal
                }}
                className="text-blue-500"
              >
                Edit
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={() => {
                  if (confirm("Are you sure?")) {
                    deleteUser.mutate(user.id);
                  }
                }}
                className="text-red-500"
              >
                Delete
              </button>
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
