import { db } from "@/db"
import Link from "next/link"

/* export const dynamic = "force-dynamic" // this will force this page
// to be dynamic and not just reserve whatever html existed at build 
// i.e. never caches*/

/* export const revalidate = 3; // this will reset the cached page every 
// 3 seconds */

/* import { revalidatePath } from "next/cache"
revalidatePath('/snippets') // this forces a rerender on-demand */

export default async function Home() {
  const snippets = await db.snippet.findMany()

  const rendered_snippets = snippets.map((snippet) => {
    return(
      <Link key={snippet.id} 
      className="flex justify-between items-center p-2 border rounded"
      href={`/snippets/${snippet.id}`}>
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    )
  })

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link className="border p-2 rounded" href={"/snippets/new"}>New</Link>
      </div>
        <div className="flex flex-col gap-2">
        {rendered_snippets}
        </div>
    </div>
  )
}
