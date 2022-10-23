import { Button, toaster } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Layout } from "../../components/Layout";
import { TextEditor } from "../../components/TextEditor";
import { UploadFile } from "../../components/UploadFile";
import { Modal } from "../../hook/modal";
import { firebase_store } from "../../service/firebase_store";
import { CharacterContentProp } from "../../types";

export function ContentBlock() {
  const [content, setContent] = useState<CharacterContentProp>({});

  useEffect(() => {
    firebase_store.getData("content_block", "CHARACTER").then((res) => {
      if (!!res.status) {
        setContent(res.data);
      }
    });
  }, []);

  const onChangeValue = (field: any, val: any) => {
    setContent({
      ...content,
      [field]: val,
    });
  };

  const onClickSave = () => {
    Modal.dialog({
      message: "Are you sure want to save data?",
      title: "Confirm content block",
      buttons: [
        {
          title: "Yes",
          class: "primary",
          onPress: () => {
            console.log(content);
            firebase_store
              .updateData("content_block", "CHARACTER", content)
              .then((res) => {
                if (res.status) {
                  toaster.success(res.message);
                }
              })
              .catch((err) => {
                toaster.danger(err.message);
              });
          },
        },
        {
          title: "Cancel",
          class: "danger",
          onPress: () => {},
        },
      ],
    });
  };

  return (
    <Layout title="Content Block Character">
      <div className="row">
        <div className="col-md-6">
          <Card>
            <Card.Body>
              <label
                style={{
                  color: "#101840",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                Title Image
              </label>
              <UploadFile
                value={content.title}
                setValue={(e: any) => onChangeValue("title", e)}
              />
              <br />
              <label
                style={{
                  color: "#101840",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                Background Image
              </label>
              <UploadFile
                value={content.background}
                setValue={(e: any) => onChangeValue("background", e)}
              />
              <br />
              <label
                style={{
                  color: "#101840",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                Content Top
              </label>
              <TextEditor
                value={content.content_one}
                setValue={(e: any) => onChangeValue("content_one", e)}
              />
              <br />
              <label
                style={{
                  color: "#101840",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                Content Bottom
              </label>
              <TextEditor
                value={content.content_two}
                setValue={(e: any) => onChangeValue("content_two", e)}
              />
              <br />
              <Button appearance="primary" onClick={onClickSave}>
                Save
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
