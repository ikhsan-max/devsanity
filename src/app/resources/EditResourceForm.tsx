"use client"
import { useState } from "react";
import { updateResource } from "./actions";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Category } from "@prisma/client";
import { CATEGORIES } from "@/lib/categories";
import type { ResourceItemType } from "@/types/resource"
import SubmitButton from "./SubmitButton";

type Props = {
    resource: ResourceItemType
    onCancel: () => void
}
export default function EditResourceForm({resource, onCancel}: Props){
    const [category, setCategory] = useState<Category>(resource.category)

   
   
    
    return (
        <form action={updateResource} className="grid gap-4">
            <input type="hidden" name="id" value={resource.id} />
            <input type="hidden" name="category" value={category} />
            <div className="grid gap-2">
                <Label htmlFor={`title-${resource.id}`}>Title</Label>
                <Input
                    id={`title-${resource.id}`}
                    name="title"
                    defaultValue={resource.title}
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`url-${resource.id}`}>URL</Label>
                <Input
                    id={`url-${resource.id}`}
                    name="url"
                    defaultValue={resource.url}
                    required
                />
            </div>
             <div className="grid gap-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih category" />
                    </SelectTrigger>
                    <SelectContent>
                        {CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>  
                            {c}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label htmlFor={`notes-${resource.id}`}>Notes</Label>
                <Textarea
                    id={`notes-${resource.id}`}
                    name="notes"
                    defaultValue={resource.notes ?? ""}
                />
            </div>

            <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
            </Button>
            <SubmitButton
                idleText="Update"
                loadingText="Updating..."
                spinner={<Loader2 className="animate-spin" />}
            />
             </div>
      </form>
            
    
)}