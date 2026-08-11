"use client";

import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateUserStatus } from "../_actions/adminActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
}

export default function UpdateUserStatusDialog({
    open,
    onOpenChange,
    user,
}: Props) {
    const [status, setStatus] = useState("");
    const router = useRouter()

    useEffect(() => {
        if (user) {
            setStatus(user.isActive);
        }
    }, [user]);

    const handleSubmit = async () => {
        if (!user) return;

        const res = await updateUserStatus(user.id, status);
        if (res.success) {
            toast.success(res.message)
            onOpenChange(false)
            router.refresh();
        }
        toast.error(res.message)
        onOpenChange(false);
    };

    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Update User Status</DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <Label>User</Label>

                        <p className="rounded-md border bg-muted p-2 text-sm">
                            {user.name}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Status</Label>

                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="SUSPENDED">Suspended</SelectItem>
                                <SelectItem value="BLOCKED">Blocked</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        className="w-full"
                        onClick={handleSubmit}
                    >
                        Update Status
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}