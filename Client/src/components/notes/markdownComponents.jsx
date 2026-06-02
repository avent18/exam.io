/** @format */

export const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-2xl md:text-3xl font-bold mt-8 mb-4 pb-2 border-b border-white/10 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl md:text-2xl font-semibold text-indigo-200 mt-6 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-purple-200 mt-5 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-300 text-[15px] leading-7 mt-3 mb-3">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-violet-200 not-italic">{children}</em>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 space-y-2 mt-3 mb-4 text-gray-300 marker:text-purple-400">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 space-y-2 mt-3 mb-4 text-gray-300 marker:text-blue-400">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-gray-300 leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 pl-4 border-l-4 border-purple-400/60 bg-purple-500/10 rounded-r-lg py-3 pr-3 text-gray-300 italic">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="px-1.5 py-0.5 rounded-md bg-white/10 text-cyan-300 text-sm font-mono">
      {children}
    </code>
  ),
};
