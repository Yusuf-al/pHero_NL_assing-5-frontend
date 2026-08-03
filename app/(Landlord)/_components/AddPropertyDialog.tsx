"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useActionState, useEffect, useState } from "react";
import { createNewProperty } from "../_actions/landlordActions";
import { initialState } from "@/app/(Auth)/login/page";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AddPropertyDialog({
    open,
    onOpenChange,
}: Props) {

    const [state, action, isPending] = useActionState(createNewProperty, initialState)
    const [category, setCategory] = useState("");
    const router = useRouter()

    useEffect(() => {
        if (!state.message) return

        if (state.success) {
            toast.success(state.message)
            router.push('/landlord/dashboard')
        } else {
            toast.error(state.message)
        }
        onOpenChange(false)

    }, [state])
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Add Property</DialogTitle>
                </DialogHeader>

                <form action={action} className="space-y-4">

                    <Input
                        name="title"
                        placeholder="Property Title"
                    />
                    <Input
                        name="description"
                        placeholder="Property description"
                    />

                    <Input
                        name="rent"
                        type="number"
                        placeholder="Rent"
                    />

                    <Input
                        name="city"
                        placeholder="City"
                    />

                    <Input
                        name="area"
                        placeholder="Area"
                    />

                    <Input
                        name="address"
                        placeholder="Address"
                    />
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>

                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="APARTMENT">Apartment</SelectItem>
                                <SelectItem value="HOUSE">House</SelectItem>
                                <SelectItem value="VILLA">Villa</SelectItem>
                                <SelectItem value="STUDIO">Studio</SelectItem>
                                <SelectItem value="HOSTEL">Hostel</SelectItem>
                            </SelectContent>
                        </Select>
                        <input type="hidden" name="category" value={category} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            name="bedrooms"
                            type="number"
                            placeholder="Bedrooms"
                        />

                        <Input
                            name="bathrooms"
                            type="number"
                            placeholder="Bathrooms"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        {isPending ? "submitting" : "Create Property"}
                    </Button>

                </form>
            </DialogContent>
        </Dialog>
    );
}