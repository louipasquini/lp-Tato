import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom-in";
    delay?: number;
    duration?: number;
    threshold?: number;
}

const ScrollReveal = ({
    children,
    className,
    animation = "fade-up",
    delay = 0,
    duration = 0.6,
    threshold = 0.1,
}: ScrollRevealProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    const getAnimationClass = () => {
        switch (animation) {
            case "fade-up":
                return "translate-y-8 opacity-0";
            case "fade-in":
                return "opacity-0";
            case "slide-left":
                return "-translate-x-8 opacity-0";
            case "slide-right":
                return "translate-x-8 opacity-0";
            case "zoom-in":
                return "scale-95 opacity-0";
            default:
                return "opacity-0";
        }
    };

    const getVisibleClass = () => {
        switch (animation) {
            case "fade-up":
                return "translate-y-0 opacity-100";
            case "fade-in":
                return "opacity-100";
            case "slide-left":
                return "translate-x-0 opacity-100";
            case "slide-right":
                return "translate-x-0 opacity-100";
            case "zoom-in":
                return "scale-100 opacity-100";
            default:
                return "opacity-100";
        }
    };

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all ease-out will-change-[transform,opacity]",
                isVisible ? getVisibleClass() : getAnimationClass(),
                className
            )}
            style={{
                transitionDuration: `${duration}s`,
                transitionDelay: `${delay}s`,
            }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
