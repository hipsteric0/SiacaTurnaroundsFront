import styles from "./loginMainPage.style.module.css";


function LoginMainPage({}){
    return (
        <div className={styles.mainContainerLoginMainPage}>
            <div>logo</div>
            <p>¡Bienvenido de vuelta!</p>
            <div>
                correo
            </div>
            <div>
                contrasena
            </div>
            <button>
                INGRESAR
            </button>
            <div>
            ¿Olvidaste tu contraseña?
            </div>
        </div>
      );
}

export default LoginMainPage;