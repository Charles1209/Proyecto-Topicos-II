import logoImage from './img/africa.png'; 
import logonombre from './img/Nombre.png';
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Dropdown,
  Form,
  InputGroup,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";
import { CgSearch } from "react-icons/cg";
import { BiUser } from "react-icons/bi";
import { BsPower } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/slices/topicSlice";
import { refresh_token, logout } from "../redux/slices/authSlice";
import Skeleton from "react-loading-skeleton";

const Header = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isHeaderLoading } = useSelector((state) => state.auth);
  const isAuth = localStorage.getItem("isLoggedIn") ? true : false;

  useMemo(() => {
    if (isAuth) {
      if (!token) {
        dispatch(refresh_token());
      }
    }
  }, [dispatch, isAuth, token]);

  const handleSubmitSearch = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchQuery(search));
      navigate("/");
    }
  };

  return useMemo(() => {
    return (
      <header>
        <Navbar expand="lg">
          <Container>
            <Link to="/" onClick={() => dispatch(setSearchQuery(""))}>
              <Navbar.Brand>
                 <img src={logoImage} alt="logo" className="logo-image" />
                  <img src={logonombre} alt="logo" className="logo-nombre" />
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="navbarsupportedcontent" />
            <Navbar.Collapse id="navbarsupportedcontent">
              <Col lg={6} md={8} sm={10}>
                <Form
                  className="search-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <InputGroup>
                    <span style={{ marginLeft: "8px", fontSize: "25px" }}>
                      <CgSearch />
                    </span>
                    <FormControl
                      type="text"
                      placeholder=" "
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={handleSubmitSearch}
                    />
                  </InputGroup>
                </Form>


              </Col>



              <Nav className="align-items-center">
                {isAuth && isHeaderLoading && (
                  <>
                    <span>
                      <Skeleton
                        style={{ marginRight: `8px` }}
                        circle
                        width={45}
                        height={45}
                      />
                    </span>
                    <span>
                      <Skeleton width={100} height={20} />
                    </span>
                  </>
                )}
                {isAuth &&
                  !isHeaderLoading &&
                  user &&
                  Object?.entries(user)?.length > 0 && (
                    <Dropdown className="profile">
                      <Dropdown.Toggle
                        as="div"
                        id="dropdownMenuButton1"
                        className="d-flex align-items-center"
                      >
                        <Image src={user?.avatar?.url} />
                        <span className="user">{`${user?.firstName} ${user?.lastName}`}</span>
                        <HiOutlineDotsVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to={`/user/${user?.username}`}
                          className="d-flex align-items-center"
                        >
                          <BiUser />
                          Profile
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            dispatch(logout());
                            navigate("/");
                          }}
                          className="d-flex align-items-center"
                        >
                          <BsPower />
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                {!isAuth &&
                  !isHeaderLoading &&
                  Object?.entries(user)?.length === 0 && (
                    <>
                      <Link className="login" to="/login">
                        <Button className="login">Iniciar sesión</Button>
                      </Link>
                      <Link className="login" to="/register">
                        <Button className="register">Registrate</Button>
                      </Link>
                    </>
                    
                  )}
              </Nav>
              
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="header-buttons d-flex justify-content-center align-items-center gap-2 mt-3">
 
  <Button className="header-button">Cerrar Sesión</Button>
  <Button className="header-button">Información</Button>
  <Button className="header-button">Donación</Button>
   <Link to="/">
  <Button className="header-button">Inicio</Button>
  </Link>
  <Link to = "/Somos">
  <Button className="header-button">Quienes somos</Button>
  </Link>
  <Link to="/Mapa">
  <Button className="header-button">Mapa</Button>
  </Link>
</div>

      </header>
    );
  });
};

export default Header;
