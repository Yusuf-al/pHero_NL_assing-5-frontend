"use client";

import { useState } from "react";
import { Eye, Pencil, BedDouble, Bath, Trash2 } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import EditPropertyDialog from "./EditPropertyDialog";
import DeleteConfirmationDialog from "@/components/ui/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { deleteProperty } from "../_actions/landlordActions";
import { toast } from "sonner";

// interface Property {
//     id: string;
//     title: string;
//     description: string;
//     rent: number;
//     address: string;
//     city: string;
//     area: string;
//     bedrooms: number;
//     bathrooms: number;
//     status: string;
// }

interface PropertyListProps {
    properties: any;
}

export default function PropertyList({
    properties,
}: PropertyListProps) {
    const [selectedProperty, setSelectedProperty] =
        useState<any>(null);

    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleEdit = (property: any) => {
        setSelectedProperty(property);
        setOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedProperty) return;

        setLoading(true);

        try {

            const res = await deleteProperty(selectedProperty.id);

            if (res.success) {
                toast.success("Item Deleted successfully")
                setDeleteOpen(false);
                router.refresh();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="rounded-xl border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Property</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Rent</TableHead>
                            <TableHead>Rooms</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {properties.length > 0 ? (
                            properties.map((property: any) => (
                                <TableRow key={property.id}>
                                    <TableCell className="min-w-[260px]">
                                        <div>
                                            <p className="font-semibold">
                                                {property.title}
                                            </p>

                                            <p className="text-sm text-muted-foreground line-clamp-1">
                                                {property.description}
                                            </p>
                                        </div>
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
                                        <span className="font-semibold">
                                            ${property.rent}
                                        </span>
                                        <span className="text-muted-foreground">
                                            /day
                                        </span>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <BedDouble className="h-4 w-4" />
                                                {property.bedrooms}
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <Bath className="h-4 w-4" />
                                                {property.bathrooms}
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <Badge
                                            variant={
                                                property.status === "AVAILABLE"
                                                    ? "default"
                                                    : property.status === "RENTED"
                                                        ? "ghost"
                                                        : "destructive"
                                            }
                                        >
                                            {property.status}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>

                                        <div className="flex justify-end gap-2">
                                            <Button size="icon" variant="outline" asChild>
                                                <Link href={`/properties/${property.id}`}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>

                                            <Button
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedProperty(property);
                                                    setOpen(true);
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
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    No properties found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <EditPropertyDialog
                open={open}
                onOpenChange={setOpen}
                property={selectedProperty}
            />
            <DeleteConfirmationDialog
                open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} />
        </>
    );
}