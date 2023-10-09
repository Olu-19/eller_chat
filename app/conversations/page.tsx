"use client";

import clsx from "clsx";

import useConversation from "@/app/hooks/useConversation";
import EmptyState from "@/app/components/EmptyState";

const Home = () => {
    const { isOpen } = useConversation();

    return (
        <div className={clsx(`
          lg:pl-80 h-[100vh] lg:block
        `,
        isOpen ? "block" : "hidden"
        )}>
            <EmptyState />
        </div>
    );
}
 
export default Home;