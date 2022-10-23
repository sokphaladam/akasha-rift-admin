import { Button, TextInput, toaster } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Layout } from "../components/Layout";
import { TextEditor } from "../components/TextEditor";
import { UploadFile } from "../components/UploadFile";
import { Modal } from "../hook/modal";
import { firebase_store } from "../service/firebase_store";
import { LogoProp } from "../types/logo";

export function LogoPage() {
  const [logo, setLogo] = useState<LogoProp>({});

  const getData = async () => {
    const data = await firebase_store.getData("content_block", "LOGO");
    if (!!data.status) {
      setLogo(data.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onChangeValue = (field: any, val: any) => {
    const spt = (field as string).split(".");
    if (spt.length > 1) {
      setLogo({
        ...logo,
        btn: {
          ...logo.btn,
          [spt[1]]: val,
        },
      });
      return;
    }

    setLogo({
      ...logo,
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
              .updateData("content_block", "LOGO", logo)
              .then((res) => {
                if (!!res.status) {
                  toaster.success(res.message);
                }
              })
              .catch((err) => {
                toaster.danger(err.message);
              });
            console.log(logo);
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
    <Layout title="Content Block Logo">
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
                value={logo.title}
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
                value={logo.background}
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
                value={logo.content}
                setValue={(e: any) => onChangeValue("content", e)}
              />
              <br />
              <div className="row">
                <div className="col-6">
                  <label
                    style={{
                      color: "#101840",
                      fontWeight: 500,
                      fontSize: 14,
                    }}
                  >
                    Button Label
                  </label>
                  <br />
                  <TextInput
                    value={logo.btn?.label}
                    onChange={(e: any) =>
                      onChangeValue("btn.label", e.target.value)
                    }
                    width={"100%"}
                  />
                </div>
                <div className="col-6">
                  <label
                    style={{
                      color: "#101840",
                      fontWeight: 500,
                      fontSize: 14,
                    }}
                  >
                    Button Link
                  </label>
                  <br />
                  <TextInput
                    value={logo.btn?.link}
                    onChange={(e: any) =>
                      onChangeValue("btn.link", e.target.value)
                    }
                    width={"100%"}
                  />
                </div>
              </div>
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
