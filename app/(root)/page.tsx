import BookCard from "@/components/BookCard"
import HeroSection from "@/components/HeroSection"
import { getAllbooks } from "@/lib/actions/book.action"

const Home = async () => {

  const bookResult = await getAllbooks();
  const books = bookResult.success ? bookResult.data ?? [] : [];
  return (
    <main className="max-w-7xl px-5 mx-auto w-full pt-23.5 pb-18 min-h-screen">
        <HeroSection/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 md:gap-x-10 gap-y-7 md:gap-y-9 max-w-7xl px-5 mx-auto">
          {books.map((book) => (
            <BookCard key={book._id} author={book.author} coverURL={book.coverURL} title={book.title} slug={book.slug}/>
          ))}
        </div>
    </main>
  )
}

export default Home