"use client";

import { useState } from "react";

export default function ShareButtons({
  url,
  text,
}: {
  url: string;
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

  return (
    <div className="flex gap-3">
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-violet-200 px-4 py-2 text-sm font-medium text-gray-900 transition-all hover:border-violet-400 hover:bg-violet-50 dark:border-violet-800 dark:text-white dark:hover:border-violet-600 dark:hover:bg-violet-950/30"
      >
        Share on X
      </a>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-xl border border-violet-200 px-4 py-2 text-sm font-medium text-gray-900 transition-all hover:border-violet-400 hover:bg-violet-50 dark:border-violet-800 dark:text-white dark:hover:border-violet-600 dark:hover:bg-violet-950/30"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
