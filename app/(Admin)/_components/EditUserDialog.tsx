"use client";

import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
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

//import { updateUser } from "../../_actions/adminActions";

export default function EditUserDialog({
    open,
    onOpenChange,
    user,
}: any) {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        role: "",
        isActive: "",
    });

    useEffect(() => {
        if (!user) return;

        setForm({
            name: user.name,
            phone: user.phone,
            address: user.address,
            role: user.role,
            isActive: user.isActive,
        });
    }, [user]);

    const submit = async () => {
        // await updateUser(user.id, form);

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>



                <div className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            value={form.address}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    address: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                            value={form.role}
                            onValueChange={(value) =>
                                setForm({ ...form, role: value })
                            }
                        >
                            <SelectTrigger id="role">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="ADMIN">ADMIN</SelectItem>
                                <SelectItem value="LANDLORD">LANDLORD</SelectItem>
                                <SelectItem value="TENANT">TENANT</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Account Status</Label>
                        <Select
                            value={form.isActive}
                            onValueChange={(value) =>
                                setForm({
                                    ...form,
                                    isActive: value,
                                })
                            }
                        >
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                                <SelectItem value="SUSPENDED">SUSPENDED</SelectItem>
                                <SelectItem value="BLOCKED">BLOCKED</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button onClick={submit} className="w-full">
                        Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}