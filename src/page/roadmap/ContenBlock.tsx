import { Button, toaster } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Layout } from "../../components/Layout";
import { UploadFile } from "../../components/UploadFile";
import { Modal } from "../../hook/modal";
import { firebase_store } from "../../service/firebase_store";
import { RoadMapContentProp } from "../../types";

export function ContentBlock() {
  const [roadmap, setRoadMap] = useState<RoadMapContentProp>({});

  const getData = async () => {
    const data = await firebase_store.getData("content_block", "ROADMAP");
    if (!!data.status) {
      setRoadMap(data.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onChangeValue = (field: any, val: any) => {
    setRoadMap({
      ...roadmap,
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
              .updateData("content_block", "ROADMAP", roadmap)
              .then((res) => {
                if (!!res.status) {
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
    <Layout title="Content Block Roadmap">
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
                value={roadmap.title}
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
                value={roadmap.background}
                setValue={(e: any) => onChangeValue("background", e)}
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
