import {
  Avatar,
  DeleteIcon,
  EditIcon,
  EyeOpenIcon,
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

export function TeamList() {
  const navigate = useNavigate();
  const [item, setItem] = useState<any[]>([]);

  const fetchData = async () => {
    const { data, status } = await firebase_store.getMutipleData("team");
    if (!!status && data) {
      setItem(data.docs.map((x) => ({ ...x.data(), id: x.id })));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onClickRemove = async (id: string) => {
    Modal.dialog({
      message: "Are you sure want to save data?",
      title: "Confirmation",
      buttons: [
        {
          title: "Yes",
          class: "primary",
          onPress: () => {
            if (id) {
              firebase_store.removeData("team", id).then((res) => {
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
    <Layout title="Team Member List">
      <div className="row">
        <div className="col-md-6">
          <Link className="btn btn-sm btn-primary" to="/team/create">
            Create new team member
          </Link>
          <br />
          <br />
          <Table>
            <Table.Head>
              <Table.TextHeaderCell className="text-right">
                Profile Front
              </Table.TextHeaderCell>
              <Table.TextHeaderCell className="text-right">
                Profile Back
              </Table.TextHeaderCell>
              <Table.TextHeaderCell className="text-right">
                Name
              </Table.TextHeaderCell>
              <Table.TextHeaderCell>Link</Table.TextHeaderCell>
              <Table.TextHeaderCell textAlign="right">
                Action
              </Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
              {item.map((x) => {
                return (
                  <Table.Row key={x.id}>
                    <Table.Cell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={x.profile} name={x.name} size={40} />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={x.profile_back} name={x.name} size={40} />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <small style={{ marginLeft: 10 }}>{x.name}</small>
                    </Table.Cell>
                    <Table.TextCell>
                      {x.link && (
                        <a href={x.link} target="_blank" rel="noreferrer">
                          {x.link}
                        </a>
                      )}
                    </Table.TextCell>
                    <Table.Cell justifyContent="end" marginRight={15}>
                      <Popover
                        position="bottom-left"
                        content={
                          <Menu>
                            <Menu.Group>
                              <Menu.Item
                                icon={EditIcon}
                                onClick={() => navigate("/team/edit/" + x.id)}
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
