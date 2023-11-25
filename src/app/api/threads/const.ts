import { ThreadMessage, ThreadMessageType } from "@prisma/client";

export const question0: ThreadMessage = {
    id: "question0",
    type: ThreadMessageType.TEXT,
    content:
        "Hello, I'm a bot. I'm here to help you sell your product. What would you like to sell?",
    payload: {},
};

export const question1: ThreadMessage = {
    id: "question1",
    type: ThreadMessageType.QUESTION,
    content: "What your product name?",
    payload: {},
};

export const question2: ThreadMessage = {
    id: "question2",
    type: ThreadMessageType.QUESTION,
    content: "Description of product?",
    payload: {},
};

export const question3: ThreadMessage = {
    id: "question3",
    type: ThreadMessageType.QUESTION,
    content: "What is the price?",
    payload: {},
};

export const question4: ThreadMessage = {
    id: "question4",
    type: ThreadMessageType.QUESTION,
    content: "What style do you want for the page?",
    payload: {},
};

export const question5: ThreadMessage = {
    id: "question5",
    type: ThreadMessageType.QUESTION,
    content: "What color do you want for the page?",
    payload: {},
};

export const questionBlock6: ThreadMessage = {
    id: "questionblock6",
    type: ThreadMessageType.QUESTION,
    content: "Choose your first block in landing page",
    payload: {
        blocks: [
            {
                id: "hero-1",
                props: {
                    title: "Discover the secret to flawless skin",
                    subTitle: "Our cosmetic product is specially formulated to cleanse and nourish your skin, leaving it refreshed and radiant.",
                    image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAMFBMVEX////X2djV19bW2NfU1tXc3t36+vrq6+rk5uX39/f09PTh4+Lu7+7d3t7m6Ofs7u3HXO29AAALpklEQVR4nO1d6XbzOghMvMR2vL3/295eAXKGYrwkX5u26E8PR1SDx4oMAsuXC7W2vH60smXxmlrRkTQUJHPnmISyIelWke6NxJkGqnGggaQOB5pIt0fdO0l31O1Jd2LQ0jJQQMfUW8xoIIBeT4DmZpJVBVlBVpD13WTFmhVkPU1WXxUfrRKyitTyzzB1FjJETbpM1oU6Kyaroc5MFnUKWaSb7SZdsZtBxW7UZQPFbgQlA6t8N0nMZJEugioDEbS0Wbn01IZ7agNJLUn3icSGRVe3JXGGzp47G5Im1B1M3SOgti6CKgNt0D0GtpcytYXZJOZpWPwvFXI7C9LNtxN0R+rMt5NE7mxooDz3LVC5nS3p5klOunmSIyjp5kkOBjJonkPUmSd5EmXitjsMvB76zboLRY0LBXVmsszVaQDQTBYuny4oG2gvnw0un7W1fCpQeyXLa3aQFWQFWd9O1rMLfIFrrb/Aj2KLBarWWiGrMhZ4DbqywFe4wBdPL/BTaq08JEmUJ2hDkjyZUXdG3Ql0B9RtTF1xM1oPtPVAUVcGckEH1PWuVOtehFnPKb0rp7RwnNL5a5zSwnBKH+bbplO6THIA7UynNALp46BBVpAVuw5vS1ZpzKyHKDCNnxd4JKtAskogq/LIKi2781pLA6HLpwx0ycoLfIFklZ9Byy2y6CqYrBtJV3HKrnDjehIb1BXnhiR52JAneBWyUHe6GjdZQO9XvMkkycziTiELDRzBwK60DOxRV4HegJVM1tW6nb4HL89ry4Mv0YOXua88eHSmFegRD35ED74AA5sdK8KZcKc6TVZ5KtyBH6cf7hQGWSWGO8VKuGMaGLGhTVYE0kFWkPX7yLKi12olkHRTKrWXUtE5n+pz9FqJrkqpVBDT23mcfYmm6nNMn0FbjOlLMDBvJNyoSZqEpE5SHyRKJqQD3ZmkO+rOnAlhXcnNoC53SkrlZuh2AnrEQO5sHwdaA5Vb4+kKKIl8vz7tuJVeSqUunZTKTDuEbkpFJu6EO27mPmSe5LgPWeI+ZGEYuLIPSaDlxjafCZrJikB6EzTICrJii+aNyFI588JJqdReSmXeTqnkLe6pggWeQWGtXfbgqXNCXTvRVHuJJgV6tUBxgV/24AdqDTeSZpZmq3NFdDvnA7oD2rBn3CO6Twxkp1QWZjed0pWcj+mUPtzOR/9Q5XHabad0AxSc0odJ/tkp1aDKQM3Kkd/snw93gqwgK8h6E7JwW1llNx4CsqSL28pLQOaRVaAtmFJJ11iubSsTqJ1oOrKtbCWaNKhtYAatU7ty+H6/JnEk6dJSr2wLsC6H5AOp1rRxcenHJPNeREcDXfk/G/rXnjc56qR7lVCfdGsGnRj0AqCyv3AlUNbtqZf3Im5XMJBARwa97AFtXdCL3KLThSHm8/pbqpWPFIZUdmHIRrUyTsOIDR3QICvICrKCrB9Jllr3y/1PQ7NMcl/0+q/KJOvTT8ONMknyKGrxKOpH7+NGftYoKZXR0pX0C7s8kvPhgcTloX9tUXdAXe6cRsO5WwFVBipQ08AV0HoH6EZpdwnZDVXajXkczvl4pd0qpVIg6Kl3d2igvCKQCO/ulFhPXmCiKd7diUA6yAqyfi9Z1vN6tTCk+vy81oUh9h68ftcWajTu5wtDbFC3MITvpl2Nsq8wZGjmj9bwc7VL0tzIxs1MjXVn6BRdfl7fSRw83Vk2eVBXgbIoBs5g4GzpyvbQ4Bk4eAbeLQMFlO/Bxrs79g6IV+dzxCkt9jmlheWUugaeeHdHb9EgaCYrwp1N0CAryAqy3ogsrzDkHoUhfHH0IM0lEPwo5XIJkFSn6h0s3aXuwhh3WNElaTY7tYGDp3vAwMa9UhZfXhjiVSv779o+XxjyhBcThSERGwZZQdbvI+vpbWX1KsH7bSvj+wtqWxlBV14lyFeKW/NqG7/FugvMB7gJiw4H4tyBJCzGp3MHCHokYaEyKggqBpqguTDk0Oso4JTe0CndcwDMyusohTXJ0Sn1j8XJP7gjTqn7y9r1OgotFGvhjrdQ/IlwJ2LDICvICrJ+ElkHyiTdPfh3KAzZswfvhsxrhSFjaotHQXL2s1Inuzyd0iVpcWOSmF2eJI3Z5UnKixuTxOxn0UjZ5XkEvdUeaGuAjjWAZt2RerOfBVfKoNkRtFh5QWHIEx58zhuiM12+mwd/lys98pv987FhkBVkBVnfTpa1wK9lN86nVDi8XvbgH0E7zOPoQ129N5DHJ2P6hz14DK/tnI+dCVFpHbPT1jX/s3F1UblR/+paZP+ra/2ucUWCcXkeiPtV7CoMebpaeckbgn/oO6XFFzqlK9ktaXFUwTaoT1bEhkFWkPWlZJ0+Eko9r80joVYCMnU6E/UVGJAth7qmzl1HQnHE+PojoTC7IfsLdnYD0yRPvAMiZ3mZKZXBBMU3kG0D/USTbSCC+ommS0UtM5vasp+T2lKtnFp+Xqe2FA6nlm8nNe5sSFoKhx9BO9Rl0OyUUsuTHEBHEvMkBwNt0DzJAbQlaalWNliJcAdBIzYMsoKsIOsXkWVGrwcOdT1yfpauQnzB+Vnb7+74Mf3aoa52eM0eBJxpcsnHi5A44FEk4mexrpxpQuLMboycaUKdA3XmM00uj6At6pLvlEG5U/wsNJBB2c8aL2DgTJ35pBcS1Ukv8iqzMtAAfXh3R839JB75LMPiwcPcd0/LoS8kPHjwn1eEBw8+daozhE5/lsE/QwiXoX2HusYWTQTSQVaQ9a5kVZtbNPve3TnynbxXl0keeXfHTjSZWzTLHrxkLrZPXZ2xc3kn5oDuDJ1KxHNV1SGswwydSZzPnBk7KwNhIGW9Our1V+UNj09yDbqRNzzym/3z4U6QFWQFWd9OlrXA7/za77OVf6/4nDuBvqryb+W9iwzK1ZPDrftoXD1Z911qXLI5NtTZUVVmfUfdG+nmmtIkSZ0oD9RIySbJrDs86taiO1HF6cS6tQkKBjJox4WsotuMloFDZ4NyIatloIBeZA5tnxiycgCM/bVf9YLvlxzqqj9dtO8YO+vUmTjUFUAjNvxWsmI/K2bW15LlOTd/gawdT8Ofc6jr0+dnZbLUuzvEpPo0cHaQSZTbybpCIeryN4bllDjWtb9HjB9MVt8jnkxQ8Q9NA9VXmjsAFVpGAFUGtmDgrbZB6e/OzzKQ7ss/y+CGOzyQncf5Z1/7BQMjNoxAOsgKsn4kWebzeuXR+TXnZ+041PWfn5+1UhgiqY/p//TFJJmQJDXTAGKDurOpOyvdxtBdSb+YoNMeXRO0sQ1UV2pejLI+f7JPmN0u7d6XUtlx5t9SGKLO/PO2BHWiCfchj+QN6Uq9vKHKbkVhSATS30lWzKyvnVnm8/rHkxWfc38AXVvgKZvRTX1qE4skjXeSBhI5pdK1JDUsjiSy7kxSiwNRSqW7jzBQY4H2gwk6IegeA2cAHREUDdwHeuxLA4ZTqnM+nlOqD/23d652VCvrPM7pLw0crFY+8pv98+FOkBVkBVlvQlZ1gKyVHd4T28q7yCoMsg5tK0sUeGhb2SOrFLJKJIukCYYo5WlY4syiXiGrBFvMhMUKaGuC2lkSlbDggTBLggaWQpYJimQpA2Ug28KVPI6dUhGn1KJlJaXCeRwMG1Siyb5vRxJNykA70WRntxQrmSxrodj17o4Od/B3Yr27sxbu8Opk53yeWBGOvLtjZbcikH7HQPrvkBUzK2bW02QdKgzxotdZRa9eSuX5whDbwB1lkjs/rKYKQ1pqwz21oSeRpPtEUsMi6s6oS0I/w0A9dzYkTqhrgzYW6IouGdiLbg8G2qCzORCDrhjIF/5Mabd5pL5X2u2fWH+qtLtw9iEZ1N2HjK/9RiAdZAVZv5esly3w4/cv8PpQ11ct8BnUfkh6T3HpnFFkN+PAk7k9Amrrmr5NjwMxaLcH1DVwcbdOO6X2uzv/2il1q5/OO6Wd75QKWRHubIL6ZEUgHYF0zKxvJytmVpB1mqz/APMW963CvIqrAAAAAElFTkSuQmCC"
                },
            },
            {
                id: "hero-2",
                props: {
                    title: "This is section title hero - 22222222",
                    subTitle: "",
                },
            },
        ],
    },
};

export const questionBlock7: ThreadMessage = {
    id: "questionblock7",
    type: ThreadMessageType.QUESTION,
    content: "Choose your second block in landing page",
    payload: {
        blocks: [
            {
                id: "feature-0",
                props: {
                    title: "Discover the secret to flawless skin",
                    subTitle: "Our cosmetic product is specially formulated to cleanse and nourish your skin, leaving it refreshed and radiant.",
                    description: "ijfgiosdfjsidjfiosdfwe",
                    features: "sadfwefw",
                },
            },
            {
                id: "feature-1",
                props: {
                    title: "sdfasdfwe",
                    subTitle: "sdfsdf",
                    description: "sadfsdf",
                    features: "fasdfs",
                },
            },
            {
                id: "feature-2",
                props: {
                    title: "sdfasdfwe",
                    subTitle: "sdfsdf",
                    description: "sadfsdf",
                    features: "fasdfs",
                },
            },
        ],
    },
};

export const questionBlock8: ThreadMessage = {
    id: "questionblock8",
    type: ThreadMessageType.QUESTION,
    content: "Choose your third block in landing page",
    payload: {
        blocks: [
            {
                id: "contact-1",
                props: {
                    title: "asdfwefs",
                    subtitle: "wesdfsd",
                },
            },
            {
                id: "contact-2",
                props: {
                    title: "sadfsdf",
                    subtitle: "fsdafsdf",
                },
            },
        ],
    },
};

export const endMessage: ThreadMessage = {
    id: "end",
    type: ThreadMessageType.END,
    content: null,
    payload: {},
};

// export const question4: ThreadMessage = {
//     id: "question3",
//     type: ThreadMessageType.QUESTION,
//     content: "What is the price?",
// };
