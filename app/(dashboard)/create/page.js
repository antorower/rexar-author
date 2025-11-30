"use client";
import { useState } from "react";
import Form from "@/components/ui/form/Form";
import TextInput from "@/components/ui/form/TextInput";
import TextArea from "@/components/ui/form/TextAreaInput";
import SelectInput from "@/components/ui/form/SelectInput";
import { BookOpen } from "lucide-react";
import { CreateBook } from "@/lib/server-actions";

const CATEGORIES = ["Επιχειρηματικότητα", "Οικονομική Ανάπτυξη", "Παραγωγικότητα", "Αυτοβελτίωση", "Ψυχική Ισορροπία", "Σχέσεις", "Ερωτική Ζωή", "Καριέρα", "Δημιουργικότητα", "Υγεία", "Οργάνωση Ζωής", "Ταυτότητα", "Δημόσιος Λόγος", "Μάθηση"];

const LANGUAGES = [
  { label: "Greek", value: "el" },
  { label: "Enligsh", value: "en" },
];

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [contentPrompt, setContentPrompt] = useState("");
  const [lessonPrompt, setLessonPrompt] = useState("");

  const subcategoryOptions = category && SUBCATEGORIES[category] ? SUBCATEGORIES[category] : [];

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubcategory("");
  };

  const SaveBook = async (e) => {
    e.preventDefault();

    const response = await CreateBook({
      data: {
        title,
        description,
        category,
        slug: "placeholder",
        contentPrompt,
        lessonPrompt,
      },
    });

    if (response.success) {
      setTitle("");
      setDescription("");
      setCategory("");
      setContentPrompt("");
      setLessonPrompt("");
    }
  };

  return (
    <div>
      <Form title="Δημιουργία Νέου Βιβλίου" subtitle="Δημιούργησε ένα νέο βιβλίο" icon={<BookOpen className="h-5 w-5 text-blue-600" />} onSubmit={SaveBook} buttonText="Δημιουργία">
        <SelectInput value={category} onChange={handleCategoryChange} name="category" label="Κατηγορία" options={CATEGORIES} />
        <TextInput value={title} onChange={setTitle} placeholder="Τίτλος" name="title" label="Τίτλος" maxLength={100} />
        <TextArea value={description} onChange={setDescription} placeholder="Περιγραφή" name="description" label="Περιγραφή" maxLength={750} />
        <TextArea value={contentPrompt} onChange={setContentPrompt} placeholder="Prompt Περιεχομένων" name="contentPrompt" label="Prompt Περιεχομένων" maxLength={900} />
        <TextArea value={lessonPrompt} onChange={setLessonPrompt} placeholder="Prompt Μαθημάτων" name="lessonPrompt" label="Prompt Μαθημάτων" maxLength={900} />
      </Form>
    </div>
  );
}
