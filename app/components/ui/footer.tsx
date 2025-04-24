import React from "react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-10 pb-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
            <div>
            <h3 className="text-lg font-semibold mb-4">📚 LibraryApp</h3>
            <p className="text-sm">
                A modern library management system built to help readers, students, and librarians organize knowledge and access books easily.
            </p>
            </div>

            <div>
            <h4 className="font-semibold mb-2">About</h4>
            <ul className="text-sm space-y-1">
                <li><Link href="/about" className="hover:underline">Our Mission</Link></li>
                <li><Link href="/team" className="hover:underline">Team</Link></li>
                <li><Link href="/careers" className="hover:underline">Careers</Link></li>
            </ul>
            </div>

            <div>
            <h4 className="font-semibold mb-2">Resources</h4>
            <ul className="text-sm space-y-1">
                <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                <li><Link href="/help" className="hover:underline">Help Center</Link></li>
                <li><Link href="/api-docs" className="hover:underline">API Docs</Link></li>
            </ul>
            </div>

            <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <ul className="text-sm space-y-1">
                <li>Email: support@libraryapp.com</li>
                <li>Phone: (123) 456-7890</li>
                <li><Link href="/contact" className="hover:underline">Contact Form</Link></li>
            </ul>
            </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} LibraryApp. All rights reserved.
        </div>
        </footer>
    );
}
