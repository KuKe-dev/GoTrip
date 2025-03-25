<h1 style="color: #00bfff; text-align: center; font-size: 50px">Go Trip 🌎</h1>
<hr style="height: 1px;background-color: #00bfff">

<ul type="none">
<li><a href="#1-replicar-proyecto">1. Replicar proyecto</a></li>
<li><a href="#2-back">2. Back</a></li>
<li><a href="#3-front">3. Front</a></li>
</ul>



<h1 id="1-replicar-proyecto" style="color: #00bfff">1. Replicar proyecto 🧱</h1>

<hr style="height: 1px;background-color:#5f5f5f">

<h3 id="1-1-clonar-repositorio" style="color:#00e2ae">1.1 Clonar repositorio</h3>

```shell
mkdir Go_Trip

cd Go_Trip

git clone https://github.com/KuKe-dev/GoTrip.git

git branch -M main
```
<h3 id="1-2-instalar-dependencias" style="color:#00e2ae">1.2 Instalar dependencias</h3>

```shell
cd Backend
mvn clean install

cd ../Frontend
npm install
```

<h3 id="1-3-ejecutar-el-proyecto" style="color:#00e2ae">1.3 Ejecutar el proyecto</h3>

<p>En el Front esta intalada una dependecia llamada <code style="color:#ff742f">concurrently</code>. <b>Esto permite ejecutar los dos proyectos al mismo tiempo desde la terminal</b>.

En el Frontend se ejecuta el comando <code style="color:#ff742f">vite</code> y en el Backend se ejecuta el comando <code style="color:#ff742f">mvn spring-boot:run</code>.

La dependencia se encuentra <b>instalada en el Frontend</b>:</p>

```shell
cd Frontend
npm run dev

Cuando se termine de ejecutar aparecera esto:

Server is running on: http://localhost:8080
Client is running on: http://localhost:5173
```


<h1 id="2-back" style="color: #00bfff">2. Back ☕</h1>
<hr style="height: 1px;background-color:#5f5f5f">

<h3 id="" style="color:#00e2ae">2.1 Estructura General de la API</h3>
<div style="margin:0 25px"><b>Back</b></div>
<div style="display: flex; gap: 20px;margin:0 40px">
<div>
<div style="background-color: #00e27c; width: 2px; height: calc(100% + 10px)">
</div>
<div style="width: 0; height: 0; border-left: 5px solid transparent;border-right: 5px solid transparent;border-top: 10px solid #00e27c; transform: translateX(calc(-50% + 1px))"></div>
</div>
<div>
<p style="position: relative; top: 10px; line-height: 1.2;text-align: justify;">
  <span style="position: absolute; top: 4px; left: -33px; width: 8px; height: 8px; background-color: #00e2ae; border-radius: 50%;"></span>
  <b>Entities</b> (Capa de Modelo): representan tablas en la base de datos.
</p>
<p style="position: relative; top: 5px; text-align: justify;">
  <span style="position: absolute; top: 8px; left: -33px; width: 8px; height: 8px; background-color: #00e2ae; border-radius: 50%;"></span>
  <b>Repositories</b> (Capa de Persistencia): Los repositorios interactúan directamente con la base de datos. Implementan operaciones CRUD y consultas personalizadas usando anotaciones como <code style="color:#ff742f">@Query</code>.
</p>
<p style="position: relative; top: 5px; text-align: justify;">
  <span style="position: absolute; top: 8px; left: -33px; width: 8px; height: 8px; background-color: #00e2ae; border-radius: 50%;"></span>
  <b>Services</b> (Capa de Servicio): Los servicios orquestan operaciones entre múltiples componentes. Actúan como <b>intermediarios</b> entre los controladores y la capa de persistencia, evitando que la <b>lógica compleja</b> contamine los controladores o los repositorios.
</p>
<p style="position: relative; top: 5px; text-align: justify;">
  <span style="position: absolute; top: 8px; left: -33px; width: 8px; height: 8px; background-color: #00e2ae; border-radius: 50%;"></span>
  <b>Controllers</b> (Capa de Presentación): Los controladores manejan las <b>solicitudes HTTP</b> entrantes y las <b>respuestas</b> salientes. Su responsabilidad principal es validar los datos de entrada, delegar la lógica de negocio a la capa de servicio.
</p>
</div>
</div>
<div style="margin:20px 22px 10px;position:relative;"><b>Client</b></div>

<h3 id="" style="color:#00e2ae">2.2 Ejemplos</h3>

<h5 id="" style="color:#d48300">Ejemplo Entity</h5>

```java
@Entity <-- Declaración de la entidad
@Table(name = "Posts") <-- Nombre de la tabla a la que se hace referencia
public class Post {

    @Id <-- Declaración de la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) <-- Generación automática de la clave primaria
    private Long id;

    @Column( <-- Declaración de la columna
        name = "user-id",
        nullable = false
    )
    private Long userId;

    @Column(
            nullable = false
    )
    private String img;

    @Column(
            length = 250,
            nullable = false
    )
    private String description;
    ...
}
```

<h5 id="" style="color:#d48300">Ejemplo Repository</h5>

```java
@Repository <-- Declaración del repositorio
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post") <-- Consulta
    List<Post> getPosts();

    @Query("SELECT * FROM Post", nativeQuery = true) <-- Consulta nativa
    List<Post> getPosts();
    
    @Query("SELECT * FROM Post WHERE user-id = :userId", nativeQuery = true)
    List<Post> findPostsByUserId(@Param("userId") Long userId);

}
```

<h5 id="" style="color:#d48300">Ejemplo Service</h5>

```java
@Service <-- Declaración del servicio
public class PostService {

    @Autowired <-- Inyección de dependencias    
    private PostRepository postRepository;

    public List<Post> getPosts() {
        /* Si se tiene que hacer alguna lógica adicional, se realiza aquí */
        return postRepository.getPosts();
    }
}
```

<h5 id="" style="color:#d48300">Ejemplo Controller</h5>

```java
@RestController <-- Declaración del controlador
@RequestMapping("/api") <-- Declaración de la ruta
public class PostController {

    @Autowired <-- Inyección de dependencias
    private PostService postService;

    @GetMapping("/posts") <-- Declaración de la ruta
    public List<Post> getPosts() {
        return postService.getPosts();
    }
}
```

<h3 id="" style="color:#00e2ae">2.3 Endpoints</h3>

<ol style="margin: 20px 0">
  <li style="margin: 10px 0">
    <b>Raíz:</b>
    <code style="color:#32d6ff">http://localhost:8080/</code> - Punto de entrada principal de la API
  </li>
  <li style="margin: 10px 0">
    <b>Posts:</b>
    <ul style="margin: 10px 0">
      <li style="margin: 10px 0"><code style="color:#32d6ff">api/posts</code> - Endpoint principal para operaciones con posts</li>
      <li style="margin: 10px 0"><code style="color:#32d6ff">api/posts/{id}</code> - Endpoint para operaciones con un post específico</li>
      <li style="margin: 10px 0"><code style="color:#32d6ff">api/posts/img/{id}</code> - Endpoint específico para imágenes asociadas a posts</li>
    </ul>
  </li>
  <li style="margin: 10px 0">
    <b>Users:</b>
    <ul style="margin: 10px 0">
      <li style="margin: 10px 0"><code style="color:#32d6ff">api/users</code> - Endpoint para operaciones con usuarios (quitando datos sensibles)</li>
      <li style="margin: 10px 0"><code style="color:#32d6ff">api/users/{id}</code> - Endpoint para operaciones con un usuario específico</li>
    </ul>
  </li>
  <li style="margin: 10px 0">
    <b>Autenticación:</b>
    <ul style="margin: 10px 0">
      <li style="margin: 10px 0"><code style="color:#32d6ff">auth/login</code> - Endpoint para iniciar sesión</li>
      <li style="margin: 10px 0"><code style="color:#32d6ff">auth/islogged</code> - Endpoint para verificar si el usuario está autenticado</li>
    </ul>
  </li>
</ol>

<h1 id="3-front" style="color: #00bfff">3. Front ⚛</h1>
<hr style="height: 1px;background-color:#5f5f5f"