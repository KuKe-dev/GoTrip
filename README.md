# <span style="color: #00bfff; text-align: center; font-size: 50px">Go Trip 🌎</span>

- [1. Replicar proyecto](#1-replicar-proyecto)
- [2. Back](#2-back)
- [3. Front](#3-front)

---

## <span id="1-replicar-proyecto" style="color: #00bfff">1. Replicar proyecto 🧱</span>

### <span style="color:#00e2ae">1.1 Clonar repositorio 🛠</span>

```shell
mkdir Go_Trip

cd Go_Trip

git clone https://github.com/KuKe-dev/GoTrip.git
git branch -M main
```
### <span style="color:#00e2ae">1.2 Instalar dependencias ⏬</span>

```shell
cd Backend
mvn clean install

cd ../Frontend
npm install
```

### <span style="color:#00e2ae">1.3 Ejecutar proyectos ▶</span>

En el Front está instalada una dependencia llamada `concurrently`. **Esto permite ejecutar los dos proyectos al mismo tiempo desde la terminal**.

En el Frontend se ejecuta el comando `vite` y en el Backend se ejecuta el comando `mvn spring-boot:run`.

La dependencia se encuentra **instalada en el Frontend**:

```shell
cd Frontend
npm run dev

Cuando se termine de ejecutar aparecerá esto:

Server is running on: http://localhost:8080
Client is running on: http://localhost:5173
```


## <span id="2-back" style="color: #00bfff">2. Back ☕</span>

### <span style="color:#00e2ae">2.1 Estructura General de la API ⚙</span>

**Back**

│<br>
│─ 📌 **Entities** (Capa de Modelo): representan tablas en la base de datos.<br>│<br>
│─ 📌 **Repositories** (Capa de Persistencia): Los repositorios interactúan directamente<br>│ con la base de datos. Implementan operaciones CRUD y consultas personalizadas<br>│ usando anotaciones como `@Query`.<br>│<br>
│─ 📌 **Services**: Los servicios orquestan operaciones entre múltiples componentes.<br>│ Actúan como <b>intermediarios</b> entre los controladores y la capa de persistencia,<br>│ evitando que la <b>lógica compleja</b> contamine los controladores o los repositorios.<br>│<br>
│─ 📌 **Controllers**: Los controladores manejan las <b>solicitudes HTTP</b> entrantes y las<br>│ <b>respuestas</b> salientes. Su responsabilidad principal es validar los datos de entrada,<br>│ delegar la lógica de negocio a la capa de servicio.<br>│<br>▼

**Client**


### <span style="color:#00e2ae">2.2 Ejemplos</span>

##### <span style="color:#d48300">Ejemplo Entity</span>

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

##### <span style="color:#d48300">Ejemplo Repository</span>

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

##### <span style="color:#d48300">Ejemplo Service</span>

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

##### <span style="color:#d48300">Ejemplo Controller</span>

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
### <span style="color:#00e2ae">2.3 Endpoints 📲</span>

1. <b>Raíz:</b>  
   <code style="color:#32d6ff">http://localhost:8080/</code> - Punto de entrada principal de la API

2. <b>Posts:</b>
   - <code style="color:#32d6ff">api/posts</code> - Endpoint principal para operaciones con posts
   - <code style="color:#32d6ff">api/posts/{id}</code> - Endpoint para operaciones con un post específico
   - <code style="color:#32d6ff">api/posts/img/{id}</code> - Endpoint específico para imágenes asociadas a posts

3. <b>Users:</b>
   - <code style="color:#32d6ff">api/users</code> - Endpoint para operaciones con usuarios
   - <code style="color:#32d6ff">api/users/{id}</code> - Endpoint para operaciones con un usuario específico

4. <b>Autenticación:</b>
   - <code style="color:#32d6ff">auth/login</code> - Endpoint para iniciar sesión
   - <code style="color:#32d6ff">auth/islogged</code> - Endpoint para verificar autenticación

## <span id="3-front" style="color: #00bfff">3. Front ⚛</span>

