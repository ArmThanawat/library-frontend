"use client";

import React from "react";

type Book = {
    book_id: number;
    title: string;
    author: string;
    genre: string;
    description: string;
    };

    interface AvailableBooksProps {
    books: Book[];
    }

    export default function AvailableBooks({ books }: AvailableBooksProps) {
    return (
        <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Books</h2>
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
                </div>
            ))}
            </div>
        ) : (
            <p className="text-gray-600 text-center">No books found.</p>
        )}
        </div>
        </section>
    );
}