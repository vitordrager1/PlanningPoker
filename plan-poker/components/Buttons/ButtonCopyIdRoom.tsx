"use client";
import { usePathname } from "next/navigation";
import { ReactElement, useState } from "react";
import { Button } from "@mui/material";

interface ButtonCopyIdRoomProps {
  roomId: string;
}

export default function ButtonCopyIdRoom({
  roomId,
}: ButtonCopyIdRoomProps): ReactElement {
  const pathname = usePathname();
  const fullUrl =
    typeof window !== "undefined" ? window.location.origin + pathname : "";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reseta após 2s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant="outlined"
      color="success"
      className="text-teal-600 px-4 py-2 rounded-md hover:bg-emerald-600 hover:text-white transition w-36"
    >
      {copied ? "Copied!" : "Copy Id room"}
    </Button>
  );
}
