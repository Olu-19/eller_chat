const EmptyState = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-[100vh] flex justify-center items-center bg-gray-300 dark:bg-gray-900">
      <div className="text-center items-center flex flex-col">
        <h3 className="mt-2 text-lg font-semibold rounded-lg bg-gray-400 dark:bg-gray-700 px-2 text-gray-900 dark:text-gray-200">
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
