import { PrismaClient } from "@prisma/client";
import { log } from "console";

const authorClient = new PrismaClient().author; //Init prisma client

// getAllAuthors
export const getAllAuthors = async (req, res) => {
  try {
    const allAuthors = await authorClient.findMany({
      include: {
        books: true,
      },
    });

    res.status(200).json({ data: allAuthors });
  } catch (error) {
    console.log(error);
  }
};

// getAuthorById
export const getAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await authorClient.findUnique({
      where: {
        id: authorId,
      },
    });

    res.status(200).json({ data: author });
  } catch (error) {
    console.log(error);
  }
};

// createAuthor
export const createAuthor = async (req, res) => {
  try {
    const authorData = req.body;
    const author = await authorClient.create({
      data: authorData,
    });

    res.status(200).json({ data: author });
  } catch (error) {
    console.log(error);
  }
};

// updateAuthor
export const updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const authorData = req.body;
    const author = await authorClient.update({
      where: {
        id: authorId,
      },
      data: authorData,
    });

    res.status(200).json({ data: author });
  } catch (error) {
    console.log(error);
  }
};

// deleteAuthor
export const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await authorClient.delete({
      where: {
        id: authorId,
      },
    });

    res.status(200).json({ data: {} });
  } catch (error) {
    console.log(error);
  }
};
