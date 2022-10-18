/* eslint-disable jsx-a11y/alt-text */
import { FilePicker, Spinner } from "evergreen-ui";
import { getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { UploadFileToFirebase } from "../service/firebase";

export function UploadFile({ value, setValue }: { value: any; setValue: any }) {
  const [loading, setLoading] = useState(false);

  const onChangeFile = (files: any) => {
    const upload = UploadFileToFirebase(files[0]);
    upload.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "paused":
            setLoading(false);
            break;
          case "running":
            setLoading(true);
            break;
          case "success":
            setLoading(false);
            break;
        }
      },
      (error) => {},
      () => {
        setLoading(false);
        getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
          setValue(downloadURL);
        });
      }
    );
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {loading && <Spinner size={16} />}
      {value && (
        <img
          src={value}
          style={{ width: 40, height: 40, objectFit: "cover" }}
        />
      )}
      <FilePicker
        onChange={onChangeFile}
        defaultValue={value}
        width={value ? window.innerWidth / 2.9 : window.innerWidth}
      />
    </div>
  );
}
