import {
  DeleteIcon,
  EditIcon,
  IconButton,
  Menu,
  MoreIcon,
  Popover,
  Table,
  toaster,
} from "evergreen-ui";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Modal } from "../../hook/modal";
import { firebase_store } from "../../service/firebase_store";

export function RoadMapList() {
  const navigate = useNavigate();
  const [item, setItem] = useState<any[]>([]);

  const fetchData = async () => {
    const { data, status } = await firebase_store.getMutipleData("roadmap");
    if (!!status && data) {
      setItem(data.docs.map((x) => ({ ...x.data(), id: x.id })));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickRemove = (id: string) => {
    Modal.dialog({
      message: "Are you sure want to save data?",
      title: "Confirmation",
      buttons: [
        {
          title: "Yes",
          class: "primary",
          onPress: () => {
            if (id) {
              firebase_store.removeData("roadmap", id).then((res) => {
                if (!!res.status) {
                  setTimeout(() => {
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
    <Layout title="Road Map">
      <div className="row">
        <div className="col-md-6">
          <Link className="btn btn-sm btn-primary" to="/roadmap/create">
            Create new roadmap
          </Link>
          <br />
          <br />
          <Table>
            <Table.Head>
              <Table.TextHeaderCell className="text-center">
                Thumnail
              </Table.TextHeaderCell>
              <Table.TextHeaderCell>Title</Table.TextHeaderCell>
              <Table.TextHeaderCell textAlign="right">
                Action
              </Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
              {item.map((x) => {
                return (
                  <Table.Row key={x.id}>
                    <Table.Cell
                      textTransform="capitalize"
                      className="text-center"
                      padding={0}
                    >
                      <img
                        src={x.thumnail}
                        alt=""
                        style={{
                          width: "100%",
                          height: 75,
                          objectFit: "cover",
                        }}
                      />
                    </Table.Cell>
                    <Table.TextCell textTransform="capitalize">
                      {x.title}
                    </Table.TextCell>
                    <Table.Cell justifyContent="end">
                      <Popover
                        position="bottom-left"
                        content={
                          <Menu>
                            <Menu.Group>
                              <Menu.Item
                                icon={EditIcon}
                                onClick={() =>
                                  navigate("/roadmap/edit/" + x.id)
                                }
                              >
                                Edit
                              </Menu.Item>
                              <Menu.Item
                                icon={DeleteIcon}
                                intent="danger"
                                onClick={() => onClickRemove(x.id)}
                              >
                                Delete
                              </Menu.Item>
                            </Menu.Group>
                          </Menu>
                        }
                      >
                        <IconButton icon={MoreIcon} />
                      </Popover>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
