"use server";

import dbConnect from "./dbConnect";
import Book from "@/models/Book";
import { GetCurrentUser } from "./cache-functions";
import { clientOpenAI } from "./openai";
import { indexBookInVector } from "./indexBookInVector";
import { revalidatePath } from "next/cache";

export const CreateBook = async ({ data }) => {
  console.log("Request Starting");

  await dbConnect();

  const book = new Book(data);
  const author = await GetCurrentUser();
  book.author = author;
  await book.save();

  const prompt = `${book.contentPrompt}. Τίτλος: ${book.title}. Περιγραφή: ${JSON.stringify(book.description)}. Κατηγορία: ${book.category}. Προσοχή: Θέλω να μου επιστρέψεις ΜΟΝΟ ένα valid json array of strings στην μορφή ["", "", ""] που θα περιέχει ΜΟΝΟ τους τίτλους των μαθημάτων.`;

  const response = await clientOpenAI.responses.create({
    model: "gpt-5.1",
    input: prompt,
  });

  const raw = response.output_text;

  try {
    const lessons = JSON.parse(raw);
    console.log("Μαθήματα: ", lessons);

    book.lessons = lessons;
    await book.save();

    const count = await indexBookInVector(book);
    console.log(`Indexed ${count} vectors for book ${book._id}`);

    return { success: true };
  } catch (err) {
    console.log(err);
    console.error("JSON parsing error:", raw);
    return { success: false };
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
