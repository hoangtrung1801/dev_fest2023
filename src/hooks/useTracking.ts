import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useMemo } from "react";
const useTracking = () => {
    const params = useParams();
    const trackingId = useMemo(() => {
        if (!params?.trackingId) {
            return '';
        }

        return params.trackingId as string;
    }, [params?.trackingId]);

    const isOpen = useMemo(() => !!trackingId, [trackingId]);

    return useMemo(() => ({
        isOpen,
        trackingId
    }), [isOpen, trackingId])




}

export default useTracking;