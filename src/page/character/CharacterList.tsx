import {
  Avatar,
  DeleteIcon,
  DotIcon,
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

export function CharacterList() {
  const navigate = useNavigate();
  const [item, setItem] = useState<any[]>([]);
  const [index, setIndex] = useState(-1);

  const fetchData = async () => {
    const { data, status } = await firebase_store.getMutipleData("character");
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
      title: "Confirm content block",
      buttons: [
        {
          title: "Yes",
          class: "primary",
          onPress: () => {
            if (id) {
              firebase_store.removeData("character", id).then((res) => {
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
    <Layout title="Character List">
      <div className="row">
        <div className="col-md-6">
          <Link className="btn btn-sm btn-primary" to="/character/create">
            Create new character
          </Link>
          <br />
          <br />
          <Table>
            <Table.Head>
              <Table.TextHeaderCell>Profile</Table.TextHeaderCell>
              <Table.TextHeaderCell className="text-center">
                Name
              </Table.TextHeaderCell>
              <Table.TextHeaderCell textAlign="right">
                Action
              </Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
              {item.map((x, i) => {
                return (
                  <Table.Row key={x.id}>
                    <Table.Cell>
                      <Avatar src={x.profile} name={x.name} size={40} />
                    </Table.Cell>
                    <Table.TextCell
                      textTransform="capitalize"
                      className="text-center"
                    >
                      {x.name}
                    </Table.TextCell>
                    <Table.Cell justifyContent="end" marginRight={15}>
                      <Popover
                        position="bottom-left"
                        content={
                          <Menu>
                            <Menu.Group>
                              <Menu.Item
                                icon={EyeOpenIcon}
                                onClick={() => setIndex(i)}
                              >
                                Preview
                              </Menu.Item>
                              <Menu.Item
                                icon={EditIcon}
                                onClick={() =>
                                  navigate("/character/edit/" + x.id)
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
        {index > -1 && (
          <div className="col-md-6">
            <img
              src={item[index].bg_profile}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
