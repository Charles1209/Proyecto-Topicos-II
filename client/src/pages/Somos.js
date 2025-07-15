import { Row, Col, Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllTopics } from "../redux/slices/topicSlice";
import { resetUserProfile } from "../redux/slices/profileSlice";
import '../App.css'; // Asegúrate de que App.css esté en src/

const Somos = () => {
  const dispatch = useDispatch();
  const { sortOption, searchQuery } = useSelector((state) => state.topic);

  useEffect(() => {
    document.title = `Somos`;
  }, []);

  useEffect(() => {
    dispatch(resetUserProfile());
    dispatch(getAllTopics({ sortOption, searchQuery }));
  }, [dispatch, sortOption, searchQuery]);

  return (
    <main>
   <Container className="mt-5 pt-5" style={{ marginTop: "100px" }}>

        <Row className="text-center g-4">
          <Col md={4}>
            <Card className="card-custom">
              <Card.Img
                variant="top"
                src="/images/Somos1.png"
                alt="Alimentación y salud"
              />
              <Card.Body>
                <Card.Title>Programas de alimentación y salud</Card.Title>
                <Card.Text>
                  Distribución de alimentos nutritivos, asistencia médica básica,
                  campañas de vacunación y prevención de enfermedades en
                  comunidades rurales de África.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="card-custom">
              <Card.Img
                variant="top"
                src="/images/Somos2.png"
                alt="Educación"
              />
              <Card.Body>
                <Card.Title>Educación y desarrollo comunitario</Card.Title>
                <Card.Text>
                  Creación de centros educativos, programas de alfabetización,
                  talleres de emprendimiento y formación en oficios para jóvenes
                  y mujeres.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="card-custom">
              <Card.Img
                variant="top"
                src="/images/Somos3.png"
                alt="Agua potable"
              />
              <Card.Body>
                <Card.Title>Acceso a agua potable y energía limpia</Card.Title>
                <Card.Text>
                  Construcción de pozos, instalación de sistemas de captación de
                  agua de lluvia y paneles solares para mejorar la calidad de
                  vida de las comunidades más vulnerables.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Somos;
