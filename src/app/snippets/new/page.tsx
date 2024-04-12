import { db } from '@/db';
import { redirect } from 'next/navigation';
import { useFormState } from 'react-dom';
import { createSnippet } from '@/actions/server-actions';

export default function SnippetCreate(){
    

    return(
        <form action={createSnippet}>
            <h3 className="font-bold m-3">Create a Snippet</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="title">Title</label>
                    <input name="title" className="border rounded p-2 w-full" id="title" />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label className="w-12" htmlFor="code">Code</label>
                    <textarea name="code" className="border rounded p-2 w-full" id="code" />
                </div>
            </div>
            <button type="submit" className="rounded p-2 bg-blue-200">
                Create
            </button>
        </form>
    )
}