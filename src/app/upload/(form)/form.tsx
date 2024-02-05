import { useFormState } from "react-dom";
import { uploadFile } from "./actions";
import Submitbutton from "./Submitbutton";

const initialState: { status: string | null; message: string | null } = {
  status: null,
  message: null,
};
export default function UploadForm() {
  const [state, formAction] = useFormState(uploadFile, initialState);
  return (
    <div className="form-wrapper">
      <form action={formAction}>
        <input type="file" id="file" name="file" accept="image/*" />
        <Submitbutton />
      </form>
      {state?.status && (
        <div className={`state-message ${state?.status}`}>{state?.message}</div>
      )}
    </div>
  );
}
