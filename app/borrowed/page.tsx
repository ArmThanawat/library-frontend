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
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          📚 Borrowed Books to Return
        </h2>

        <div className="min-h-[380px] md:min-h-[450px]">
          {loading ? (
            <p className="text-gray-600 text-center animate-pulse">
              Loading borrowed books...
            </p>
          ) : books.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <div
                  key={book.book_id}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium text-gray-700">Author:</span> {book.author}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-medium text-gray-700">Genre:</span>{" "}
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs inline-block">
                      {book.genre}
                    </span>
                  </p>
                  <button
                    onClick={() => handleReturn(book.book_id)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
                  >
                    Return Book
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No borrowed books found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}