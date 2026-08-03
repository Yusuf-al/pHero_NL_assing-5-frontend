"use client";

import { useEffect, useState, useTransition } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";
import { updateRentalStatus } from "../_actions/landlordActions";
import { toast } from "sonner";
// import { updateRentalStatus } from "../../_actions/landlordActions";

export default function EditRentalStatusDialog({
    open,
    onOpenChange,
    request,
}: any) {
    const [status, setStatus] = useState("PENDING");

    const [pending, startTransition] = useTransition();

    const router = useRouter();

    useEffect(() => {
        if (request) {
            setStatus(request.status);
        }
    }, [request]);

    if (!request) return null;

    const handleSubmit = () => {
        startTransition(async () => {
            const res = await updateRentalStatus(request.id, status);

            if (res.success) {
                toast.success(res.message)
                onOpenChange(false)
                router.refresh()
            }

            onOpenChange(false);
            router.refresh();
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Update Rental Status</DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                    <div>
                        <p className="font-semibold">
                            {request.property.title}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            {request.tenant.name}
                        </p>
                    </div>

                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="PENDING">
                                Pending
                            </SelectItem>

                            <SelectItem value="APPROVED">
                                Approved
                            </SelectItem>

                            <SelectItem value="REJECTED">
                                Rejected
                            </SelectItem>

                            <SelectItem value="CANCELLED">
                                Cancelled
                            </SelectItem>
                            <SelectItem value="COMPLETED">
                                Completed
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        className="w-full"
                        disabled={pending}
                        onClick={handleSubmit}
                    >
                        {pending ? "Updating..." : "Update Status"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}