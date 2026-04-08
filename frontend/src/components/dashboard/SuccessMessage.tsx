export default function SuccessMessage({ message }: { message: string }) {
  if (!message) return null;

  return (
    <div className="mb-4 p-3 border border-green-900 bg-green-950/30 rounded animate-fade-in">
      <p className="text-xs text-green-400">
        <span className="text-green-500">SUCCESS:</span> {message}
      </p>
    </div>
  );
}
