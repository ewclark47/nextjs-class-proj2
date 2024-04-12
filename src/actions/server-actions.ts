'use server'

import { db } from "@/db"
import { redirect } from "next/navigation"

export async function editSnippet( id: number, code: string) {
    //console.log(id, code)
    await db.snippet.update({
        where: { id },
        data: { code }
    })

    redirect(`/snippets/${id}`)
}

export async function deleteSnippet( id: number ) {
    await db.snippet.delete({
        where: {id}
    })

    redirect('/')
}

export async function createSnippet(formData: FormData) {
    // Validate user input
    const title = formData.get('title') as string; // received from the input with name 'title'
    const code = formData.get('code') as string; // received from the textarea with name 'code'

    // Create new record in db with user input
    const snippet = await db.snippet.create({
        data: {
            title: title,
            code: code
        }
    });
    console.log(snippet);

    // Redirect user to homepage or specific snippet page for newly create snippet
    redirect('/');
    // redirect('/snippets/{snippet.id'});
}