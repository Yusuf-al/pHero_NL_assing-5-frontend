"use client";

import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { updatetLandlordProperties } from "../_actions/landlordActions";
import { toast } from "sonner";

interface EditPropertyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    property: any;
}

export default function EditPropertyDialog({
    open,
    onOpenChange,
    property,
}: EditPropertyDialogProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rent, setRent] = useState("");
    const [status, setStatus] = useState("AVAILABLE");
    const router = useRouter()

    useEffect(() => {
        if (!property) return;

        setTitle(property.title);
        setDescription(property.description);
        setRent(property.rent.toString());
        setStatus(property.status);
    }, [property]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedProperty = {
            title,
            description,
            rent: Number(rent),
            status,
        };

        const res = await updatetLandlordProperties(property.id, updatedProperty);

        if (res.success) {
            onOpenChange(false);
            router.refresh();
            toast.success(res.message)
        }

        toast.error(res.message)
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Property</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <Label>Title</Label>

                        <Input
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>

                        <Input
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Rent</Label>

                        <Input
                            type="number"
                            value={rent}
                            onChange={(e) =>
                                setRent(e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Status</Label>

                        <Select
                            value={status}
                            onValueChange={setStatus}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="AVAILABLE">
                                    Available
                                </SelectItem>

                                <SelectItem value="RENTED">
                                    Rented
                                </SelectItem>

                                <SelectItem value="UNAVAILABLE">
                                    Unavailable
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>

                        <Button type="submit">
                            Update Property
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}