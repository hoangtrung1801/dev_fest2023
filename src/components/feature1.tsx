"use client";

export default function Feature1({
    title,
    subtitle,
    description,
    features,
}: any) {
    console.log({ features });

    return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pr-8">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">
                                {subtitle}
                            </h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {title ? title : "A better workflow"}
                            </p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                {description
                                    ? description
                                    : "Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione."}
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features &&
                                    features?.length > 0 &&
                                    features?.map((feature: any, index) => (
                                        <div
                                            key={index}
                                            className="relative pl-9"
                                        >
                                            {typeof feature === "string" ? (
                                                <dt className="inline font-semibold text-gray-900">
                                                    {feature}
                                                </dt>
                                            ) : (
                                                <>
                                                    <dt className="inline font-semibold text-gray-900">
                                                        {feature?.title}
                                                    </dt>{" "}
                                                    <dd className="inline">
                                                        {feature?.description}
                                                    </dd>
                                                </>
                                            )}
                                        </div>
                                    ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
