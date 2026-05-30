# ScheduleClass

Sistema académico para la gestión de docentes, aulas, cursos y horarios, desarrollado como proyecto universitario en Spring Boot (Backend) y React + TypeScript (Frontend), con base de datos en PostgreSQL.

**##Tecnologías utilizadas:**

- **Backend:** Spring Boot (Java)
- **Frontend:** React + TypeScript
- **Base de datos:** PostgreSQL
- **Pruebas de carga:** k6
- **Calidad de código:** SonarQube
- **Linter:** ESLint

**##Estructura del repositorio:**
ScheduleClass/
frontend/  #React + TypeScript
backend/   #Spring Boot + Java

**##Configuración del proyecto:**

**Backend**
1. Clonar el repositorio con: git clone https://github.com/bnniie/ScheduleClass
2. Entrar a la carpeta backend: cd ScheduleClass/backend
3. Ejecutar con Maven: mvn spring-boot:run
4. El backend quedará disponible en http://localhost:8080

**Frontend**
1. Entrar a la carpeta frontend: cd ScheduleClass/frontend
2. Instalar dependencias: npm install npm install @hello-pangea/dnd npm install --save-dev @types/react-big-calendar
3. Ejecutar: npm start
4. El frontend quedará disponible en http://localhost:3000

**Pruebas de carga con k6:**
1. Ejecutar el script de pruebas: k6 run load-test.js

**Análisis de calidad con SonarQube:**
1. Levantar SonarQube con el archivo StartSonar.bat en la carpeta bin/windows-x86-64
2. Ejecutar análisis con Maven:
mvn clean verify sonar:sonar -D"sonar.projectKey=ScheduleClass" -D"sonar.projectName=ScheduleClass" -D"sonar.host.url=http://localhost:9000" -D"sonar.token=TU_TOKEN"

**Pruebas de estilo con ESLint:**
1. Ejecutar análisis completo: npm run lint
2. Corregir automáticamente problemas: npm run lint:fix

**##Estado actual del proyecto:**
- Seguridad: A
- Fiabilidad: A
- Mantenibilidad: C

**##Video demostrativo del funcionamiento:**
https://youtu.be/SNYXkQEQ-m4

**#Autora:**

Paula Guerrero

Estudiante de Ingeniería de Sistemas (Septimo Semestre)

Universidad El Bosque - Proyecto Núcleo 2

290526
