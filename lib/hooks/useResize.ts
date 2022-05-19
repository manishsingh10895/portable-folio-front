import { useEffect, useState } from "react";

export default function useResize(isMobile?: boolean) {
    let baseH = typeof window !== "undefined" ? window.innerHeight : 1000;
    let baseW = typeof window !== "undefined" ? window.innerWidth : 1000;
    const [height, setHeight] = useState(isMobile ? 450 : baseH);
    const [width, setWidth] = useState(isMobile ? 450 : baseH);

    useEffect(() => {
        let timeout: any = null;
        const resizeListener = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setHeight(window.innerHeight);
                setWidth(window.innerWidth);
            }, 250);
        }

        window.addEventListener('resize', resizeListener);

        resizeListener();

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    return { height, width };
}