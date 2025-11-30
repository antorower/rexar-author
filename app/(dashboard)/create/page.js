"use client";
import { useState } from "react";
import Form from "@/components/ui/form/Form";
import TextInput from "@/components/ui/form/TextInput";
import TextArea from "@/components/ui/form/TextAreaInput";
import SelectInput from "@/components/ui/form/SelectInput";
import { BookOpen } from "lucide-react";
import { CreateBook } from "@/lib/server-actions";

const CATEGORIES = ["Επιχειρηματικότητα", "Οικονομική Ανάπτυξη", "Παραγωγικότητα", "Αυτοβελτίωση", "Ψυχική Ισορροπία", "Σχέσεις", "Ερωτική Ζωή", "Καριέρα", "Δημιουργικότητα", "Υγεία", "Οργάνωση Ζωής", "Ταυτότητα", "Δημόσιος Λόγος", "Μάθηση"];

const SUBCATEGORIES = {
  Επιχειρηματικότητα: ["Startups", "Επαγγελματικές Ιδέες", "Πλάνο", "Product", "Growth", "Marketing", "Sales", "Funnels", "Brand", "Πελάτες", "Launch", "Αυτοματοποίηση", "Freelance", "Consulting"],
  "Οικονομική Ανάπτυξη": ["Εισόδημα", "Πόροι", "Budget", "Επενδύσεις", "Crypto", "Παθητικό Εισόδημα", "Οικονομική Νοημοσύνη", "Οικονομική Στρατηγική", "Ασφάλεια", "Ανεξαρτησία"],
  Παραγωγικότητα: ["Συνήθειες", "Ρουτίνα", "Focus", "Deep Work", "Ροή", "Σύστημα", "Anti-Procrastination", "Στόχοι", "Planning", "Time Blocks", "Performance"],
  Αυτοβελτίωση: ["Νοοτροπία", "Πειθαρχία", "Αυτοπεποίθηση", "Αυτοεκτίμηση", "Όρια", "Ξεπέρασμα Φόβων", "Απόφαση", "Αυτογνωσία", "Μεταμόρφωση", "Νόημα Ζωής"],
  "Ψυχική Ισορροπία": ["Στρες", "Άγχος", "Συναισθήματα", "Ηρεμία", "Στωικισμός", "Mindfulness", "Ενέργεια", "Αντοχή", "Ανθεκτικότητα", "Επανεκκίνηση"],
  Σχέσεις: ["Επικοινωνία", "Συναισθηματική Επαφή", "Εμπιστοσύνη", "Συγκρούσεις", "Όρια", "Σύνδεση", "Φιλία", "Οικογένεια", "Κοινωνικές Δεξιότητες", "Αυθεντικότητα"],
  "Ερωτική Ζωή": ["Dating", "Ηλεκτρισμός", "Έλξη", "Δέσιμο", "Δυναμικές", "Healing", "Pattern Breaking", "Μηχανισμοί Γνωριμίας", "Επικοινωνία Ζευγαριού", "Συναισθηματική Ασφάλεια"],
  Καριέρα: ["Skills", "Leadership", "Projecting", "Visibility", "Workplace Dynamics", "Προαγωγή", "Αλλαγή Πορείας", "Δίκτυο", "Αναγνώριση", "Απόδοση"],
  Δημιουργικότητα: ["Ιδέες", "Έμπνευση", "Storytelling", "Γραφή", "Content", "Προσωπική Έκφραση", "Δημιουργική Ροή", "Branding Προσωπικό", "Δημιουργικές Δεξιότητες"],
  Υγεία: ["Διατροφή", "Κίνηση", "Ύπνος", "Ρουτίνες Υγείας", "Biohacking", "Longevity", "Ανάκτηση Ενέργειας", "Ορμονική Ισορροπία", "Ευεξία", "Καθημερινά Πρότυπα"],
  "Οργάνωση Ζωής": ["Σπίτι", "Digital", "Ροές", "Minimal", "Καθαρότητα", "Πρόγραμμα", "Σύστημα", "Απλοποίηση", "Τάξη", "Προσωπικός Χώρος"],
  Ταυτότητα: ["Εικόνα", "Ήθος", "Αξίες", "Προσωπικό Όραμα", "Αυθεντικότητα", "Ρόλοι", "Εσωτερική Σταθερότητα", "Προσωπικό Στυλ", "Αυτοπροσδιορισμός"],
  "Δημόσιος Λόγος": ["Ομιλία", "Παρουσίαση", "Πειθώ", "Επικοινωνιακό Στυλ", "Charisma", "Pitch", "Αφήγηση", "Ήχος", "Σκηνικό Presence"],
  Μάθηση: ["Μελέτη", "Σημειώσεις", "Ταχύτητα Μάθησης", "Μνήμη", "Εστίαση", "Skills Upgrading", "Διάβασμα", "Κατανόηση", "Μεθοδολογία Μάθησης"],
};

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
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
        subcategory,
        slug: "placeholder",
        contentPrompt,
        lessonPrompt,
      },
    });

    if (response.success) {
      setTitle("");
      setDescription("");
      setCategory("");
      setSubcategory("");
      setContentPrompt("");
      setLessonPrompt("");
    }
  };

  return (
    <div>
      <Form title="Δημιουργία Νέου Βιβλίου" subtitle="Δημιούργησε ένα νέο βιβλίο" icon={<BookOpen className="h-5 w-5 text-blue-600" />} onSubmit={SaveBook} buttonText="Δημιουργία">
        <SelectInput value={category} onChange={handleCategoryChange} name="category" label="Κατηγορία" options={CATEGORIES} />

        <SelectInput value={subcategory} onChange={setSubcategory} name="subcategory" label="Υποκατηγορία" options={subcategoryOptions} disabled={!category} />

        <TextInput value={title} onChange={setTitle} placeholder="Τίτλος" name="title" label="Τίτλος" maxLength={100} />
        <TextArea value={description} onChange={setDescription} placeholder="Περιγραφή" name="description" label="Περιγραφή" maxLength={750} />
        <TextArea value={contentPrompt} onChange={setContentPrompt} placeholder="Prompt Περιεχομένων" name="contentPrompt" label="Prompt Περιεχομένων" maxLength={900} />
        <TextArea value={lessonPrompt} onChange={setLessonPrompt} placeholder="Prompt Μαθημάτων" name="lessonPrompt" label="Prompt Μαθημάτων" maxLength={900} />
      </Form>
    </div>
  );
}
