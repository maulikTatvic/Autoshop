import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`AutoShop - ${title}`}</title>
        </Helmet>
    )
}

export default MetaData