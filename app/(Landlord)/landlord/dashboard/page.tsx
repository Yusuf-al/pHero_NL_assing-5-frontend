import React from 'react'

const landlordDashboard = () => {
  return (
   <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Landlord Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your properties, tenants, and payments.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border p-4">
          <p className="text-sm text-muted-foreground">Total Properties</p>
          <h2 className="text-2xl font-bold mt-2">12</h2>
        </div>

        <div className="rounded-2xl border p-4">
          <p className="text-sm text-muted-foreground">Active Tenants</p>
          <h2 className="text-2xl font-bold mt-2">28</h2>
        </div>

        <div className="rounded-2xl border p-4">
          <p className="text-sm text-muted-foreground">Monthly Income</p>
          <h2 className="text-2xl font-bold mt-2">$4,250</h2>
        </div>

        <div className="rounded-2xl border p-4">
          <p className="text-sm text-muted-foreground">Pending Requests</p>
          <h2 className="text-2xl font-bold mt-2">5</h2>
        </div>
      </div>
    </div>
  )
}

export default landlordDashboard
