import Header from "@/app/(root)/_components/Header";
import EditorPanel from "@/app/(root)/_components/EditorPanel";
import OutputPanel from "@/app/(root)/_components/OutputPanel";
import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";


export default function Home() {
    return (
        <div className="max-h-screen text-white">
            <div className="max-w-[1800px] mx-auto p-4">
                <div>
                    <Header/>
</div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <EditorPanel/>
                    <OutputPanel/>
                </div>
            </div>
        </div>
    );
}
