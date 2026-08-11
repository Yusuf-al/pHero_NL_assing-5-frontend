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
import { updateUserRole } from "../_actions/adminActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
}

export default function UpdateUserRoleDialog({
    open,
    onOpenChange,
    user,
}: Props) {
    const [role, setRole] = useState("");
    const router = useRouter()

    useEffect(() => {
        if (user) {
            setRole(user.role);
        }
    }, [user]);

    const handleSubmit = async () => {
        if (!user) return;

        const res = await updateUserRole(user.id, role);
        if (res.success) {
            toast.success(res.message)
            onOpenChange(false)
            router.refresh()
        }
        if (!res.success) {

            toast.error(res.message)
        }

        onOpenChange(false);
    };

    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Update User Role</DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <Label>User</Label>
                        <p className="rounded-md border bg-muted p-2 text-sm">
                            {user.name}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Role</Label>

                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                                <SelectItem value="LANDLORD">Landlord</SelectItem>
                                <SelectItem value="TENANT">Tenant</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        className="w-full"
                        onClick={handleSubmit}
                    >
                        Update Role
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}