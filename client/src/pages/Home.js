import { Row, Col, Form, Container } from "react-bootstrap";
import backgroundImage from "../components/img/inicio.png";

import TopicItem from "../components/Topic/TopicItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllTopics, setSortOption } from "../redux/slices/topicSlice";
import { resetUserProfile } from "../redux/slices/profileSlice";
import RightSidebar from "../components/RightSidebar/RightSidebar";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import SkeletonTopicItem from "../components/Skeletons/SkeletonTopicItem";

const Home = () => {
  const dispatch = useDispatch();
  const { topics, getAllTopicsIsLoading } = useSelector((state) => state.topic);
  const { sortOption, searchQuery } = useSelector((state) => state.topic);

  useEffect(() => {
    document.title = `INICIO`;
  }, []);

  useEffect(() => {
    dispatch(resetUserProfile());
    dispatch(getAllTopics({ sortOption, searchQuery }));
  }, [dispatch, sortOption, searchQuery]);

  return (


    <main>


      <Container fluid>
        <Row
          className="auth-form justify-content-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
{/*
          <LeftSidebar />
          <Col lg={6} className="main-content">
            <div className="filter my-3">
              <Form.Select
                name="topicsSort"
                className="custom-select"
                onChange={(e) => dispatch(setSortOption(e.target.value))}
              >
                <option value="latest">Últimas publicaciones</option>
                <option value="popular">Temas más populares</option>
              </Form.Select>
            </div>
            <div className="topics">
              {getAllTopicsIsLoading ? (
                <>
                  <SkeletonTopicItem />
                  <SkeletonTopicItem />
                </>
              ) : (
                topics?.map((topic, idx) => <TopicItem key={idx} topic={topic} />)
              )}
            </div>
          </Col>
          <RightSidebar />
          
*/}
        </Row>
      </Container>
 <div className="text-center mt-4">
        <h2>Accion por la libertad y el mejoramiento de Africa</h2>

      </div>


    </main>
  );
};

export default Home;
