import { Button, toaster } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Layout } from "../components/Layout";
import { TextEditor } from "../components/TextEditor";
import { UploadFile } from "../components/UploadFile";
import { Modal } from "../hook/modal";
import { firebase_store } from "../service/firebase_store";
import { StoryProp } from "../types/story";

export function StoryPage() {
  const [story, setStory] = useState<StoryProp>({});

  useEffect(() => {
    firebase_store.getData("content_block", "STORY").then((res) => {
      if (!!res.status) {
        setStory(res.data);
      }
    });
  }, []);

  const onChangeValue = (field: any, val: any) => {
    setStory({
      ...story,
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
            firebase_store
              .updateData("content_block", "STORY", story)
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
    <Layout title="Content Block Story">
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
                value={story.title}
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
                value={story.background}
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
                Content
              </label>
              <TextEditor
                value={story.content}
                setValue={(e: any) => onChangeValue("content", e)}
              />
              <br />
              <label
                style={{
                  color: "#101840",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                Artwork Left
              </label>
              <UploadFile
                value={story.artwork_left}
                setValue={(e: any) => onChangeValue("artwork_left", e)}
              />
              <br />
              <label
                style={{
                  color: "#101840",
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                Artwork Right
              </label>
              <UploadFile
                value={story.artwork_right}
                setValue={(e: any) => onChangeValue("artwork_right", e)}
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
