// /borrowed/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Footer from "../components/ui/footer";
import Header from "../components/ui/header";

type Book = {
    book_id: number;
    title: string;
    author: string;
    genre: string;
    available: boolean;
    };

    export default function BorrowedBooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchBorrowedBooks = async () => {
        setLoading(true);
        try {
        const res = await fetch("http://localhost:4000/books");
        const data = await res.json();
        const borrowed = data.filter((book: Book) => book.available === false);
        setBooks(borrowed);
        } catch (err) {
        console.error("Failed to fetch borrowed books", err);
        } finally {
        setLoading(false);
        }
    };

    const handleReturn = async (bookId: number) => {
        try {
        await fetch(`http://localhost:4000/books/${bookId}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ available: true }),
        });
        fetchBorrowedBooks();
        } catch (error) {
        console.error("Failed to return book", error);
        }
    };

    useEffect(() => {
        fetchBorrowedBooks();
    }, []);

    return (
      <div className="bg-white min-h-screen">
        <Header />
        <section className="mt-12 max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Borrowed Books to Return</h2>
          <div className="min-h-[380px] md:min-h-[450px]">
            {loading ? (
              <p className="text-gray-600 text-center animate-pulse">Loading borrowed books...</p>
            ) : books.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {books.map((book) => (
                  <div
                    key={book.book_id}
                    className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg border border-gray-100 transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-500 mb-1">
                      <span className="font-medium text-gray-600">Author:</span> {book.author}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      <span className="font-medium text-gray-600">Genre:</span>{" "}
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        {book.genre}
                      </span>
                    </p>
                    <button
                      onClick={() => handleReturn(book.book_id)}
                      className="mt-4 w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Return
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No borrowed books found.</p>
            )}
          </div>
        </section>
        <Footer />
      </div>
    );
}