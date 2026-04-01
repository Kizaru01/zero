'use server';

import { connectToDB } from "@/database/mongoose";
import { CreateBook, TextSegment } from "@/types";
import { generateSlug, serializeData } from "../utils";
import Book from "@/database/models/book.model";
import BookSegment from "@/database/models/book-segment.model";

export const getAllbooks = async () => {

}
export const checkBookExist = async (title: string) => {
    try {
        
        await connectToDB();

        const slug = generateSlug(title)

        const existingBook = await Book.findOne({ slug }).lean();

        if(existingBook){
            return {
                success: true,
                data: serializeData(existingBook),
            }
        }

    } catch (error) {
        console.error("Error checking book existence", error)

        return {
            success: false,
            error: error,
        }
    }

}
export const createBook = async ( data: CreateBook) => {
    try {
        await connectToDB();

        const slug = generateSlug(data.title);

        const existingBook = await Book.findOne({slug}).lean();

        if(existingBook) {
            return {
                success: true,
                data: serializeData(existingBook),
                error: new Error('Bokk with this title already exist'),
            }
        }

        const book = await Book.create({...data, slug, totalSegments: 0})

        return {
            success: true,
            data: serializeData(book),
        }
    } catch (error) {
        console.error("Error creating a book", error)

        return{
            success: false,
            error: error,
        }
    }
}
export const getBookBySlug = async () => {
    
}
export const saveBookSegments = async (bookId: string, clerkId: string, segments: TextSegment[]) => {
    try{
        await connectToDB();

        console.log('Saving Book Segments');

        const segmentsToInsert = segments.map(({ text, segmentIndex, pageNumber, wordCount }) => ({
            clerkId, bookId, content: text, segmentIndex, pageNumber, wordCount
        }));

        await BookSegment.insertMany(segmentsToInsert);

        await Book.findByIdAndUpdate(bookId, { totalSegments: segments.length})

        console.log('Book sements saved succesfully')

        return {
            success: true,
            data: {
                segmentsCreated: segments.length
        }
    }
    } catch (error){
        console.error("Sorry please try again", error )

        await BookSegment.deleteMany({ bookId });
        await Book.findByIdAndDelete(bookId)
        console.log('Deleted book segments and book due to failure to save segments.')

        return {
            success: false,
            error: error,
        }
    }
}
export const searchBookSegments = async () => {

}