import { Button, TextInput, toaster } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Layout } from "../components/Layout";
import { TextEditor } from "../components/TextEditor";
import { UploadFile } from "../components/UploadFile";
import { Modal } from "../hook/modal";
import { firebase_store } from "../service/firebase_store";
import { JoinTeamContentProp } from "../types";

export function JoinTeamPage() {
  const [team, setTeam] = useState<JoinTeamContentProp>({});

  const getData = async () => {
    const data = await firebase_store.getData("content_block", "JOIN_TEAM");
    if (!!data.status) {
      setTeam(data.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onChangeValue = (field: any, val: any) => {
    const spt = (field as string).split(".");
    if (spt.length > 1) {
      setTeam({
        ...team,
        btn: {
          ...team.btn,
          [spt[1]]: val,
        },
      });
      return;
    }

    setTeam({
      ...team,
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
              .updateData("content_block", "JOIN_TEAM", team)
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
    <Layout title="Content Block Join Team">
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
                value={team.title}
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
                value={team.background}
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
                value={team.content}
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
                    value={team.btn?.label}
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
                    value={team.btn?.link}
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
