import Button from "../../components/Button";
import { FaCameraRetro } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function QrPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <Button
        onClick={() => navigate("/qrscan/camera")}
        animate
        className="flex items-center justify-center gap-3"
      >
        Open <FaCameraRetro />
      </Button>
      <Button
        onClick={() => navigate("/qrscan/photo")}
        animate
        className="flex items-center justify-center gap-3"
      >
        Scan <IoMdPhotos />
      </Button>
    </div>
  );
}
