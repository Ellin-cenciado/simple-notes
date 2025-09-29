import Notes from "@/components/Notes";
import Archive from "@/components/Archive"
import { NotesProvider } from "@/context/NotesContext";

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <NotesProvider>
        <Notes />
        <h1>Archive</h1>
        <Archive/>
      </NotesProvider>
    </div>
  );
}
