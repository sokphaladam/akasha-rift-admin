//@ts-ignore
import { CKEditor } from "@ckeditor/ckeditor5-react";
//@ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export function TextEditor({ value, setValue }: { value: any; setValue: any }) {
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
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        setValue(data);
      }}
    />
  );
}
