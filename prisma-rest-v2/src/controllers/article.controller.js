import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().article;

/**
 * get all articles
 * @auth not required
 * @route {GET}
 * @returns get all articles
 **/
export const getArticles = async (req, res) => {
  try {
    const allArticles = await prisma.findMany({});

    res.status(200).json({ data: allArticles });
  } catch (error) {
    console.log("Error Fetching All Articles", error);
  }
};

/**
 * get article by ID
 * @auth required
 * @route {GET}
 * @returns get specific Article
 **/
export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await prisma.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
      },
    });

    if (!article) {
      res.status(404).json({
        error: "Article Not Found!",
      });
    }

    res.status(200).json({ data: article });
  } catch (error) {
    console.log("Error Fetching Article by ID", error);
  }
};

export const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = await prisma.create({
      include: {
        author: true,
      },
      data: {
        title: title,
        content: content,
      },
    });

    res.status(200).json({ data: article });
  } catch (error) {
    console.log("Error Creating Article", error);
  }
};

export const editArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const article = await prisma.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
      },
    });

    if (!article) {
      res.status(404).json({
        error: "Article Not Found!",
      });
    }

    if (article.authorId !== req.userId) {
      return res.status(403).json({
        error: "You do not have permission to edit this article",
      });
    }

    const updatedArticle = await prisma.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
      },
      include: {
        author: true,
      },
    });

    res.status(200).json({ article: updatedArticle });
  } catch (error) {
    console.log("Error Editing Article", error);
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = prisma.findUnique({
      where: { id: id },
    });

    if (!article) {
      return res.status(404).json({ error: "Article Not Found" });
    }

    // check the auth user is the author of article
    if (article.authorId !== req.userId) {
      return res.status(403).json({
        error: "You do not have permission to delete article",
      });
    }

    await prisma.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json("Article Delete Successfully");
  } catch (error) {
    console.log("Error Deleting Article:", error);
  }
};
