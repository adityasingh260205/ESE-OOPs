const API_URL = "http://localhost:8082/api/courses";

function loadCourses() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("courseTable");
            table.innerHTML = "";

            data.forEach(course => {
                table.innerHTML += `
                    <tr>
                        <td>${course.id}</td>
                        <td>${course.title}</td>
                        <td>${course.description}</td>
                        <td>${course.duration}</td>
                        <td>${course.price}</td>
                        <td>
                            <button class="delete-btn" onclick="deleteCourse(${course.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });
        });
}

function addCourse() {
    const course = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        duration: document.getElementById("duration").value,
        price: document.getElementById("price").value
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(course)
    })
    .then(() => {
        loadCourses();
        document.querySelectorAll("input").forEach(i => i.value = "");
    });
}

function deleteCourse(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(() => loadCourses());
}

loadCourses();