//@ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
//@ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";

export function TextEditor({ value, setValue }: { value: any; setValue: any }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <CKEditor
      config={{
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "bulletedList",
          "numberedList",
        ],
      }}
      editor={ClassicEditor}
      data={value}
      onChange={async (event: any, editor: any) => {
        const data = editor.getData();
        await setValue(data);
      }}
    />
  );
}
