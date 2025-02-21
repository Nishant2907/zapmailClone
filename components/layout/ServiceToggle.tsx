"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

import Google from "@/public/assets/service/google.svg";
import Microsoft from "@/public/assets/service/microsoft.svg";

export default function WorkspaceToggle() {
    const [selected, setSelected] = useState<"google" | "microsoft">("google");

    return (
        <ToggleGroup
            type="single"
            value={selected}
            onValueChange={(value) => value && setSelected(value as "google" | "microsoft")}
            className="flex border rounded-xl p-1 gap-2 w-fit"
        >
            {/* Google Workspace */}
            <ToggleGroupItem
                value="google"
                className={cn(
                    "p-2 h-fit text-sm font-medium flex items-center rounded-lg transition hover:bg-purple-100",
                    selected === "google"
                        ? " border border-purple-700 data-[state=on]:bg-purple-100"
                        : "opacity-80"
                )}
            >
                <img src={Google.src} alt="Google Workspace" className="h-4" />
            </ToggleGroupItem>

            {/* Microsoft 365 */}
            <ToggleGroupItem
                value="microsoft"
                className={cn(
                    "p-2 h-fit text-sm font-medium flex items-center rounded-lg transition hover:bg-purple-100",
                    selected === "microsoft"
                        ? " border border-purple-700 data-[state=on]:bg-purple-100"
                        : "opacity-80"
                )}
            >
                <img src={Microsoft.src} alt="Microsoft 365" className="h-4" />
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
