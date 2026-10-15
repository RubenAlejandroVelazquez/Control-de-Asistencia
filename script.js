document.addEventListener("DOMContentLoaded", () => {


    const fechaInput = document.getElementById("fecha");
    if (fechaInput) {
        const hoy = new Date();
        const aaaa = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, "0");
        const dd = String(hoy.getDate()).padStart(2, "0");
        fechaInput.value = `${aaaa}-${mm}-${dd}`;
    }


    const listaAlumnos = document.getElementById("lista-alumnos");
    if (listaAlumnos) {
        listaAlumnos.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                const btnPresionado = e.target;
                const grupoBotones = btnPresionado.parentElement;
                const botonesAlumno = grupoBotones.querySelectorAll("button");
                const yaEstabaActivo = btnPresionado.classList.contains("active");

               
                botonesAlumno.forEach(b => b.classList.remove("active"));

             
                if (!yaEstabaActivo) {
                    btnPresionado.classList.add("active");
                }

                actualizarConteo();
            }
        });
    }


    function actualizarConteo() {
        let p = 0, a = 0, t = 0;

        const filas = document.querySelectorAll(".student-row");
        filas.forEach(fila => {
            const activo = fila.querySelector(".attendance-btn-group button.active");
            if (activo) {
                const val = activo.getAttribute("data-value");
                if (val === "P") p++;
                if (val === "A") a++;
                if (val === "T") t++;
            }
        });


        document.getElementById("cnt-presentes").textContent = String(p).padStart(2, "0");
        document.getElementById("cnt-ausentes").textContent = String(a).padStart(2, "0");
        document.getElementById("cnt-tardes").textContent = t;
    }


    const btnLimpiar = document.getElementById("btn-limpiar");
    if (btnLimpiar) {
        btnLimpiar.addEventListener("click", () => {
            const todosLosBotones = document.querySelectorAll(".attendance-btn-group button");
            todosLosBotones.forEach(b => b.classList.remove("active"));
            actualizarConteo();
            mostrarNotificacion("Registro limpiado");
        });
    }

  
    const btnGuardar = document.getElementById("btn-guardar");
    if (btnGuardar) {
        btnGuardar.addEventListener("click", () => {
            const curso = document.getElementById("curso").value;
            const fecha = document.getElementById("fecha").value;

            if (!curso) {
                mostrarNotificacion("Seleccioná un curso");
                return;
            }

            if (!fecha) {
                mostrarNotificacion("Seleccioná una fecha");
                return;
            }

            mostrarNotificacion("✓ Asistencia guardada correctamente");
        });
    }

 
    let timerToast;
    function mostrarNotificacion(texto) {
        const mensaje = document.getElementById("mensaje");
        if (mensaje) {
            clearTimeout(timerToast);
            mensaje.textContent = texto;
            mensaje.classList.add("mostrar");
            timerToast = setTimeout(() => {
                mensaje.classList.remove("mostrar");
            }, 2500);
        }
    }

    actualizarConteo();
});