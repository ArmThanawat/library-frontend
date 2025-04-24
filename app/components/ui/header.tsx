import React from "react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white shadow-md py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/">
            <span className="text-xl font-bold text-gray-800 cursor-pointer">📚 LibraryApp</span>
            </Link>
            <Link href="/manage" className="text-gray-600 hover:text-gray-800 font-medium">
            Manage Books
            </Link>
            <Link href="/login">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Login
            </button>
            </Link>
        </div>
        </header>
    );
}
