"use client"
import { useState } from "react";
import { updateResource } from "./actions";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Category } from "@prisma/client";
import { CATEGORIES } from "@/lib/categories";

type Resource = {
    id: number
    title: string
    url: string
    category: Category
    used: boolean
    notes: string | null
    createdAt: Date 
}

type Props = {
    resource: Resource
}
export default function EditResourceForm({resource}: Props){
    const [category, setCategory] = useState<string>(resource.category)

   
   
    
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
                <Select value={category} onValueChange={setCategory}>
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
            <Button type="submit">
            Update
            </Button>
            
             </div>
      </form>
            
    
)}