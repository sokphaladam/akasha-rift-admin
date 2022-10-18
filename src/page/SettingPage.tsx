/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextInputField } from "evergreen-ui";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Layout } from "../components/Layout";
import { UploadFile } from "../components/UploadFile";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { firestore } from "../service/firebase";

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
}

export function SettingPage() {
  const docRef = doc(firestore, "setting", "sQBZqxpwn45QrmH5tzhJ");
  const [setting, setSetting] = useState<PropsSettingInput | null>(null);
  const [background, setBackground] = useState<any[]>(["", "", ""]);
  const [link, setLink] = useState<PropsSettingLinkInput | null>({
    cardano: "",
    twitter: "",
    discord: "",
  });

  const getData = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSetting(docSnap.data());
      setLink(docSnap.data().link);
      setBackground(docSnap.data().background);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onClickSave = async () => {
    const data = {
      logo: setting?.logo,
      block: setting?.block,
      link,
      background,
    };
    console.log(data);
    setDoc(docRef, data)
      .then((docRef) => {
        console.log("Entire Document has been updated successfully");
      })
      .catch((error) => {
        console.log(error);
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
          <Button appearance="primary" onClick={onClickSave}>
            Save
          </Button>
        </div>
      </div>
    </Layout>
  );
}
