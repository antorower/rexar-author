import Image from "next/image";
import Form from "@/components/ui/form/Form";
import TextInput from "@/components/ui/form/TextInput";
import NumberInput from "@/components/ui/form/NumberInput";
import { Info, BookOpen } from "lucide-react";
import Section from "@/components/ui/form/Section";
import InputContainer from "@/components/ui/form/InputContainer";

export default function Home() {
  return (
    <div className="w-full max-w-3xl mx-auto py-12">
      <Form icon={<BookOpen className="h-5 w-5 text-blue-600" />} title="Book Setup" subtitle="Συμπλήρωσε τα βασικά στοιχεία, το κοινό, τους στόχους και τους συγγραφείς.">
        <Section title="Basic Information" icon={<Info className="h-4 w-4 text-blue-500" />} />
        <InputContainer cols={1}>
          <TextInput label="Name" name="name" placeholder="Enter your name" />
          <TextInput label="Name" name="name" placeholder="Enter your name" />
        </InputContainer>
        <Section title="Basic Information" icon={<Info className="h-4 w-4 text-blue-500" />} />
        <InputContainer cols={3}>
          <TextInput label="Name" name="name" placeholder="Enter your name" />
          <TextInput label="Name" name="name" placeholder="Enter your name" />
          <NumberInput label="Age" name="age" placeholder="Enter your age" />
          <NumberInput label="Age" name="age" placeholder="Enter your age" />
          <NumberInput label="Age" name="age" placeholder="Enter your age" />
          <NumberInput label="Age" name="age" placeholder="Enter your age" />
        </InputContainer>
        <Section title="Basic Information" icon={<Info className="h-4 w-4 text-blue-500" />} />
        <TextInput label="Name" name="name" placeholder="Enter your name" />
        <TextInput label="Name" name="name" placeholder="Enter your name" />
        <NumberInput label="Age" name="age" placeholder="Enter your age" />
      </Form>
    </div>
  );
}
