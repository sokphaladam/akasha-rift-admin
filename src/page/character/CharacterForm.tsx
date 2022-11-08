import { TextInputField, toaster } from "evergreen-ui";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UploadFile } from "../../components/UploadFile";
import { Modal } from "../../hook/modal";
import { firebase_store } from "../../service/firebase_store";

export function CharacterForm({ id }: { id: any }) {
  const navigate = useNavigate();
  const [character, setCharacter] = useState({
    profile: "",
    name: "",
    bg_profile: "",
  });

  useEffect(() => {
    if (id) {
      firebase_store.getData("character", id).then((res) => {
        if (!!res.status) {
          setCharacter(res.data);
        }
      });
    }
  }, []);

  const onChangeValue = (field: any, val: any) => {
    setCharacter({
      ...character,
      [field]: val,
    });
  };

  const onClickSave = (e: any) => {
    e.preventDefault();
    Modal.dialog({
      message: "Are you sure want to save data?",
      title: "Confirm content block",
      buttons: [
        {
          title: "Yes",
          class: "primary",
          onPress: () => {
            if (id) {
              firebase_store
                .updateData("character", id, character)
                .then((res) => {
                  if (!!res.status) {
                    navigate("/character/list");
                    toaster.success(res.message);
                  }
                });
            } else {
              const key =
                character.name.toUpperCase() + new Date().getTime().toString();
              firebase_store
                .createData("character", character, key)
                .then((res) => {
                  if (!!res.status) {
                    setCharacter({
                      profile: "",
                      name: "",
                      bg_profile: "",
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
              Profile Image
            </label>
            <UploadFile
              value={character.profile}
              setValue={(e: any) => onChangeValue("profile", e)}
            />
          </div>
          <br />
          <div>
            <label
              style={{
                color: "#101840",
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Big Profile Image
            </label>
            <UploadFile
              value={character.bg_profile}
              setValue={(e: any) => onChangeValue("bg_profile", e)}
            />
          </div>
          <br />
          <TextInputField
            required
            value={character.name}
            onChange={(e: any) => onChangeValue("name", e.target.value)}
            label="Character Name"
            placeholder="Enter character name..."
          />
          <button type="submit" className="btn btn-sm btn-primary">
            Save
          </button>
        </form>
      </Card.Body>
    </Card>
  );
}
