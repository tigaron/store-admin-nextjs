"use client";

import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import EditableText from "@/components/ui/edit-text";
import { useState } from "react";

interface APIAltertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
  editLabel?: string;
}

const textMap: Record<APIAltertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<APIAltertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const APIAlert: React.FC<APIAltertProps> = ({ title, description, variant, editLabel }) => {
  const [editableText, seteditableText] = useState(editLabel || "");

  const onCopy = () => {
    navigator.clipboard.writeText(description + editableText);
    toast.success("API route copied to clipboard.");
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded overflow-x-auto bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
          {editLabel && <EditableText value={editableText} onChange={seteditableText} />}
        </code>
        <Button variant="outline" size="sm" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
