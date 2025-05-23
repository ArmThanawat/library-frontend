import React from "react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white shadow-md py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/">
            <span className="text-xl font-bold text-gray-800 cursor-pointer">📚 LibraryApp</span>
            </Link>
            <div className="flex gap-4">
                <Link href="/manage" className="text-gray-600 hover:text-gray-800 font-medium">
                Manage Books
                </Link>
                <Link href="/borrowed" className="text-gray-600 hover:text-gray-800 font-medium">
                Borrowed Books
                </Link>
                
            </div>
            <div className="flex gap-4">
                <Link href="/register">
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Register
                </button>
                </Link>

                <Link href="/login">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Login
            </button>
            </Link>
            </div>
            
        </div>
        </header>
    );
}
