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

export async function createSnippet(formState: {message: string}, formData: FormData) { // FORM STATE WILL ALWAYS BE FIRST 
    try{
    // Validate user input
    const title = formData.get('title'); // received from the input with name 'title'
    const code = formData.get('code'); // received from the textarea with name 'code'

    if (typeof title !== 'string' || title.length < 3){
        return{
            message: 'Title must be longer'
        }
    }
    if (typeof code !== 'string' || code.length < 3){
        return{
            message: 'Code must be longer'
        }
    }

    // Create new record in db with user input
    const snippet = await db.snippet.create({
        data: {
            title: title,
            code: code
        }
    });
    console.log(snippet);
    //throw new Error('Failed to save to database')
    } catch (err: unknown){
        if(err instanceof Error){
            return{
                message: err.message
            }
        }else{
            return{
                message: 'Something went wrong...'
            }
        }
    } 

    // Redirect user to homepage or specific snippet page for newly create snippet
    redirect('/'); // NOTE: redirect actually throws a speciall error that
    // tells Next.js to redirect the user. SO redirect() CANNOT go inside of a try
    // catch block. The catch block will capture NEXT_REDIRECT as an error
    // redirect('/snippets/{snippet.id'});
}