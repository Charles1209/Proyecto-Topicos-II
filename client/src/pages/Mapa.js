import { Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllTopics } from "../redux/slices/topicSlice";
import { resetUserProfile } from "../redux/slices/profileSlice";
import '../App.css';

const Mapa = () => {
  const dispatch = useDispatch();
  const { sortOption, searchQuery } = useSelector((state) => state.topic);

  useEffect(() => {
    document.title = `Mapa`;
  }, []);

  useEffect(() => {
    dispatch(resetUserProfile());
    dispatch(getAllTopics({ sortOption, searchQuery }));
  }, [dispatch, sortOption, searchQuery]);

  return (
    <main>
      <Container className="mt-5 pt-5" style={{ marginTop: "100px" }}>
        <Card className="card-custom w-100">
          <div className="map-container">
            <iframe
              title="Mapa de África"
              width="100%"
              height="600"
              style={{
                border: 0,
                borderRadius: "12px 12px 0 0"
              }}
              loading="lazy"
              allowFullScreen
              src="https://www.openstreetmap.org/export/embed.html?bbox=-28.5%2C-40.0%2C60.0%2C38.0&layer=mapnik">
            </iframe>
          </div>
          <Card.Body>
            <Card.Title>Mapa De África</Card.Title>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
};

export default Mapa;
