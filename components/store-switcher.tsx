"use client";

import { Store } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import path from "path";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export default function StoreSwitcher({ className, items = [] }: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find((item) => item.value === params.storeId);

  const [open, setOpen] = useState(false);

  const onStoreSelect = (store: { label: string; value: string }) => {
    setOpen(false);
    router.push(`/${store.value}/${pathname.split("/").slice(2).join("/")}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" role="combobox" aria-expanded={open} aria-label="Select a store" className={cn("w-[200px] justify-between", className)}>
          <StoreIcon className="mr-2 h-4 w-4" />
          Current Store
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem key={store.value} onSelect={() => onStoreSelect(store)} className="text-sm">
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check className={cn("ml-auto h-4 w-4", currentStore?.value === store.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandItem
              onSelect={() => {
                setOpen;
                storeModal.onOpen();
              }}
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Store
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
