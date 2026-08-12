import { MapPin, BedDouble, Bath, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { getAllProperties } from "../_actions/getProperties";
import { IProperties } from "@/lib/types";
import Link from "next/link";

import CityFilter from "../_components/cityFilter";
import RangeFilter from "../_components/rangeFilter";
import CategoryFilter from "../_components/categoryFilter";
import BedroomFilter from "../_components/bedRoomFilter";
import Pagination from "@/components/shared/pagination";


export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const query = await searchParams;
  const AllProperties = await getAllProperties({ query })
  const properties: IProperties[] = AllProperties.data

  console.log(AllProperties.meta)



  return (

    <main className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:sticky lg:top-24 h-fit rounded-3xl border bg-card p-5 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Search & Filters</h2>

              <div className="space-y-2">
                <CityFilter />
              </div>
            </div>

            <RangeFilter />

            <CategoryFilter />

            <BedroomFilter />
          </aside>

          {/* Property Listings */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Available Properties</h2>
                <p className="text-muted-foreground">
                  {properties.length} stays available
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties.map((property: IProperties) => (
                <Card
                  key={property.id}
                  className="overflow-hidden rounded-3xl border-0 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop"
                      alt={property.title}
                      className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* <div className="absolute top-3 right-3 rounded-full bg-white/90 px-2 py-1 text-sm font-medium shadow flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {property.rating}
                    </div> */}
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg line-clamp-1">
                        {property.title}
                      </h3>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {property.city}, {property.area}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BedDouble className="h-4 w-4" />
                        {property.bedrooms} beds
                      </div>

                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        {property.bathrooms} baths
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-xl font-bold">
                          ${property.rent}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /night
                        </span>
                      </div>
                      <Button>
                        <Link href={`/properties/${property.id}`} className="rounded-full">
                          View
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

            </div>
            <Pagination currentPage={Number(query?.page) || 1}
              totalPages={AllProperties.meta?.totalPages || 1} />
          </section>

        </div>

      </div>
    </main>
  )
}