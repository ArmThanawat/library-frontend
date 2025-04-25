'use client';

import React, { useState } from 'react';

type Book = {
    book_id: number;
    title: string;
    author: string;
    genre: string;
    description: string;
    available: boolean;
    isbn: string;
    };

interface AvailableBooksProps {
    books: Book[];
    onBorrow?: (bookId: number) => void;
}

export default function AvailableBooks({ books, onBorrow }: AvailableBooksProps) {
    const [borrowingId, setBorrowingId] = useState<number | null>(null);

    return (
        <>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Books</h2>
        <section className="mt-12">
        
        <div className="min-h-[380px] md:min-h-[450px]">
        {books.length > 0 ? (
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
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {book.genre}
                    </span>
                </p>
                <p className="text-xs text-gray-400 line-clamp-3">{book.description}</p>
                <button
                    disabled={!book.available}
                    onClick={async () => {
                        if (!book.available || borrowingId === book.book_id) return;
                        setBorrowingId(book.book_id);
                        try {
                        await fetch(`http://localhost:4000/books/${book.book_id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ available: false }),
                        });
                        onBorrow?.(book.book_id);
                        window.location.reload();
                        } catch (err) {
                        console.error("Failed to mark book as borrowed", err);
                        } finally {
                        setBorrowingId(null);
                        }
                    }}
                    className={`mt-4 w-full py-2 px-4 rounded transition-all duration-300 ${
                        borrowingId === book.book_id
                        ? "bg-blue-400 text-white animate-pulse"
                        : book.available
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    >
                    {borrowingId === book.book_id ? "Borrowing..." : book.available ? "Borrow" : "Unavailable"}
                </button>
                </div>
            ))}
            </div>
        ) : (
            <p className="text-gray-600 text-center">No books found.</p>
        )}
        </div>
        </section>
        </>
    );
}