"use client";

import { getComponent } from "@/app/libs/getComponent";

const data = {
    blocks: [
        {
            id: "hero-1",
            props: {
                title: "hero 1",
                description: "this is hero 1",
            },
        },
        {
            id: "feature-1",
            props: {
                title: "feature 1",
                subTitle: "sub title 1",
                description: "description 1",
                features: [
                    {
                        title: "title 1",
                        description: "description 1",
                    },
                    {
                        title: "title 2",
                        description: "description 2",
                    },
                    {
                        title: "title 3",
                        description: "description 3",
                    },
                ],
            },
        },
        {
            id: "contact-1",
            props: {
                title: "contact 1",
                subTitle: "this is contact 1",
            },
        },
    ],
};

const LandingPage = () => {
    return (
        <div>
            {data.blocks.map((block) => getComponent(block.id, block.props))}
        </div>
    );
};

export default LandingPage;
