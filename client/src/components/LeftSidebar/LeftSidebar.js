import { Col, Nav } from "react-bootstrap";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { MdQuestionAnswer, MdReplyAll } from "react-icons/md";

const LeftSidebar = () => {
  return (
    <Col lg={3} className="left-sidebar">
      <Nav className="flex-column side-topics">
        <Nav.Link className="d-flex align-items-center">
          <BsFillQuestionCircleFill />
          Inicio
        </Nav.Link>
        <Nav.Link className="d-flex align-items-center">
          <MdQuestionAnswer />
          Informacion
        </Nav.Link>
        <Nav.Link className="d-flex align-items-center">
          <MdReplyAll />
          Donación
        </Nav.Link>
      </Nav>
    </Col>
  );
};

export default LeftSidebar;
