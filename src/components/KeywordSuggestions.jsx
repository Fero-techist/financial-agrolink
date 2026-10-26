import { useState } from "react";

export default function KeywordSuggestions({
  title,
  suggestions,
  value,
  onChange,
}) {
  const [keyword, setKeyword] = useState("");

  function addKeyword(text) {
    const normalizedKeyword = text.trim();
    if (
      !normalizedKeyword ||
      value.some(
        (selected) => selected.toLowerCase() === normalizedKeyword.toLowerCase(),
      )
    ) {
      setKeyword("");
      return;
    }
    onChange([...value, normalizedKeyword]);
    setKeyword("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addKeyword(keyword);
    }
  }

  return (
    <section className="rounded-2xl border border-[#e5ece4] bg-white p-5 shadow-[0_4px_9px_rgba(20,55,35,0.026)] sm:p-7">
      <h2 className="text-lg font-semibold text-[#07512f]">
        {title}
      </h2>
      <input
        type="text"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a keyword and press Enter"
        aria-label={`Add ${title.toLowerCase()} keyword`}
        className="mt-4 min-h-14 w-full rounded-lg border border-[#dfe8df] bg-white px-4 py-3 text-base text-[#1b3025] outline-none transition placeholder:text-[#8b9990] hover:border-[#bdcfbf] focus:border-[#07512f] focus:ring-4 focus:ring-[#07512f]/[0.08]"
      />
      {value.length > 0 && (
        <ul
          aria-label={`Selected ${title.toLowerCase()}`}
          className="mt-3 flex flex-wrap gap-2"
        >
          {value.map((item) => (
            <li
              key={item}
            >
              <button
                type="button"
                onClick={() =>
                  onChange(value.filter((selected) => selected !== item))
                }
                aria-label={`Remove ${item}`}
                className="min-h-10 rounded-lg bg-[#dceee1] px-3 py-2 text-sm font-medium text-[#07512f] transition hover:bg-[#cce4d2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f]"
              >
                {item} <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((suggestion) => {
          const isSelected = value.some(
            (item) => item.toLowerCase() === suggestion.toLowerCase(),
          );
          return (
            <button
              key={suggestion}
              type="button"
              aria-pressed={isSelected}
              onClick={() =>
                onChange(
                  isSelected
                    ? value.filter(
                        (item) =>
                          item.toLowerCase() !== suggestion.toLowerCase(),
                      )
                    : [...value, suggestion],
                )
              }
              className={`min-h-10 rounded-lg px-3 py-2 text-sm font-medium text-[#07512f] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07512f] ${
                isSelected
                  ? "bg-[#d6eadb]"
                  : "bg-[#eef4ea] hover:bg-[#e2eee2]"
              }`}
            >
              {suggestion}
            </button>
          );
        })}
      </div>
    </section>
  );
}
