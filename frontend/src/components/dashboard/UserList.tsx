import UserCard from "./UserCard";

type Props = {
  users: any[];
  page: number;
  limit: number;
  isFetching: boolean;
  onEdit: (user: any) => void;
  onDelete: (id: string) => void;
  deleting: boolean;
};

export default function UsersList({
  users,
  page,
  limit,
  isFetching,
  onEdit,
  onDelete,
  deleting,
}: Props) {
  if (!users.length) {
    return (
      <div className="text-center py-12 text-gray-600 text-sm">
        <span className="text-gray-700">//</span> no users found
      </div>
    );
  }

  return (
    <div
      className={`space-y-2 min-h-[400px] transition-opacity duration-200 ${
        isFetching ? "opacity-50" : "opacity-100"
      }`}
    >
      {users.map((user, i) => (
        <UserCard
          key={user.id}
          user={user}
          index={i + 1 + (page - 1) * limit}
          onEdit={() => onEdit(user)}
          onDelete={() => onDelete(user.id)}
          isDeleting={deleting}
        />
      ))}
    </div>
  );
}
