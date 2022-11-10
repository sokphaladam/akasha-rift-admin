import { Button, TextInputField, toaster } from "evergreen-ui";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { TextEditor } from "../../components/TextEditor";
import { UploadFile } from "../../components/UploadFile";
import { Modal } from "../../hook/modal";
import { firebase_store } from "../../service/firebase_store";

export function TeamForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState({
    profile: "",
    name: "",
    info: "",
    link: "",
  });

  useEffect(() => {
    if (id) {
      firebase_store.getData("team", id).then((res) => {
        if (!!res.status) {
          setTeam(res.data);
        }
      });
    }
  }, []);

  const onChangeValue = (val: string, e: any) => {
    setTeam({
      ...team,
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
              firebase_store.updateData("team", id, team).then((res) => {
                if (!!res.status) {
                  navigate("/team/list");
                  toaster.success(res.message);
                }
              });
            } else {
              const key =
                team.name.toUpperCase() + new Date().getTime().toString();
              firebase_store.createData("team", team, key).then((res) => {
                if (!!res.status) {
                  setTeam({
                    profile: "",
                    name: "",
                    info: "",
                    link: "",
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
    <Layout title={id ? "Edit Member Team" : "Create Member Team"}>
      <div className="row">
        <div className="col-md-6">
          <Card>
            <Card.Body>
              <form onSubmit={onClickSave}>
                <div>
                  <label
                    style={{
                      color: "#101840",
                      fontWeight: 500,
                      fontSize: 14,
                    }}
                  >
                    Profile
                  </label>
                  <UploadFile
                    value={team.profile}
                    setValue={(e: any) => onChangeValue("profile", e)}
                  />
                </div>
                <br />
                <TextInputField
                  value={team.name}
                  onChange={(e: any) => onChangeValue("name", e.target.value)}
                  label="Name"
                  placeholder="Enter title here..."
                />
                <TextInputField
                  value={team.link}
                  onChange={(e: any) => onChangeValue("link", e.target.value)}
                  label="Link"
                  placeholder="Enter link here..."
                />
                <div>
                  <label
                    style={{
                      color: "#101840",
                      fontWeight: 500,
                      fontSize: 14,
                    }}
                  >
                    Information
                  </label>
                  <TextEditor
                    value={team.info}
                    setValue={(e: any) => onChangeValue("info", e)}
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
