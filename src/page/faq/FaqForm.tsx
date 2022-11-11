import { Button, TextInputField, toaster } from "evergreen-ui";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { TextEditor } from "../../components/TextEditor";
import { Modal } from "../../hook/modal";
import { firebase_store } from "../../service/firebase_store";

export function FaqForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [faq, setFaq] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    if (id) {
      firebase_store.getData("faq", id).then((res) => {
        if (!!res.status) {
          setFaq(res.data);
        }
      });
    }
  }, []);

  const onChangeValue = (val: string, e: any) => {
    setFaq({
      ...faq,
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
              firebase_store.updateData("faq", id, faq).then((res) => {
                if (!!res.status) {
                  navigate("/faq/list");
                  toaster.success(res.message);
                }
              });
            } else {
              const key = new Date().getTime().toString();
              firebase_store.createData("faq", faq, key).then((res) => {
                if (!!res.status) {
                  setFaq({ question: "", answer: "" });
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
    <Layout title={id ? "Edit FAQ" : "Create FAQ"}>
      <div className="row">
        <div className="col-md-6">
          <Card>
            <Card.Body>
              <form onSubmit={onClickSave}>
                <TextInputField
                  placeholder="Enter question here..."
                  label="Question"
                  value={faq.question}
                  onChange={(e: any) =>
                    onChangeValue("question", e.target.value)
                  }
                  required
                />
                <div>
                  <label
                    style={{
                      color: "#101840",
                      fontWeight: 500,
                      fontSize: 14,
                    }}
                  >
                    Answer
                  </label>
                  <TextEditor
                    value={faq.answer}
                    setValue={(e: any) => onChangeValue("answer", e)}
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
