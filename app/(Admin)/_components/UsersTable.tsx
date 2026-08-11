"use client";

import { useState } from "react";

import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import UpdateUserRoleDialog from "./UpdateUserRoleDialog";
import UpdateUserStatusDialog from "./UpdateUserStatusDialog";
// import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

export default function UsersTable({
    users,
}: {
    users: any[];
}) {
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const [roleOpen, setRoleOpen] = useState(false);

    const [statusOpen, setStatusOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <div className="rounded-xl border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src={
                                                user.profileImage ||
                                                "https://ui-avatars.com/api/?name=User"
                                            }
                                            width={45}
                                            height={45}
                                            alt={user.name}
                                            className="rounded-full"
                                            unoptimized
                                        />

                                        <div>
                                            <p className="font-medium">
                                                {user.name}
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <Badge>{user.role}</Badge>
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        className={
                                            user.isActive === "ACTIVE"
                                                ? "bg-green-600"
                                                : user.isActive === "BLOCKED"
                                                    ? "bg-red-600"
                                                    : "bg-yellow-600"
                                        }
                                    >
                                        {user.isActive}
                                    </Badge>
                                </TableCell>

                                <TableCell>{user.phone}</TableCell>

                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setRoleOpen(true);
                                            }}
                                        >
                                            Role
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setStatusOpen(true);
                                            }}
                                        >
                                            Status
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setDeleteOpen(true);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <UpdateUserRoleDialog
                open={roleOpen}
                onOpenChange={setRoleOpen}
                user={selectedUser}
            />

            <UpdateUserStatusDialog
                open={statusOpen}
                onOpenChange={setStatusOpen}
                user={selectedUser}
            />

            {/* <DeleteConfirmationDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title="Delete User"
                description="This action cannot be undone."
                onConfirm={async () => {
                    // delete action
                }}
            /> */}
        </>
    );
}