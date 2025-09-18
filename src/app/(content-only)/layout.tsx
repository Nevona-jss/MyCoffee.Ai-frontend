import React from "react";

export default function LayoutFooter({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="flex-1 flex child-width-full">
                {children}
            </div>
        </div>
    );
}
