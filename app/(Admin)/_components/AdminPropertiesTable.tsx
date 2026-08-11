"use client";

import { useState } from "react";
import Link from "next/link";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Eye, Pencil, Trash2 } from "lucide-react";
import DeleteConfirmationDialog from "@/components/ui/DeleteConfirmationDialog";
import EditPropertyDialog from "@/app/(Landlord)/_components/EditPropertyDialog";


// import { deleteProperty } from "../../_actions/adminActions";

interface Props {
    properties: any[];
}

export default function AdminPropertiesTable({
    properties,
}: Props) {
    const [selectedProperty, setSelectedProperty] = useState<any>(null);

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleDelete = async () => {
        if (!selectedProperty) return;

        // const res = await deleteProperty(selectedProperty.id)

        setDeleteOpen(false);
    };

    return (
        <>
            <div className="rounded-xl border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Rent</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Landlord</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {properties.map((property) => (
                            <TableRow key={property.id}>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">
                                            {property.title}
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {property.category.name}
                                </TableCell>

                                <TableCell>
                                    ${property.rent}/day
                                </TableCell>

                                <TableCell>
                                    <div className="text-sm">
                                        <p>{property.city}</p>
                                        <p className="text-muted-foreground">
                                            {property.area}
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div>
                                        <p className="font-medium">
                                            {property.landlord.name}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {property.landlord.email}
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        className={
                                            property.status === "AVAILABLE"
                                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                : property.status === "RENTED"
                                                    ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                                        }
                                    >
                                        {property.status}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            asChild
                                        >
                                            <Link href={`/properties/${property.id}`}>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>

                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={() => {
                                                setSelectedProperty(property);
                                                setEditOpen(true);
                                            }}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            onClick={() => {
                                                setSelectedProperty(property);
                                                setDeleteOpen(true);
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                        {properties.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="h-32 text-center"
                                >
                                    No properties found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <EditPropertyDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                property={selectedProperty}
            />

            <DeleteConfirmationDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                title="Delete Property"
                description="Are you sure you want to delete this property? This action cannot be undone."
                // confirmText="Delete"
                // loading={false}
                onConfirm={handleDelete}
            />
        </>
    );
}