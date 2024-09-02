import { PrismaClient } from "@prisma/client";

const bookClient = new PrismaClient().book; //Init prisma client based on model eg. ".book"

// getAllBooks
export const getAllBooks = async (req, res) => {
  try {
    const allBooks = await bookClient.findMany();

    res.status(200).json({ data: allBooks });
  } catch (error) {
    console.log(error);
  }
};

// getBookById
export const getBookById = async (req, res) => {
  try {
    const BookId = req.params.id;
    const Book = await bookClient.findUnique({
      where: {
        id: BookId,
      },
    });

    res.status(200).json({ data: Book });
  } catch (error) {
    console.log(error);
  }
};

// createBook
export const createBook = async (req, res) => {
  try {
    const BookData = req.body;
    const Book = await bookClient.create({
      data: {
        title: BookData.title,
        author: {
          connect: { id: BookData.authorId }, //this will add relationship to the author
        },
      },
    });

    res.status(200).json({ data: Book });
  } catch (error) {
    console.log(error);
  }
};

// updateBook
export const updateBook = async (req, res) => {
  try {
    const BookId = req.params.id;
    const BookData = req.body;
    const Book = await bookClient.update({
      where: {
        id: BookId,
      },
      data: BookData,
    });

    res.status(200).json({ data: Book });
  } catch (error) {
    console.log(error);
  }
};

// deleteBook
export const deleteBook = async (req, res) => {
  try {
    const BookId = req.params.id;
    const Book = await bookClient.delete({
      where: {
        id: BookId,
      },
    });

    res.status(200).json({ data: {} });
  } catch (error) {
    console.log(error);
  }
};
