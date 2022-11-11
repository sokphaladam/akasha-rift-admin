import { toaster } from "evergreen-ui";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Modal } from "../../hook/modal";
import { firebase_store } from "../../service/firebase_store";

export function FaqList() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(-1);
  const [item, setItem] = useState<any[]>([]);

  const fetchData = async () => {
    const { data, status } = await firebase_store.getMutipleData("faq");
    if (!!status && data) {
      setItem(data.docs.map((x) => ({ ...x.data(), id: x.id })));
      setIndex(0);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickRemove = async (id: string) => {
    Modal.dialog({
      message: "Are you sure want to remove data?",
      title: "Confirmation",
      buttons: [
        {
          title: "Yes",
          class: "primary",
          onPress: () => {
            if (id) {
              firebase_store.removeData("faq", id).then((res) => {
                if (!!res.status) {
                  setTimeout(() => {
                    setIndex(-1);
                    fetchData();
                  }, 500);
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
    <Layout title="FAQ">
      <div className="row">
        <div className="col-md-6">
          <Link className="btn btn-sm btn-primary" to="/faq/create">
            Create new FAQ
          </Link>
          <br />
          <br />
          <div className="accordion">
            {item.map((x, i) => {
              return (
                <div className="accordion-item" id="accordionExample">
                  <h2 className="accordion-header" id={"heading" + x.id}>
                    <button
                      className={`accordion-button ${
                        index === i ? "" : "collapsed"
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#" + x.id}
                      aria-expanded="true"
                      aria-controls={x.id}
                      onClick={() => setIndex(index === i ? -1 : i)}
                    >
                      {x.question}
                    </button>
                  </h2>
                  <div
                    id={x.id}
                    className={`accordion-collapse collapse ${
                      index === i ? "show" : ""
                    }`}
                    aria-labelledby={"heading" + x.id}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div dangerouslySetInnerHTML={{ __html: x.answer }} />
                      <div style={{ display: "flex", justifyContent: "end" }}>
                        <Link
                          to={"/faq/edit/" + x.id}
                          className="btn btn-sm btn-primary"
                          style={{ marginRight: 10 }}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => onClickRemove(x.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
