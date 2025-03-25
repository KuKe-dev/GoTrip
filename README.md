<h1 style="color: #00bfff; text-align: center; font-size: 50px">Go Trip 🌎😁</h1>
<hr style="height: 1px;background-color: #00bfff">

<ul type="none">
<li><a href="#1-replicar-proyecto">1. Replicar proyecto</a></li>
<li><a href="#2-back">2. Back</a></li>
<li><a href="#3-front">3. Front</a></li>
</ul>



<h1 id="1-replicar-proyecto" style="color: #00bfff">1. Replicar proyecto</h1>

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


<h1 id="2-back" style="color: #00bfff">2. Back</h1>
<hr style="height: 1px;background-color:#5f5f5f">

<h3 id="" style="color:#00e2ae">2.1</h3>


<h1 id="3-front" style="color: #00bfff">3. Front</h1>
<hr style="height: 1px;background-color:#5f5f5f">