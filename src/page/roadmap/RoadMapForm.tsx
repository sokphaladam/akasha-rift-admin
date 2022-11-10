import { Button, TextInputField, toaster } from "evergreen-ui";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { TextEditor } from "../../components/TextEditor";
import { UploadFile } from "../../components/UploadFile";
import { Modal } from "../../hook/modal";
import { firebase_store } from "../../service/firebase_store";

export function RoadMapForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState({
    thumnail: "",
    title: "",
    description: "",
    created: "",
  });

  useEffect(() => {
    if (id) {
      firebase_store.getData("roadmap", id).then((res) => {
        if (!!res.status) {
          setRoadmap(res.data);
        }
      });
    }
  }, []);

  const onChangeValue = (val: string, e: any) => {
    setRoadmap({
      ...roadmap,
      [val]: e,
    });
  };

  const onClickSave = (e: any) => {
    e.preventDefault();
    Modal.dialog({
      message: "Are you sure want to save data?",
      title: "Confirmation",
      buttons: [
        {
          title: "Yes",
          class: "primary",
          onPress: () => {
            if (id) {
              firebase_store
                .updateData("roadmap", id, { ...roadmap })
                .then((res) => {
                  if (!!res.status) {
                    navigate("/roadmap/list");
                    toaster.success(res.message);
                  }
                });
            } else {
              const key =
                roadmap.title.toUpperCase() + new Date().getTime().toString();
              firebase_store
                .createData("roadmap", { ...roadmap, created: new Date() }, key)
                .then((res) => {
                  if (!!res.status) {
                    setRoadmap({
                      thumnail: "",
                      title: "",
                      description: "",
                      created: "",
                    });
                    toaster.success(res.message);
                  }
                });
            }
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
    <Layout title={id ? "Edit Roadmap" : "Create Roadmap"}>
      <div className="row">
        <div className="col-md-6">
          <Card>
            <Card.Body>
              <form onSubmit={onClickSave}>
                {roadmap.thumnail && (
                  <img
                    src={roadmap.thumnail}
                    alt=""
                    style={{
                      width: "100%",
                      height: "70%",
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                )}
                <div>
                  <label
                    style={{
                      color: "#101840",
                      fontWeight: 500,
                      fontSize: 14,
                    }}
                  >
                    Thumnail
                  </label>
                  <UploadFile
                    value={roadmap.thumnail}
                    setValue={(e: any) => onChangeValue("thumnail", e)}
                  />
                </div>
                <br />
                <TextInputField
                  value={roadmap.title}
                  onChange={(e: any) => onChangeValue("title", e.target.value)}
                  label="Title"
                  placeholder="Enter title here..."
                />
                <div>
                  <label
                    style={{
                      color: "#101840",
                      fontWeight: 500,
                      fontSize: 14,
                    }}
                  >
                    Description
                  </label>
                  <TextEditor
                    value={roadmap.description}
                    setValue={(e: any) => onChangeValue("description", e)}
                  />
                </div>
                <br />
                <Button appearance="primary" type="submit">
                  Save
                </Button>
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
