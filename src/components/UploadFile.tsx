/* eslint-disable jsx-a11y/alt-text */
import {
  DeleteIcon,
  EyeOpenIcon,
  FilePicker,
  Menu,
  Popover,
  Spinner,
  toaster,
} from "evergreen-ui";
import { getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Modal } from "../hook/modal";
import { UploadFileToFirebase } from "../service/firebase";

export function UploadFile({ value, setValue }: { value: any; setValue: any }) {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(value);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (value) {
      setUrl(value);
    }
  }, [value]);

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
          setUrl(downloadURL);
        });
      }
    );
  };

  const onClickRemove = () => {
    Modal.dialog({
      title: "Confirm Delete",
      message: "Are you sure you want to remove image?",
      buttons: [
        {
          title: "Yes",
          class: "primary",
          onPress: () => {
            setValue("");
            setUrl("");
            toaster.warning(
              "Image was remove from local please press button save to update information in server."
            );
          },
        },
        {
          title: "No",
          class: "danger",
          onPress: () => {},
        },
      ],
    });
  };

  const onClickPreview = () => {
    window.open(url, "_blank")?.focus();
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
        <Popover
          position="bottom-left"
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item icon={EyeOpenIcon} onClick={onClickPreview}>
                  Preview
                </Menu.Item>
                <Menu.Item
                  icon={DeleteIcon}
                  intent="danger"
                  onClick={onClickRemove}
                >
                  Delete
                </Menu.Item>
              </Menu.Group>
            </Menu>
          }
        >
          <img
            src={url}
            style={{ width: 40, height: 40, objectFit: "cover" }}
          />
        </Popover>
      )}
      <FilePicker
        onChange={onChangeFile}
        defaultValue={url}
        width={url ? window.innerWidth / 2.9 : window.innerWidth}
      />
    </div>
  );
}
