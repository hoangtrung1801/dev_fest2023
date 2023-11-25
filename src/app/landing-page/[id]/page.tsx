"use client";

import getThread from "@/app/actions/getThread";
import { getComponent } from "@/app/libs/getComponent";
import axios from "axios";
import { useEffect, useState } from "react";

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
                subtitle: "sub title 1",
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
                subtitle: "this is contact 1",
            },
        },
    ],
};

const LandingPage = ({ params }: { params: { id: string } }) => {
    const threadId = params.id;

    const [blocks, setBlocks] = useState([]);
    const [thread, setThread] = useState();

    useEffect(() => {
        axios.get(`/api/threads/${threadId}`).then((res) => {
            const data = res.data;
            setBlocks(data?.info?.blocks);
        });
    }, []);

    useEffect(() => {
        console.log({ blocks });
    }, [blocks]);

    return (
        <div>
            {blocks.length === 0 && <div>loading...</div>}
            {blocks.length > 0 &&
                blocks.map((block) => getComponent(block.id, block.props))}
        </div>
    );
};

export default LandingPage;
