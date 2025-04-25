"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../components/ui/header";
import Footer from "../components/ui/footer";

// Define the Book type
type Book = {
  book_id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  isbn: string;
};

// Form input type (same as Book but book_id is optional)
type BookFormInput = Omit<Book, "book_id"> & { book_id?: number };

export default function BookPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormInput>();

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

  const onSubmit = async (formData: BookFormInput) => {
    try {
      if (editingBook) {
        await fetch(`http://localhost:4000/books/${editingBook.book_id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch("http://localhost:4000/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      reset();
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      console.error("Failed to submit form", err);
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    reset(book);
  };

  const handleDelete = async (book_id: number) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await fetch(`http://localhost:4000/books/${book_id}`, {
        method: "DELETE",
      });
      fetchBooks();
    } catch (err) {
      console.error("Failed to delete book", err);
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm("Are you sure you want to delete selected books?")) return;
    try {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`http://localhost:4000/books/${id}`, {
            method: "DELETE",
          })
        )
      );
      setSelectedIds([]);
      fetchBooks();
    } catch (err) {
      console.error("Failed to bulk delete books", err);
    }
  };

  const toggleSelection = (book_id: number) => {
    setSelectedIds((prev) =>
      prev.includes(book_id) ? prev.filter((id) => id !== book_id) : [...prev, book_id]
    );
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="max-w-6xl mx-auto mt-6 p-6 bg-white text-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Book Manager</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border border-gray-200 p-6 rounded-lg mb-10">
            <h2 className="text-xl font-semibold mb-2">
              {editingBook ? "Edit Book" : "Add New Book"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 font-medium mb-1">Title</label>
                <input {...register("title", { required: "Title is required" })} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-gray-400" />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-1">Author</label>
                <input {...register("author", { required: "Author is required" })} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-gray-400" />
                {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-1">Genre</label>
                <input {...register("genre", { required: "Genre is required" })} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-gray-400" />
                {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-1">ISBN</label>
                <input {...register("isbn", { required: "ISBN is required" })} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-gray-400" />
                {errors.isbn && <p className="text-red-500 text-sm">{errors.isbn.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-gray-800 font-medium mb-1">Description</label>
              <textarea {...register("description", { required: "Description is required" })} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-gray-400" rows={3} />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                {editingBook ? "Update Book" : "Add Book"}
              </button>
              {editingBook && (
                <button type="button" className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300" onClick={() => { setEditingBook(null); reset(); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="overflow-x-auto border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Books List</h2>
              {selectedIds.length > 0 && (
                <button onClick={handleBulkDelete} className="text-sm text-red-600 hover:underline">
                  Delete Selected ({selectedIds.length})
                </button>
              )}
            </div>
            <table className="w-full text-sm text-gray-800">
              <thead>
                <tr>
                  <th className="px-2 py-1 border-b">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds(books.map((b) => b.book_id));
                        } else {
                          setSelectedIds([]);
                        }
                      }}
                      checked={selectedIds.length === books.length && books.length > 0}
                    />
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-700 px-2 py-1 border-b">ID</th>
                  <th className="text-left text-sm font-semibold text-gray-700 px-2 py-1 border-b">Title</th>
                  <th className="text-left text-sm font-semibold text-gray-700 px-2 py-1 border-b">Author</th>
                  <th className="text-left text-sm font-semibold text-gray-700 px-2 py-1 border-b">Genre</th>
                  <th className="text-left text-sm font-semibold text-gray-700 px-2 py-1 border-b">ISBN</th>
                  <th className="text-left text-sm font-semibold text-gray-700 px-2 py-1 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book.book_id ?? index}>
                    <td className="px-2 py-1">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(book.book_id)}
                        onChange={() => toggleSelection(book.book_id)}
                      />
                    </td>
                    <td>{book.book_id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.isbn}</td>
                    <td className="space-x-2">
                      <button onClick={() => handleEdit(book)} className="text-sm text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(book.book_id)} className="text-sm text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}