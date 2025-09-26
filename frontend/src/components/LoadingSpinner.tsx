export function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-6xl animate-spin">⏳</div>
    </div>
  );
}
