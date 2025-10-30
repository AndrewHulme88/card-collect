import React from "react";

export type HomeHeaderProps = {
    title: string;
    description: string;
};

const HomeHeader: React.FC<HomeHeaderProps> = React.memo(
    ({ title, description }) => {
        return (
            <header>
                <h1>{title}</h1>
                <h3>{description}</h3>
            </header>
        );
    }
);

export default HomeHeader;