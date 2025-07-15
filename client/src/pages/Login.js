import backgroundImage from "../components/img/NINOS.png";



import { useEffect, useState } from "react";
import {
  InputGroup,
  Row,
  Col,
  Form,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SlLock } from "react-icons/sl";
import { RiUserAddLine } from "react-icons/ri";
import { login, resetLogin } from "../redux/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth.login
  );

  useEffect(() => {
    document.title = `Login `;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      dispatch(login({ email, password }));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    dispatch(resetLogin());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
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


      <Col className="d-flex align-items-center justify-content-center" lg={6}>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {isLoading && <div className="loader"></div>}
              <h3 className="text-center">Inicio de sesion</h3>
           
              {message && (
                <div
                  className={`message ${isError ? "error" : ""} ${
                    isSuccess ? "success" : ""
                  } ${isLoading ? "info" : ""}`}
                >
                  {`${message} `}
                  {message?.includes("must activate") && (
                    <Link to="/verify-email">Click here to activate it.</Link>
                  )}
                </div>
              )}
              <Form.Group>
                <Form.Label htmlFor="email">
                  Nombre de usuario o correo:
                </Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <RiUserAddLine />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    id="email"
                    disabled={isLoading}
                    placeholder="usuario@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Contraseña</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <SlLock />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    disabled={isLoading}
                    placeholder="***********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Form.Group controlId="rememberme">
                  <Form.Check
                    name="rememberme"
                    id="rememberme"
                    type="checkbox"
                    label="Recuerdame"
                  ></Form.Check>
                </Form.Group>
                <Link className="forget-pwd" to="/forgot-password">
                ¿Olvidó su contraseña?
                </Link>
              </div>
              <Button
                className="auth-submit mb-4 w-100"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging In..." : "ENTRAR"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
