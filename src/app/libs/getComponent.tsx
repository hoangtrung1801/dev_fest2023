import Hero2 from "@/components/hero2";
import Feature1 from "@/components/feature1";
import Contact1 from "@/components/contact1";
import Footer from "@/components/footer";
import React from "react";
import Hero1 from "@/components/hero1";
import Contact2 from "@/components/contact2";
import Feature2 from "@/components/feature2";

export function getComponent(id: string, props: any) {
    try {
        switch (id) {
            case "hero-1":
                return <Hero1 key={id} {...props} />;
            case "hero-2":
                return <Hero2 key={id} {...props} />;
            case "feature-1":
                return <Feature1 key={id} {...props} />;
            case "feature-2":
                return <Feature2 key={id} {...props} />;
            case "contact-1":
                return <Contact1 key={id} {...props} />;
            case "contact-2":
                return <Contact2 key={id} {...props} />;
            default:
                return null;
        }
    } catch (e) {
        console.error(e);
        return null;
    }
}
