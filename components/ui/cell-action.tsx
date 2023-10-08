"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

import { BillboardColumn } from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/billboard-columns";
import { CategoryColumn } from "@/app/(dashboard)/[storeId]/(routes)/categories/components/category-columns";
import { SizeColumn } from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/size-columns";

interface CellActionProps {
  data: BillboardColumn | CategoryColumn | SizeColumn;
  apiName: string;
  apiRoute: string;
}

export const CellAction: React.FC<CellActionProps> = ({ data, apiName, apiRoute }) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`${apiName} ID copied to clipboard.`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/${params.storeId}/${apiRoute}/${data.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(response.statusText);

      router.refresh();
      toast.success(`${apiName} deleted.`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} loading={loading} onConfirm={onDelete} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/${apiRoute}/${data.id}`)}>
            <Edit className="h-4 w-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
