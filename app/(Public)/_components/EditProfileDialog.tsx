"use client";

import { useActionState, useEffect, useState } from "react";
import { Edit } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { IUser } from "@/lib/types";
import { ActionState, updateProfile } from "@/app/(Auth)/_actions/authAction";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

interface Props {
    user: IUser;
}

const initialState: ActionState = {
    success: false,
    message: "",
};

export default function EditProfileDialog({ user }: Props) {
    const [open, setOpen] = useState(false);
    const router = useRouter()

    const [state, formAction, isPending] = useActionState<ActionState, FormData>(
        updateProfile,
        initialState
    );

    const [formData, setFormData] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        address: user?.address || "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);
            router.refresh();
        } else {
            toast.error(state.message);
        }
        setOpen(false);
    }, [state, router]);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button className="rounded-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        Edit Profile
                    </DialogTitle>

                    <DialogDescription>
                        Update your personal information below.
                    </DialogDescription>
                </DialogHeader>

                <form
                    action={formAction}
                    className="space-y-5"
                >
                    {/* Name */}
                    <input
                        type="hidden"
                        name="id"
                        value={user?.id}
                    />
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Name
                        </Label>

                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email
                        </Label>

                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={user.email}
                            onChange={handleChange}
                            disabled
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <Label htmlFor="phone">
                            Phone
                        </Label>

                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                        />
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <Label htmlFor="address">
                            Address
                        </Label>

                        <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending
                                ? <Spinner>
                                    "Saving..."
                                </Spinner>
                                : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}