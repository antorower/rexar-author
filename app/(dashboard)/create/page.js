"use client";
import { useState } from "react";
import Form from "@/components/ui/form/Form";
import TextInput from "@/components/ui/form/TextInput";
import TextArea from "@/components/ui/form/TextAreaInput";
import SelectInput from "@/components/ui/form/SelectInput";
import { BookOpen } from "lucide-react";
import { CreateBook } from "@/lib/server-actions";

const CATEGORIES = ["Επιχειρηματικότητα", "Οικονομική Ανάπτυξη", "Παραγωγικότητα", "Αυτοβελτίωση", "Ψυχική Ισορροπία", "Σχέσεις", "Ερωτική Ζωή", "Καριέρα", "Δημιουργικότητα", "Υγεία", "Οργάνωση Ζωής", "Ταυτότητα", "Δημόσιος Λόγος", "Μάθηση"];

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [descriptions, setDescriptions] = useState([]);
  const [category, setCategory] = useState("");
  const [contentPrompt, setContentPrompt] = useState("");
  const [lessonPrompt, setLessonPrompt] = useState("");

  const SaveBook = async (e) => {
    e.preventDefault();

    const response = await CreateBook({
      data: {
        title,
        description: descriptions,
        category,
        slug: "placeholder",
        contentPrompt,
        lessonPrompt,
      },
    });

    if (response.success) {
      setTitle("");
      setDescription("");
      setDescriptions([]);
      setCategory("");
      setContentPrompt("");
      setLessonPrompt("");
    }
  };

  const AddDescription = () => {
    if (!description) return;

    setDescriptions((prev) => [...prev, description]);
    setDescription("");
  };

  const ClearDescription = () => {
    setDescription("");
    setDescriptions([]);
  };

  return (
    <div>
      <Form title="Δημιουργία Νέου Βιβλίου" subtitle="Δημιούργησε ένα νέο βιβλίο" icon={<BookOpen className="h-5 w-5 text-blue-600" />} onSubmit={SaveBook} buttonText="Δημιουργία">
        <SelectInput value={category} onChange={setCategory} name="category" label="Κατηγορία" options={CATEGORIES} />
        <TextInput value={title} onChange={setTitle} placeholder="Τίτλος" name="title" label="Τίτλος" maxLength={100} />
        <TextArea value={description} onChange={setDescription} placeholder="Περιγραφή" name="description" label="Περιγραφή" maxLength={750} />
        <div className="flex justify-end gap-4">
          <button type="button" onClick={ClearDescription} className="border cursor-pointer border-red-300 bg-red-500 px-3 py-2 rounded-md text-white">
            Καθαρισμός
          </button>
          <button type="button" onClick={AddDescription} className="border cursor-pointer border-green-300 bg-green-500 px-3 py-2 rounded-md text-white">
            Προσθήκη
          </button>
        </div>
        {descriptions.length > 0 && (
          <div className="space-y-2 border p-4 rounded-lg bg-gray-50">
            {descriptions.map((part, index) => (
              <div key={`description-${index}`} className="text-xs">
                {part}
              </div>
            ))}
          </div>
        )}
        <TextArea value={contentPrompt} onChange={setContentPrompt} placeholder="Prompt Περιεχομένων" name="contentPrompt" label="Prompt Περιεχομένων" maxLength={5000} />
        <TextArea value={lessonPrompt} onChange={setLessonPrompt} placeholder="Prompt Μαθημάτων" name="lessonPrompt" label="Prompt Μαθημάτων" maxLength={5000} />
      </Form>
    </div>
  );
}
