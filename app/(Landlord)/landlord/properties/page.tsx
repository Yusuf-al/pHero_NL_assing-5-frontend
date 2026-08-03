import React from 'react'
import { getLandlordProperties } from '../../_actions/landlordActions';

const AllPropertiesPage = async () => {
    const properties = await getLandlordProperties()
    console.log(properties)
    return (
        <div>
            <h1>All Properties list</h1>
        </div>
    )
}

export default AllPropertiesPage
