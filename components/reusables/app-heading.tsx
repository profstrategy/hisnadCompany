import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

interface AppHeadingProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4';
    children: React.ReactNode;
    className?: string;
    color?: string;
    align?: 'left' | 'center' | 'right';
}

export const AppHeading = ({ variant = 'h1', children, className, color, align = 'left' }: AppHeadingProps) => {
    const variantStyles = {
        h1: 'text-2xl md:text-3xl lg:text-4xl leading-[1.5] md:leading-[1.4] lg:leading-[1.3]',
        h2: 'text-xl md:text-2xl lg:text-3xl leading-[1.5] md:leading-[1.4] lg:leading-[1.3]',
        h3: 'text-lg md:text-xl lg:text-2xl leading-[1.6] md:leading-[1.5] lg:leading-[1.4]',
        h4: 'text-base md:text-lg lg:text-xl leading-[1.7] md:leading-[1.6] lg:leading-[1.5]',
    };

    const Component = variant;

    return (
        <Component
        className={cn(
            poppins.className,
            `text-${color}`,
            `text-${align}`,
            variantStyles[variant],
            className
        )}
        >
            {children}
        </Component>
    )
}