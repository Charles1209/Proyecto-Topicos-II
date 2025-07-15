import { Col, Nav } from "react-bootstrap";


const RightSidebar = () => {
  return (
    <Col lg={3} className="left-sidebar">
      <Nav className="flex-column side-topics">
        <Nav.Link className="d-flex align-items-center gap-2">
          Mapa
        </Nav.Link>
        <Nav.Link className="d-flex align-items-center gap-2">
          Quienes Somos
        </Nav.Link>
        <Nav.Link className="d-flex align-items-center gap-2">
          Cerrar Sesion
        </Nav.Link>
      </Nav>
    </Col>
  );
};

export default RightSidebar;

