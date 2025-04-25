

"use client";

import React, { useEffect, useState } from "react";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";
import AvailableBooks from "./components/ui/available";

type Book = {
    book_id: number;
    title: string;
    author: string;
    genre: string;
    description: string;
    isbn: string;
    available: boolean;
    };

    export default function HomePage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState("");

    const fetchBooks = async () => {
        try {
        const res = await fetch("http://localhost:4000/books");
        const data = await res.json();
        setBooks(data);
        } catch (err) {
        console.error("Failed to fetch books", err);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow max-w-6xl mx-auto p-6">

            <section className="text-center mt-10 mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to LibraryApp 📚</h1>
            <p className="text-lg text-gray-600">Explore a world of knowledge through our digital library.</p>
            </section>


            <section className="flex justify-center mb-12 text-gray-400">
            <input
                type="text"
                placeholder="Search for books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-gray-400"
            />
            </section>


            <AvailableBooks books={filteredBooks}/>

        </main>

        <Footer />
        </div>
    );
}