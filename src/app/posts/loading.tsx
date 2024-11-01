export default function Loading() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-6 gap-2 sm:p-10">
      <h1 className="text-4xl font-bold mb-4 animate-pulse bg-gray-300 h-8 w-3/4 rounded"></h1>
      <p className="text-lg mb-4 animate-pulse bg-gray-300 h-6 w-full rounded"></p>
      <p className="text-sm text-gray-500 animate-pulse bg-gray-300 h-4 w-1/2 rounded"></p>
    </div>
  );
}
