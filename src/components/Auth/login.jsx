import { useState } from "react";
import { useAuth, rolesPredefinidos } from "../../context/authContext";
import {
    Container,
    ContentWrapper,
    LeftSection,
    RightSection,
    ImageOverlay,
    LogoContainer,
    Img,
    Title,
    Form,
    Input,
    Button,
    BackgroundDecoration,
    FloatingCircle
} from '../../styles/styleLogin';
import logo from '../../assets/escudoVertical.png';
import { loginUsuario } from "../../service/usuarioService";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const user = await loginUsuario(username, password);
            if (user) {
                const role = rolesPredefinidos.find(r => r.IdRol === user.IdRol)?.NombreRol || 'Sin rol';
                login(role, user.Username, `${user.Nombre} ${user.Appat} ${user.Apmat}`);
            } else {
                setError("Usuario o contraseña incorrectos.");
            }
        } catch (err) {
            setError("Error al autenticar el usuario.");
            console.error("Error de autenticación:", err);
        }
    };

    return (
        <Container>
            <BackgroundDecoration />
            <FloatingCircle color="rgba(245,138,47,0.5)" size="100px" top="5%" left="5%" duration="7s" />
            <FloatingCircle color="rgba(170,28,93,0.5)" size="80px" bottom="10%" right="10%" duration="9s" delay="2s" />
            <FloatingCircle color="rgba(0,180,219,0.5)" size="120px" top="30%" right="15%" duration="8s" delay="1s" />
            <FloatingCircle color="rgba(104,92,168,0.5)" size="70px" top="20%" left="30%" duration="10s" delay="3s" />
            <FloatingCircle color="rgba(250,173,89,0.5)" size="90px" bottom="20%" left="20%" duration="6s" delay="4s" />
            <LeftSection>
                <ImageOverlay>
                    <LogoContainer>
                        <Img src={logo} alt="Logo" />
                    </LogoContainer>
                    <Title>Bienvenidos</Title>
                </ImageOverlay>
            </LeftSection>
            <ContentWrapper>
                <RightSection>
                    <h2>Ingrese a su cuenta</h2>
                    <Form onSubmit={handleLogin}>
                        <Input
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit">Ingresar</Button>
                    </Form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </RightSection>
            </ContentWrapper>
        </Container>
    );
};

export default Login;
