import { useState } from "react";

export default function ListSection({ title, lists }) {
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold uppercase text-gray-400">{title}</h3>
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-gray-400 hover:text-gray-200 text-xs"
                >
                    {expanded ? "Hide" : "Show"}
                </button>
            </div>

            {expanded && (
                <ul className="space-y-1">
                    {lists.map((list, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked className="accent-blue-500" />
                            <span className="truncate">{list}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
