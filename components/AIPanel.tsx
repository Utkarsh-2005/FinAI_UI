'use client';
export default function AIPanel() {
  return (
    <div className="h-full p-6 flex flex-col bg-gradient-to-br from-purple-100 via-purple-50 to-pink-50">
      <div className="h-[75%] flex items-center">
          <div className="mb-4 text-center">
          <div className="inline-block">
               <img src="/logo.png" alt="Fin logo" className="h-9 w-9" />
          </div>
        <h2 className="text-xl font-semibold">Hi, I’m Fin AI Copilot</h2>
        <p className="text-gray-600">Ask me anything about this conversation.</p>
      </div>
      </div>

      {/* <div className="space-y-2 flex-1 overflow-auto">
    
      </div> */}

      {/* Suggested chips */}
      <div className="mt-4 space-x-2 overflow-x-auto">
        {['How do I get a refund?', 'My tone of voice', 'Fix grammar'].map(s => (
          <button
            key={s}
            className="px-3 py-1 bg-white bg-opacity-70 rounded-full text-sm font-medium shadow-sm hover:bg-opacity-100"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Ghost input */}
      <div className="mt-4 flex items-center bg-white bg-opacity-50 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-inner">
        <input
          type="text"
          placeholder="Ask a question..."
          className="flex-1 bg-transparent focus:outline-none placeholder-gray-500"
        />
        <button className="ml-2">
          <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth={2} />
          </svg>
        </button>
      </div>
    </div>
  );
}
