import React from 'react'

const Carousel = (props) => {
    const {children} = props

    return (
        <div className="carousel-container w-full flex flex-col">
            <div className="carousel-wrapper flex w-full relative">
                <div className="carousel-content-wrapper overflow-hidden w-full h-full">
                    <div className="carousel-content flex transition-all duration-250 ease-linear overflow-y-hidden">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel