import React from "react";
import Property from "./Property";

const PropertyList = ({ data, currentPage, getAllProperties }) => {
    return (
        <main className='main'>
            <div className='background-properties'>
                <br />
            <div className="container">
                {data?.content?.length === 0 && <div>No Properties. Please add a new property</div>}

                <ul className='property__list'>
                    {data?.content?.length > 0 && data.content.map(property => <Property property={property} key={property.id} />)}
                </ul>

                {data?.content?.length > 0 && data?.totalPages > 1 &&
                <div className='pagination'>
                    <button onClick={() => getAllProperties(currentPage - 1)} disabled={currentPage === 0}>&laquo;</button>

                    { data && [...Array(data.totalPages).keys()].map((page, index) => 
                        <button onClick={() => getAllProperties(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</button>)}

                    <button onClick={() => getAllProperties(currentPage + 1)} disabled={currentPage === data.totalPages - 1}>&raquo;</button>
                </div>            
                }
            </div>
            </div>
        </main>
    )
}

export default PropertyList;
