import React from "react";

interface HomeHeaderProps {
    title: string;
    subHeading?: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ title, subHeading }) => {
    return (
        <header>
            <h1>{title}</h1>
            {subHeading && <p>{subHeading}</p>}
        </header>
    );
};

export default HomeHeader;