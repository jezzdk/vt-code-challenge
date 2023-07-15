import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import TreeView from "@/Components/TreeView";

export default function Welcome(props: PageProps) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="w-full max-w-7xl mx-auto p-6 lg:p-8 space-y-8">
                    <div className="text-xl font-semibold border-b-2 border-blue-400">
                        Veo Technologies - Full Stack Code Challenge
                    </div>

                    <TreeView />
                </div>
            </div>
        </>
    );
}
