"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "./dbConnect";
import Book from "@/models/Book";
import { GetCurrentUser } from "./cache-functions";
import { clientOpenAI } from "./openai";
import { indexBookInVector } from "./indexBookInVector";

export const CreateBook = async ({ data }) => {
  await dbConnect();

  const book = new Book(data);
  const author = await GetCurrentUser();
  book.author = author;
  await book.save();

  const prompt = `${book.contentPrompt}. Τίτλος: ${book.title}. Περιγραφή: ${book.description}. Κατηγορία: ${book.category}. Υποκατηγορία: ${book.subcategory}. Έχε υπόψη σου ότι το βιβλίο αυτό θα το πουλάμε πολύ ακριβά και θα πρέπει να δώσουμε αξία στον αναγνώστη. Θα πρέπει να αγγίξουμε το πρόβλημα του και νιώσει ότι πραγματικά αγόρασε κάτι που τον βοήθησε. Προσοχή: Θέλω να μου επιστρέψεις ΜΟΝΟ ένα valid json array of strings στην μορφή ["", "", ""] που θα περιέχει ΜΟΝΟ τους τίτλους των μαθημάτων.`;

  console.log("REQUEST STARTING");
  const response = await clientOpenAI.responses.create({
    model: "gpt-5.1",
    input: prompt,
  });

  console.log("THE RESPONSE: ", response);
  const raw = response.output_text;
  console.log("Raw: ", raw);
  try {
    const lessons = JSON.parse(raw);
    console.log(lessons);

    // 1. Σώζουμε lessons στο βιβλίο
    book.lessons = lessons;
    await book.save();

    // 2. Κάνουμε index στο Upstash Vector
    const count = await indexBookInVector(book);
    console.log(`Indexed ${count} vectors for book ${book._id}`);

    return { success: true };
  } catch (err) {
    console.log(err);
    console.error("JSON parsing error:", raw);
    return { success: false };
  }
};

export const CreateBook2 = async ({ data }) => {
  await dbConnect();

  const book = new Book(data);
  await book.save();

  const prompt = `${book.contentPrompt}. Τίτλος: ${book.title}. Περιγραφή: ${book.description}. Κατηγορία: ${book.category}. Υποκατηγορία: ${book.subcategory}. Έχε υπόψη σου ότι το βιβλίο αυτό θα το πουλάμε πολύ ακριβά και θα πρέπει να δώσουμε αξία στον αναγνώστη. Θα πρέπει να αγγίξουμε το πρόβλημα του και νιώσει ότι πραγματικά αγόρασε κάτι που τον βοήθησε. Προσοχή: Θέλω να μου επιστρέψεις ΜΟΝΟ ένα valid json array of strings που θα περιέχει ΜΟΝΟ τους τίτλους των μαθημάτων.`;

  console.log("REQUEST STARTING");
  const response = await clientOpenAI.responses.create({
    model: "gpt-5.1", // ή το ακριβές model name σου
    input: prompt,
  });
  console.log("THE RESPONSE: ", response);
  let raw = response.output_text;

  try {
    const lessons = JSON.parse(raw);
    console.log(lessons);
    book.lessons = lessons;
    await book.save();

    //await CreateLesson(book, JSON.stringify(book.lessons), book.lessons[0]);
    return lessons;
  } catch (err) {
    console.error("JSON parsing error:", raw);
    throw new Error("AI returned invalid JSON");
  }
};

export const CreateLesson = async (book, lessons, lesson) => {
  const prompt = `${book.lessonPrompt}. Προφίλ Αναγνώστη: "Νέος επιχειρηματίας που προσπαθεί αναπτύσει marketing agency",  Τίτλος: ${book.title}. Περιγραφή: ${book.description}. Κατηγορία: ${book.category}. Υποκατηγορία: ${book.subcategory}. Έχε υπόψη σου ότι το βιβλίο αυτό θα το πουλάμε πολύ ακριβά και θα πρέπει να δώσουμε αξία στον αναγνώστη. Θα πρέπει να αγγίξουμε το πρόβλημα του και νιώσει ότι πραγματικά αγόρασε κάτι που τον βοήθησε. Προσοχή: Θέλω να μου επιστρέψεις ΜΟΝΟ ένα array of objects της μορφης [{title: "bla bla", text: "blabla"}] έτοιμο να το αποθηκεύσω στην βάση δεδομένων μου, το οποίο θα είναι το κείμενο του μαθήματος. Θα πραγματεύεται με τον καλύτερο δυνατό τρόπο το μάθημα ${lesson} του προαναφερθέντος βιβλίου με στόχο να βοηθήσει τον αναγνώστη και να του δώσει όσο γίνεται περισσότερη αξία. Είναι πολύ σημαντικό να κρατάει το ενδιαφέρον όσο γίνεται περισσότερο, να είναι value for time, να αγγίζει τον πρόβλημα του αναγνώστη και να νιώθει ότι κάθε τι που διαβάζει του προσφέρει.`;

  console.log("REQUEST LESSON STARTING");
  const response = await clientOpenAI.responses.create({
    model: "gpt-5.1", // ή το ακριβές model name σου
    input: prompt,
  });
  console.log("THE RESPONSE LESSON: ", response);
  try {
    let raw = response.output_text;
    console.log("Το μάθημα: ", raw);
  } catch (err) {
    console.error("JSON parsing error:", raw);
    throw new Error("AI returned invalid JSON");
  }
};

export const UpdateBook = async ({ bookId, data }) => {
  await dbConnect();

  console.log("Updating book with ID:", bookId);
  console.log("Data to update:", data);

  const updated = await Book.findByIdAndUpdate(bookId, { $set: data }, { new: true, runValidators: true }).lean();

  revalidatePath(`/dashboard/books/${bookId}`);

  return { success: !!updated };
};

// Create Book Actions
export const SaveBookTitle = async ({ bookId, title }) => {
  await dbConnect();

  if (!bookId == null || bookId == null) {
    const newBook = new Book({ title });
    await newBook.save();
    return { success: true, bookId: newBook._id.toString() };
  }

  const updated = await Book.findByIdAndUpdate(bookId, { $set: { title } }, { new: true, runValidators: true }).lean();
  return { success: !!updated };
};
