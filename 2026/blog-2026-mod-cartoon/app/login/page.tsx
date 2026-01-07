"use client"

import { authenticate } from "@/app/lib/actions"
import { useActionState } from "react"

export default function LoginPage() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined)

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                    Admin Login
                </h2>
                <form action={dispatch} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                            <input
                                name="email"
                                type="email"
                                placeholder="admin@example.com"
                                className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </label>
                    </div>
                    <div className="flex items-end space-x-1" aria-live="polite" aria-atomic="true">
                        {errorMessage && (
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Sign In with Email
                    </button>
                </form>
            </div>
        </div>
    )
}
