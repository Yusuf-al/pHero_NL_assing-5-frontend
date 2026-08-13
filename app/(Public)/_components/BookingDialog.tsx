"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

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
import { makeRentalRequest } from "../_actions/getProperties";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";


interface BookingDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    propertyId: string;
}

export default function BookingDialog({
    open,
    onOpenChange,
    propertyId,
}: BookingDialogProps) {

    const [moveInDate, setMoveInDate] = useState("");
    const [moveOutDate, setMoveOutDate] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const handleContinue = () => {
        if (!moveInDate || !moveOutDate) return;

        startTransition(async () => {
            try {
                const res = await makeRentalRequest(propertyId, {
                    moveInDate,
                    moveOutDate,
                    message,
                });

                if (!res.success) {
                    toast.error(res.message);
                } else {
                    // both branches do the same thing, so just do it once
                    setMoveInDate("");
                    setMoveOutDate("");
                    setMessage("");
                    onOpenChange(false)
                    toast.success("Booking request has been submitted")
                    router.push(`/bookings/${res.data.id}`)
                }

            } catch (error) {
                console.error("Rental request failed:", error);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Book Property</DialogTitle>
                </DialogHeader>

                <div className="space-y-5 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="moveIn">Move-in Date</Label>
                        <Input
                            id="moveIn"
                            name="moveInDate"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={moveInDate}
                            onChange={(e) => setMoveInDate(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="moveOut">Move-out Date</Label>
                        <Input
                            id="moveOut"
                            name="moveOutDate"
                            type="date"
                            min={moveInDate || new Date().toISOString().split("T")[0]}
                            value={moveOutDate}
                            onChange={(e) => setMoveOutDate(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="moveOut">Message</Label>
                        <Input
                            id="moveOut"
                            type="text"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleContinue}
                        disabled={
                            !moveInDate ||
                            !moveOutDate ||
                            new Date(moveOutDate) <= new Date(moveInDate)
                        }
                    >
                        {isPending ? <Badge variant="secondary">
                            <Spinner data-icon="inline-start" />
                            Submitting...
                        </Badge> : "Continue"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}