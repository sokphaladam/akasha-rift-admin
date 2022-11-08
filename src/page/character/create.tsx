import { useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { CharacterForm } from "./CharacterForm";

export function CreateCharacter() {
  const { id } = useParams();
  return (
    <Layout title="Create new character">
      <div className="row">
        <div className="col-md-6">
          <CharacterForm id={id} />
        </div>
      </div>
    </Layout>
  );
}
