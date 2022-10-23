/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextInputField, toaster } from "evergreen-ui";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Layout } from "../components/Layout";
import { UploadFile } from "../components/UploadFile";
import { TextEditor } from "../components/TextEditor";
import { firebase_store } from "../service/firebase_store";
import { Modal } from "../hook/modal";

interface PropsSettingLinkInput {
  twitter?: string | null;
  discord?: string | null;
  cardano?: string | null;
}

interface PropsSettingInput {
  logo?: string | null;
  background?: string[] | [];
  block?: {
    image?: string;
    text?: string;
    background?: string;
  } | null;
  footer?: {
    content?: string[] | [];
  };
}

export function SettingPage() {
  const [setting, setSetting] = useState<PropsSettingInput | null>(null);
  const [background, setBackground] = useState<any[]>(["", "", ""]);
  const [link, setLink] = useState<PropsSettingLinkInput | null>({
    cardano: "",
    twitter: "",
    discord: "",
  });
  const [footer, setFooter] = useState({ content: "" });

  const getData = async () => {
    firebase_store.getData("setting", "sQBZqxpwn45QrmH5tzhJ").then((res) => {
      if (!!res.status) {
        setSetting(res.data);
        setLink(res.data.link);
        setBackground(res.data.background);
        setFooter(
          res.data.footer
            ? res.data.footer
            : {
                content: "",
              }
        );
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const onClickSave = async () => {
    Modal.dialog({
      message: "Are you sure want to save data?",
      title: "Confirm content block",
      buttons: [
        {
          title: "Yes",
          class: "primary",
          onPress: () => {
            const data = {
              logo: setting?.logo,
              block: setting?.block,
              link,
              background,
              footer,
            };
            firebase_store
              .updateData("setting", "sQBZqxpwn45QrmH5tzhJ", data)
              .then((res) => {
                if (!!res.status) {
                  toaster.success(res.message);
                }
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
    <Layout title="Setting">
      <div className="row">
        <div className="col-md-6">
          <Card>
            <CardHeader className="bg-primary text-light">Logo</CardHeader>
            <Card.Body>
              <UploadFile
                value={setting?.logo}
                setValue={(e: any) => setSetting({ ...setting, logo: e + "" })}
              />
            </Card.Body>
          </Card>
          <br />
          <Card>
            <CardHeader className="bg-primary text-light">Link</CardHeader>
            <Card.Body>
              <div style={{ display: "flex" }}>
                <TextInputField
                  label="Twitter"
                  width={250}
                  value={link?.twitter + ""}
                  onChange={(e: any) =>
                    setLink({
                      ...link,
                      twitter: e.target.value,
                    })
                  }
                />
                <TextInputField
                  label="Discord"
                  width={250}
                  marginLeft={10}
                  marginRight={10}
                  value={link?.discord + ""}
                  onChange={(e: any) =>
                    setLink({
                      ...link,
                      discord: e.target.value,
                    })
                  }
                />
                <TextInputField
                  label="Cardano"
                  width={250}
                  value={link?.cardano + ""}
                  onChange={(e: any) =>
                    setLink({
                      ...link,
                      cardano: e.target.value,
                    })
                  }
                />
              </div>
            </Card.Body>
          </Card>
          <br />
          <Card>
            <CardHeader className="bg-primary text-light">
              Background Page
            </CardHeader>
            <Card.Body>
              <UploadFile
                value={background[0]}
                setValue={(e: any) => {
                  const back: any[] = background;
                  back[0] = e;
                  setBackground(back);
                }}
              />
              <br />
              <UploadFile
                value={background[1]}
                setValue={(e: any) => {
                  const back: any[] = background;
                  back[1] = e;
                  setBackground(back);
                }}
              />
              <br />
              <UploadFile
                value={background[2]}
                setValue={(e: any) => {
                  const back: any[] = background;
                  back[2] = e;
                  setBackground(back);
                }}
              />
            </Card.Body>
          </Card>
          <br />
          <Card>
            <CardHeader className="bg-primary text-light">
              All Block Content
            </CardHeader>
            <Card.Body>
              {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
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
                    value={setting?.block?.image}
                    setValue={(e: any) =>
                      setSetting({
                        ...setting,
                        block: { ...setting?.block, image: e.target.value },
                      })
                    }
                  />
                </div>
                <TextInputField
                  label="Title Text"
                  width={350}
                  value={setting?.block?.text}
                  onChange={(e: any) =>
                    setSetting({
                      ...setting,
                      block: { ...setting?.block, text: e.target.value },
                    })
                  }
                />
              </div> */}
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
                value={setting?.block?.image}
                setValue={(e: any) =>
                  setSetting({
                    ...setting,
                    block: { ...setting?.block, image: e },
                  })
                }
              />

              <label
                style={{
                  color: "#101840",
                  fontWeight: 500,
                  fontSize: 14,
                  marginBottom: 3,
                }}
              >
                Background Image
              </label>
              <UploadFile
                value={setting?.block?.background}
                setValue={(e: any) =>
                  setSetting({
                    ...setting,
                    block: { ...setting?.block, background: e },
                  })
                }
              />
            </Card.Body>
          </Card>
          <br />
          <Card>
            <CardHeader className="bg-primary text-light">Footer</CardHeader>
            <Card.Body>
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
                value={footer.content}
                setValue={(e: any) => {
                  setFooter({
                    ...footer,
                    content: e,
                  });
                }}
              />
              <br />
            </Card.Body>
          </Card>
          <br />
          <Button appearance="primary" onClick={onClickSave}>
            Save
          </Button>
        </div>
      </div>
    </Layout>
  );
}
