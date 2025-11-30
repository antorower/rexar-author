import { vectorIndex } from "./vector";
import { getEmbedding } from "./embeddings";

export async function indexBookInVector(book) {
  const bookId = String(book._id);

  const parts = [];

  parts.push(`Τίτλος: ${book.title}`);
  parts.push(`Περιγραφή: ${book.description}`);
  parts.push(`Κατηγορία: ${book.category}`);
  parts.push(`Υποκατηγορία: ${book.subcategory}`);

  if (Array.isArray(book.lessons) && book.lessons.length > 0) {
    const lessonsText = book.lessons.map((lessonTitle, index) => `Lesson ${index + 1}: ${lessonTitle}`).join("\n");
    parts.push(`Μαθήματα:\n${lessonsText}`);
  }

  const fullText = parts.join("\n\n");

  const embedding = await getEmbedding(fullText);

  await vectorIndex.upsert([
    {
      id: `book-${bookId}`,
      vector: embedding,
      metadata: {
        type: "book",
        bookId,
        title: book.title,
        cover: book.slug,
        category: book.category,
        subcategory: book.subcategory,
      },
    },
  ]);

  return 1;
}
